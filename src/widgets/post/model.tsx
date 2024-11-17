import {attach, createEvent, createStore, sample} from 'effector';
import {sortBy} from 'lodash';
import {toast} from 'sonner';

import {apiV1CommentsDiscussionIdReactionsPostFx, apiV1CommentsGetFx} from '~/shared/api';

interface CommentReactions {
  draft: string[];
  committed: string[];
  countersWithDraft: Record<string, number>;
  countersWithoutDraft: Record<string, number>;
}

// Словарь [айди коммента] -> реакции
export const $reactions = createStore<Record<string, CommentReactions>>({});

// Ивент который вызывает вьюшка при нажатии на кнопку реакции
export const reactionToggled = createEvent<{commentId: string; toggledReaction: string}>();

// Попытка отправить набор реакций на бек
// toggledReaction тут нужен чтобы commitReactionsFx.fail какую именно реакцию не удалось тогглнуть
const commitReactionsFx = attach({
  mapParams: (params: {commentId: string; toggledReaction: string; reactions: string[]}) => ({
    path: {discussionId: params.commentId},
    body: params.reactions,
  }),
  effect: apiV1CommentsDiscussionIdReactionsPostFx,
});

// При получении с бека комментов заполняем для них draft и committed начальными значениями
sample({
  clock: apiV1CommentsGetFx.doneData,
  source: $reactions,
  fn: (state, {answer: {items}}) => ({
    ...state,
    ...Object.fromEntries(
      items.map((comment) => [
        comment.id,
        {
          draft: comment.viewer_reactions as string[],
          committed: comment.viewer_reactions as string[],
          countersWithDraft: comment.reaction_counters,
          countersWithoutDraft: Object.fromEntries(
            Object.entries(comment.reaction_counters).filter(
              ([key]) => !comment.viewer_reactions.includes(key),
            ),
          ) as Record<string, number>,
        },
      ]),
    ),
  }),
  target: $reactions,
});

// Если не получилось отправить на бек реакции
sample({
  clock: commitReactionsFx.fail,
  source: $reactions,
  fn: (state, {params: {commentId, toggledReaction}}) => {
    // Отображаем тост (это я наверное попытаюсь как нибудь вынести во вью, чтобы было model.ts а не tsx)
    toast('Oops...', {
      description: (
        <p>
          Failed to toggle <span className="font-semibold"> {toggledReaction} </span>
        </p>
      ),
      action: {
        label: 'Shit happens',
        onClick: () => {},
      },
    });

    // Заменяем draft реакции этого коммента на его committed реакции
    return {
      ...state,
      [commentId]: {
        ...state[commentId],
        draft: state[commentId].committed,
      },
    };
  },
  target: $reactions,
});

// Если получилось отправить на бек набор реакций, то записываем его в committed
sample({
  clock: commitReactionsFx.done,
  source: $reactions,
  fn: (state, {params: {commentId, reactions}}) => ({
    ...state,
    [commentId]: {
      ...state[commentId],
      committed: reactions,
    },
  }),
  target: $reactions,
});

// При reactionToggled изменяем draft реакции
const draftReactionsUpdate = sample({
  clock: reactionToggled,
  source: $reactions,
  fn: (viewerReactions, {commentId, toggledReaction}) => {
    // Берём текущие draft реакции
    const draftReactions = viewerReactions[commentId].draft;

    // Тогглим нужную реакцию
    const newDraftReactions = draftReactions.includes(toggledReaction)
      ? draftReactions.filter((draftReaction) => draftReaction !== toggledReaction)
      : [...draftReactions, toggledReaction].slice(-3);

    return {
      commentId,
      toggledReaction,
      newDraftReactions,
      newReactions: {
        ...viewerReactions,
        [commentId]: {
          ...viewerReactions[commentId],
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
