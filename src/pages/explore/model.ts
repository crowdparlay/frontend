import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {attach, createEvent, createStore, sample} from 'effector';
import {produce} from 'immer';
import {sortBy} from 'lodash';

import {FailedMessage} from '~/entities/reaction/ui/failed-message';

import {
  apiV1DiscussionsDiscussionIdReactionsPostFx,
  apiV1DiscussionsGetFx,
  apiV1DiscussionsGetOk,
  apiV1LookupReactionsGetFx,
} from '~/shared/api';
import {AlertOptions, showNotificationFx} from '~/shared/notifications';
import {routes} from '~/shared/routes';
import {chainAuthorized} from '~/shared/session';

const getDiscussionsFx = attach({effect: apiV1DiscussionsGetFx});
const getAvailableReactionsFx = attach({effect: apiV1LookupReactionsGetFx, mapParams: () => ({})});

export const currentRoute = routes.explore;

export const $discussions = createStore<
  typed.Get<typeof apiV1DiscussionsGetOk>['items'] | 'loading'
>('loading');

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: getDiscussionsFx,
    mapParams: () => ({
      query: {
        count: 20,
        offset: 0,
      },
    }),
  },
});

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: getAvailableReactionsFx,
    mapParams: () => ({}),
  },
});

sample({
  clock: getDiscussionsFx.doneData,
  fn: (payload) => payload.answer.items,
  target: $discussions,
});

export const $totalCount = createStore<number>(0);

sample({
  clock: getDiscussionsFx.doneData,
  fn: (payload) => payload.answer.total_count,
  target: $totalCount,
});

interface DiscussionReactions {
  draft: string[];
  committed: string[];
  countersWithDraft: Record<string, number>;
  countersWithoutDraft: Record<string, number>;
}

const commitReactionsFx = attach({
  effect: apiV1DiscussionsDiscussionIdReactionsPostFx,
  mapParams: (params: {discussionId: string; toggledReaction: string; reactions: string[]}) => ({
    path: {discussionId: params.discussionId},
    body: params.reactions,
  }),
});

export const $reactions = createStore<Record<string, DiscussionReactions>>({});

export const reactionToggled = createEvent<{discussionId: string; toggledReaction: string}>();

sample({
  clock: apiV1DiscussionsGetFx.doneData,
  source: $reactions,
  fn: (reactions, {answer: {items}}) => ({
    ...reactions,
    ...Object.fromEntries(
      items.map((discussion) => [
        discussion.id,
        {
          draft: discussion.viewer_reactions as string[],
          committed: discussion.viewer_reactions as string[],
          countersWithDraft: discussion.reaction_counters,
          countersWithoutDraft: Object.fromEntries(
            Object.entries(discussion.reaction_counters as Record<string, number>)
              .map(([reaction, counter]) => [
                reaction,
                discussion.viewer_reactions.includes(reaction) ? counter - 1 : counter,
              ])
              .filter(([, counter]) => (counter as number) > 0),
          ) as Record<string, number>,
        },
      ]),
    ),
  }),
  target: $reactions,
});

sample({
  clock: commitReactionsFx.fail,
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
  clock: commitReactionsFx.fail,
  source: $reactions,
  fn: (reactions, payload) =>
    produce(reactions, (draft) => {
      draft[payload.params.discussionId].draft = reactions[payload.params.discussionId].committed;
    }),
  target: $reactions,
});

sample({
  clock: commitReactionsFx.done,
  source: $reactions,
  fn: (reactions, payload) =>
    produce(reactions, (draft) => {
      draft[payload.params.discussionId].committed = payload.params.reactions;
    }),
  target: $reactions,
});

const draftReactionsUpdate = sample({
  clock: reactionToggled,
  source: $reactions,
  fn: (viewerReactions, payload) => {
    const draftReactions = viewerReactions[payload.discussionId].draft;

    const newDraftReactions = draftReactions.includes(payload.toggledReaction)
      ? draftReactions.filter((draftReaction) => draftReaction !== payload.toggledReaction)
      : [...draftReactions, payload.toggledReaction].slice(-3);

    return {
      discussionId: payload.discussionId,
      toggledReaction: payload.toggledReaction,
      newDraftReactions,
      newReactions: {
        ...viewerReactions,
        [payload.discussionId]: {
          ...viewerReactions[payload.discussionId],
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
  fn: ({discussionId, toggledReaction, newDraftReactions}) => ({
    discussionId,
    toggledReaction,
    reactions: newDraftReactions,
  }),
  target: commitReactionsFx,
});

const orderCounters = (draft: string[], counters: Record<string, number>): Record<string, number> =>
  Object.fromEntries(
    sortBy(Object.entries(counters), [
      ([, counter]) => -counter,
      ([reaction]) => !draft.includes(reaction),
      ([reaction]) => reaction,
    ]),
  );

sample({
  clock: [reactionToggled, commitReactionsFx.fail],
  source: $reactions,
  fn: (state) =>
    Object.fromEntries(
      Object.entries(state).map(([discussionId, reactions]) => [
        discussionId,
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
