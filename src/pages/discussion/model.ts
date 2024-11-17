import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {attach, combine, createEvent, createStore, sample} from 'effector';
import {produce} from 'immer';
import {spread} from 'patronum';

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
import {paginationFactory} from '~/shared/factory/pagination.factory';
import {signalRFactory} from '~/shared/factory/signal-r.factory';
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
    mapParams: ({params}) => ({
      path: {
        discussionId: params.discussionId,
      },
    }),
  },
});

const $discussionId = currentRoute.$params.map((query) => query.discussionId);

export const $discussion = createStore<typed.Get<typeof apiV1DiscussionsDiscussionIdGetOk> | null>(
  null,
);

export const $comments = createStore<typed.Get<typeof apiV1CommentsGetOk>['items']>([]);
export const $totalCommentsCount = createStore(0);
export const commentFormSubmit = createEvent<ApiV1CommentsPost>();

export type Replies = Record<
  string,
  typed.Get<typeof apiV1CommentsParentCommentIdRepliesGetOk>['items']
>;
export const $replies = createStore<Replies>({});
export const replyClicked = createEvent<ApiV1CommentsParentCommentIdRepliesGet>();
export const replyFormSubmit = createEvent<ApiV1CommentsParentCommentIdRepliesPost>();

const hub = signalRFactory<typed.Get<typeof apiV1CommentsGetOk>['items'][number]>('NewComment');

export const pagination = paginationFactory({
  route: currentRoute,
  limit: 10,
  totalCount: $totalCommentsCount,
});

sample({
  clock: currentRoute.opened,
  source: currentRoute.$params,
  fn: (params) => ({url: `/api/v1/hubs/comments?discussionId=${params.discussionId}`}),
  target: hub.start,
});

sample({
  clock: getDiscussionFx.doneData,
  fn: (payload) => payload.answer,
  target: $discussion,
});

sample({
  clock: [getDiscussionFx.doneData, pagination.pageChanged],
  source: {
    discussionId: $discussionId,
    offset: pagination.$offset,
    count: pagination.$limit,
  },
  fn: ({discussionId, offset, count}) => ({
    query: {
      discussionId,
      offset,
      count,
    },
  }),
  target: getCommentsFx,
});

sample({
  clock: getCommentsFx.doneData,
  fn: (payload) => ({
    totalCount: payload.answer.total_count,
    items: payload.answer.items,
  }),
  target: spread({
    targets: {
      totalCount: $totalCommentsCount,
      items: $comments,
    },
  }),
});

sample({
  clock: hub.messageReceived,
  source: $comments,
  filter: combine(
    pagination.$page,
    pagination.$totalPageCount,
    (page, totalPageCount) => page === totalPageCount,
  ),
  fn: (comments, newComment) =>
    produce(comments, (draft) => {
      const comment = draft.find((c) => c.id === newComment.id);
      if (comment === undefined) {
        // @ts-expect-error
        draft.push(newComment);
      }
    }),
  target: $comments,
});

sample({
  clock: hub.messageReceived,
  source: $totalCommentsCount,
  fn: (value) => value + 1,
  target: $totalCommentsCount,
});

sample({
  clock: commentFormSubmit,
  target: commentDiscussionFx,
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
