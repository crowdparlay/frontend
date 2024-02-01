import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {createStore, sample} from 'effector';
import {attach} from 'effector/compat';

import {
  apiV1CommentsGet,
  apiV1CommentsGetOk,
  apiV1DiscussionsDiscussionIdGet,
  apiV1DiscussionsDiscussionIdGetOk,
} from '~/shared/api';
import {routes} from '~/shared/routes';

const getDiscussionFx = attach({effect: apiV1DiscussionsDiscussionIdGet});
const getCommentsFx = attach({effect: apiV1CommentsGet});

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
      size: 10,
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
