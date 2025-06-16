import {attach, createEvent, createStore, Effect, Event, sample} from 'effector';
import {produce} from 'immer';
import {sortBy} from 'lodash';
import {isEmoji} from '~/lib/utils';

import {FailedMessage} from '~/widgets/post/ui/failed-message';

import {AlertOptions, showNotificationFx} from '~/shared/notifications';

interface ReactionsFactoryParams {
  commitReactionsFx: Effect<
    {
      subjectId: string;
      reactions: string[];
    },
    any,
    any
  >;
  committedReactionsFetched: Event<{
    subjects: {
      id: string;
      viewerReactions: string[];
      reactionCounters: Record<string, number>;
    }[];
  }>;
}

interface Reactions {
  draft: string[];
  committed: string[];
  countersWithDraft: Record<string, number>;
  countersWithoutDraft: Record<string, number>;
}

const orderCounters = (draft: string[], counters: Record<string, number>): Record<string, number> =>
  Object.fromEntries(
    sortBy(Object.entries(counters), [
      ([, counter]) => -counter,
      ([reaction]) => !draft.includes(reaction),
      ([reaction]) => isEmoji(reaction),
      ([reaction]) => reaction,
    ]),
  );

export const reactionsFactory = (params: ReactionsFactoryParams) => {
  const statefulCommitReactionsFx = attach({
    effect: params.commitReactionsFx,
    mapParams: (params: {subjectId: string; reactions: string[]; toggledReaction: string}) => ({
      subjectId: params.subjectId,
      reactions: params.reactions,
    }),
  });

  const $reactions = createStore<Record<string, Reactions>>({});
  const toggleReaction = createEvent<{subjectId: string; toggledReaction: string}>();

  sample({
    clock: params.committedReactionsFetched,
    source: $reactions,
    fn: (reactions, {subjects}) => ({
      ...reactions,
      ...Object.fromEntries(
        subjects.map((subject) => [
          subject.id,
          {
            draft: subject.viewerReactions,
            committed: subject.viewerReactions,
            countersWithDraft: orderCounters(subject.viewerReactions, subject.reactionCounters),
            countersWithoutDraft: Object.fromEntries(
              Object.entries(subject.reactionCounters)
                .map(([reaction, counter]) => [
                  reaction,
                  subject.viewerReactions.includes(reaction) ? counter - 1 : counter,
                ])
                .filter(([, counter]) => (counter as number) > 0),
            ),
          },
        ]),
      ),
    }),
    target: $reactions,
  });

  sample({
    clock: statefulCommitReactionsFx.fail,
    fn: (payload): AlertOptions => ({
      message: 'Oops...',
      data: {
        description: () => FailedMessage({reaction: payload.params.toggledReaction}),
        action: {
          label: 'Shit happens',
          onClick: () => {},
        },
      },
    }),
    target: showNotificationFx,
  });

  sample({
    clock: statefulCommitReactionsFx.fail,
    source: $reactions,
    fn: (reactions, payload) =>
      produce(reactions, (draft) => {
        draft[payload.params.subjectId].draft = reactions[payload.params.subjectId].committed;
      }),
    target: $reactions,
  });

  sample({
    clock: statefulCommitReactionsFx.done,
    source: $reactions,
    fn: (reactions, payload) =>
      produce(reactions, (draft) => {
        draft[payload.params.subjectId].committed = payload.params.reactions;
      }),
    target: $reactions,
  });

  const draftReactionsUpdate = sample({
    clock: toggleReaction,
    source: $reactions,
    fn: (viewerReactions, payload) => {
      const draftReactions = viewerReactions[payload.subjectId]?.draft ?? [];

      const newDraftReactions = draftReactions.includes(payload.toggledReaction)
        ? draftReactions.filter((draftReaction) => draftReaction !== payload.toggledReaction)
        : [...draftReactions, payload.toggledReaction].slice(-3);

      return {
        subjectId: payload.subjectId,
        toggledReaction: payload.toggledReaction,
        newDraftReactions,
        newReactions: {
          ...viewerReactions,
          [payload.subjectId]: {
            ...viewerReactions[payload.subjectId],
            draft: newDraftReactions,
          },
        },
      };
    },
  });

  sample({
    clock: draftReactionsUpdate,
    fn: ({newReactions}) => newReactions,
    target: $reactions,
  });

  sample({
    clock: draftReactionsUpdate,
    fn: ({subjectId, toggledReaction, newDraftReactions}) => ({
      subjectId,
      toggledReaction,
      reactions: newDraftReactions,
    }),
    target: statefulCommitReactionsFx,
  });

  sample({
    clock: [toggleReaction, statefulCommitReactionsFx.fail],
    source: $reactions,
    fn: (state) =>
      Object.fromEntries(
        Object.entries(state).map(([subjectId, reactions]) => [
          subjectId,
          {
            ...reactions,
            countersWithDraft: orderCounters(
              reactions.draft,
              reactions.draft.reduce(
                (acc, reaction) => {
                  acc[reaction] = (acc[reaction] ?? 0) + 1;
                  return acc;
                },
                {...reactions.countersWithoutDraft},
              ),
            ),
          },
        ]),
      ),
    target: $reactions,
  });

  return {
    $reactions,
    toggleReaction,
  };
};
