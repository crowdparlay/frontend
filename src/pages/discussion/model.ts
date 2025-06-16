import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {attach, combine, createEvent, createStore, sample} from 'effector';
import {produce} from 'immer';
import {spread} from 'patronum';

import {
  ApiV1CommentsCommentIdRepliesGet,
  apiV1CommentsCommentIdRepliesGetFx,
  apiV1CommentsCommentIdRepliesGetOk,
  ApiV1CommentsCommentIdRepliesPost,
  apiV1CommentsCommentIdRepliesPostFx,
  apiV1DiscussionsDiscussionIdCommentsGetFx,
  apiV1DiscussionsDiscussionIdCommentsGetOk,
  ApiV1DiscussionsDiscussionIdCommentsPost,
  apiV1DiscussionsDiscussionIdCommentsPostFx,
  apiV1DiscussionsDiscussionIdGetFx,
  apiV1DiscussionsDiscussionIdGetOk,
  apiV1LookupReactionsGetFx,
} from '~/shared/api';
import {paginationFactory} from '~/shared/factory/pagination.factory';
import {signalRFactory} from '~/shared/factory/signal-r.factory';
import {routes} from '~/shared/routes';

const getDiscussionFx = attach({effect: apiV1DiscussionsDiscussionIdGetFx});
const getCommentsFx = attach({effect: apiV1DiscussionsDiscussionIdCommentsGetFx});
const getRepliesFx = attach({effect: apiV1CommentsCommentIdRepliesGetFx});
const getAvailableReactionsFx = attach({effect: apiV1LookupReactionsGetFx, mapParams: () => ({})});
const commentDiscussionFx = attach({effect: apiV1DiscussionsDiscussionIdCommentsPostFx});
const commentReplyFx = attach({effect: apiV1CommentsCommentIdRepliesPostFx});

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

export const $isNotFound = createStore<boolean>(false);
sample({
  clock: getDiscussionFx.failData,
  fn: (x) => x.status === 'not_found',
  target: $isNotFound,
});

const $discussionId = currentRoute.$params.map((query) => query.discussionId);

export const $discussion = createStore<typed.Get<typeof apiV1DiscussionsDiscussionIdGetOk> | null>(
  null,
);

export const $comments = createStore<
  typed.Get<typeof apiV1DiscussionsDiscussionIdCommentsGetOk>['items']
>([]);
export const $totalCommentsCount = createStore(0);
export const commentFormSubmit = createEvent<ApiV1DiscussionsDiscussionIdCommentsPost>();

export type Replies = Record<string, typed.Get<typeof apiV1CommentsCommentIdRepliesGetOk>['items']>;
export const $replies = createStore<Replies>({});
export const replyClicked = createEvent<ApiV1CommentsCommentIdRepliesGet>();
export const replyFormSubmit = createEvent<ApiV1CommentsCommentIdRepliesPost>();

const hub =
  signalRFactory<typed.Get<typeof apiV1DiscussionsDiscussionIdCommentsGetOk>['items'][number]>(
    'NewComment',
  );

export const newCommentReceived = hub.messageReceived;

export const pagination = paginationFactory({
  route: currentRoute,
  limit: 10,
  totalCount: $totalCommentsCount,
});

sample({
  clock: [getDiscussionFx, pagination.pageChanged],
  target: getAvailableReactionsFx,
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
  source: {
    params: currentRoute.$params,
    offset: pagination.$offset,
    limit: pagination.$limit,
  },
  fn: ({params, offset, limit}) => ({
    path: {
      discussionId: params.discussionId,
    },
    query: {
      flatten: false,
      offset,
      count: limit,
    },
  }),
  target: getCommentsFx,
});

sample({
  clock: pagination.pageChanged,
  source: {
    discussionId: $discussionId,
    offset: pagination.$offset,
    count: pagination.$limit,
  },
  fn: ({discussionId, offset, count}) => ({
    path: {
      discussionId,
    },
    query: {
      flatten: false,
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
  clock: newCommentReceived,
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
      draft[params.path.commentId] = result.answer.items;
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
      commentId: params.path.commentId,
    },
    query: {
      flatten: true,
      offset: 0,
      count: 20,
    },
  }),
  target: getRepliesFx,
});
