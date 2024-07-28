import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {attach, createEvent, createStore, sample} from 'effector';
import {produce} from 'immer';

import {
  apiV1CommentsGetFx,
  apiV1CommentsGetOk,
  ApiV1CommentsParentCommentIdRepliesGet,
  apiV1CommentsParentCommentIdRepliesGetFx,
  apiV1CommentsParentCommentIdRepliesGetOk,
  ApiV1CommentsParentCommentIdRepliesPost,
  apiV1CommentsParentCommentIdRepliesPostFx,
  ApiV1CommentsPost,
  apiV1CommentsPostFx,
  apiV1DiscussionsDiscussionIdGetFx,
  apiV1DiscussionsDiscussionIdGetOk,
} from '~/shared/api';
import {routes} from '~/shared/routes';

const getDiscussionFx = attach({effect: apiV1DiscussionsDiscussionIdGetFx});
const getCommentsFx = attach({effect: apiV1CommentsGetFx});
const commentDiscussionFx = attach({effect: apiV1CommentsPostFx});
const getRepliesFx = attach({effect: apiV1CommentsParentCommentIdRepliesGetFx});
const commentReplyFx = attach({effect: apiV1CommentsParentCommentIdRepliesPostFx});

export const currentRoute = routes.discussion;

export const dataLoadedRoute = chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: getDiscussionFx,
    mapParams: ({params}) => {
      return {
        path: {
          discussionId: params.discussionId,
        },
      };
    },
  },
});

export const $discussion = createStore<typed.Get<typeof apiV1DiscussionsDiscussionIdGetOk> | null>(
  null,
);

export const $comments = createStore<typed.Get<typeof apiV1CommentsGetOk>['items']>([]);
export const commentFormSubmit = createEvent<ApiV1CommentsPost>();

export type Replies = Record<
  string,
  typed.Get<typeof apiV1CommentsParentCommentIdRepliesGetOk>['items']
>;
export const $replies = createStore<Replies>({});
export const replyClicked = createEvent<ApiV1CommentsParentCommentIdRepliesGet>();
export const replyFormSubmit = createEvent<ApiV1CommentsParentCommentIdRepliesPost>();

sample({
  clock: getDiscussionFx.doneData,
  fn: (x) => x.answer,
  target: $discussion,
});

sample({
  clock: getDiscussionFx.doneData,
  fn: ({answer}) => ({
    query: {
      discussionId: answer.id!,
      offset: 0,
      count: 20,
    },
  }),
  target: getCommentsFx,
});

sample({
  clock: getCommentsFx.doneData,
  fn: (x) => x.answer.items,
  target: $comments,
});

sample({
  clock: commentFormSubmit,
  target: commentDiscussionFx,
});

sample({
  clock: commentDiscussionFx.doneData,
  source: $discussion,
  filter: Boolean,
  fn: (discussion) => ({
    query: {
      discussionId: discussion.id!,
      offset: 0,
      count: 20,
    },
  }),
  target: getCommentsFx,
});

sample({
  clock: replyClicked,
  target: getRepliesFx,
});

sample({
  clock: getRepliesFx.done,
  source: $replies,
  fn: (replies, {params, result}) =>
    produce(replies, (draft) => {
      // @ts-ignore
      draft[params.path.parentCommentId] = result.answer.items;
    }),
  target: $replies,
});

sample({
  clock: replyFormSubmit,
  target: commentReplyFx,
});

sample({
  clock: commentReplyFx.done,
  fn: ({params}) => ({
    path: {
      parentCommentId: params.path.parentCommentId,
    },
    query: {
      offset: 0,
      count: 20,
    },
  }),
  target: getRepliesFx,
});
