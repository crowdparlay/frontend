import {chainRoute} from 'atomic-router';
import {createStore, sample} from 'effector';

import {apiV1CommentsGet, apiV1DiscussionsDiscussionIdGet} from '~/shared/api';
import {routes} from '~/shared/routes';

export const currentRoute = routes.discussion;

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: apiV1DiscussionsDiscussionIdGet,
    mapParams: ({params}) => {
      return {
        path: {
          discussionId: params.discussionId,
        },
      };
    },
  },
});

export const $discussion = createStore<any>(null);

sample({
  clock: apiV1DiscussionsDiscussionIdGet.doneData,
  fn: (x) => x.answer,
  target: $discussion,
});

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: apiV1CommentsGet,
    mapParams: ({params}) => {
      return {
        query: {
          discussionId: params.discussionId,
          size: 10,
          page: 0,
        },
      };
    },
  },
});

export const $comments = createStore<any>(null);

sample({
  clock: apiV1CommentsGet.doneData,
  fn: (x) => x.answer,
  target: $comments,
});
