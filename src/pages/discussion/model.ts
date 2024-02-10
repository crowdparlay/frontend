import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {createEvent, createStore, sample} from 'effector';
import {attach} from 'effector/compat';
import {produce} from 'immer';

import {
  apiV1CommentsGet,
  apiV1CommentsGetOk,
  ApiV1CommentsParentCommentIdRepliesGet,
  apiV1CommentsParentCommentIdRepliesGet,
  apiV1CommentsParentCommentIdRepliesGetOk,
  ApiV1CommentsParentCommentIdRepliesPost,
  apiV1CommentsParentCommentIdRepliesPost,
  ApiV1CommentsPost,
  apiV1CommentsPost,
  apiV1DiscussionsDiscussionIdGet,
  apiV1DiscussionsDiscussionIdGetOk,
} from '~/shared/api';
import {routes} from '~/shared/routes';

const getDiscussionFx = attach({effect: apiV1DiscussionsDiscussionIdGet});
const getCommentsFx = attach({effect: apiV1CommentsGet});
const commentDiscussionFx = attach({effect: apiV1CommentsPost});
const getRepliesFx = attach({effect: apiV1CommentsParentCommentIdRepliesGet});
const commentReplyFx = attach({effect: apiV1CommentsParentCommentIdRepliesPost});

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

export const $comments = createStore<typed.Get<typeof apiV1CommentsGetOk>>([]);
export const commentFormSubmit = createEvent<ApiV1CommentsPost>();

export type Replies = Record<string, typed.Get<typeof apiV1CommentsParentCommentIdRepliesGetOk>>;
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
      size: 100,
      page: 0,
    },
  }),
  target: getCommentsFx,
});

sample({
  clock: getCommentsFx.doneData,
  fn: (x) => x.answer,
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
      size: 100,
      page: 0,
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
      draft[params.path.parentCommentId] = result.answer;
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
      page: 0,
      size: 100,
    },
  }),
  target: getRepliesFx,
});
