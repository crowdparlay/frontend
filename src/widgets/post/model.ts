import {attach, createEvent, createStore, restore, sample} from 'effector';
import {produce} from 'immer';
import {sortBy} from 'lodash';

import {
  apiV1CommentsCommentIdReactionsPostFx,
  apiV1CommentsGetFx,
  apiV1LookupReactionsGetFx,
} from '~/shared/api';
import {AlertOptions, showNotificationFx} from '~/shared/notifications';

import {FailedMessage} from './ui/failed-message';

interface CommentReactions {
  draft: string[];
  committed: string[];
  countersWithDraft: Record<string, number>;
  countersWithoutDraft: Record<string, number>;
}

const commitReactionsFx = attach({
  effect: apiV1CommentsCommentIdReactionsPostFx,
  mapParams: (params: {commentId: string; toggledReaction: string; reactions: string[]}) => ({
    path: {commentId: params.commentId},
    body: params.reactions,
  }),
});

const getReactionsFx = attach({
  effect: apiV1LookupReactionsGetFx,
});

export const $reactions = createStore<Record<string, CommentReactions>>({});

export const $availableReactions = restore(
  getReactionsFx.doneData.map((payload) => payload.answer),
  [],
);

export const reactionToggled = createEvent<{commentId: string; toggledReaction: string}>();

sample({
  clock: apiV1CommentsGetFx.doneData,
  source: $reactions,
  fn: (reactions, {answer: {items}}) => ({
    ...reactions,
    ...Object.fromEntries(
      items.map((comment) => [
        comment.id,
        {
          draft: comment.viewer_reactions as string[],
          committed: comment.viewer_reactions as string[],
          countersWithDraft: comment.reaction_counters,
          countersWithoutDraft: Object.fromEntries(
            Object.entries(comment.reaction_counters as Record<string, number>)
              .map(([reaction, counter]) => [
                reaction,
                comment.viewer_reactions.includes(reaction) ? counter - 1 : counter,
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
      draft[payload.params.commentId].draft = reactions[payload.params.commentId].committed;
    }),
  target: $reactions,
});

sample({
  clock: commitReactionsFx.done,
  source: $reactions,
  fn: (reactions, payload) =>
    produce(reactions, (draft) => {
      draft[payload.params.commentId].committed = payload.params.reactions;
    }),
  target: $reactions,
});

const draftReactionsUpdate = sample({
  clock: reactionToggled,
  source: $reactions,
  fn: (viewerReactions, payload) => {
    const draftReactions = viewerReactions[payload.commentId].draft;

    const newDraftReactions = draftReactions.includes(payload.toggledReaction)
      ? draftReactions.filter((draftReaction) => draftReaction !== payload.toggledReaction)
      : [...draftReactions, payload.toggledReaction].slice(-3);

    return {
      commentId: payload.commentId,
      toggledReaction: payload.toggledReaction,
      newDraftReactions,
      newReactions: {
        ...viewerReactions,
        [payload.commentId]: {
          ...viewerReactions[payload.commentId],
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
  fn: ({commentId, toggledReaction, newDraftReactions}) => ({
    commentId,
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
      Object.entries(state).map(([commentId, reactions]) => [
        commentId,
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
