import {chainRoute} from 'atomic-router';
import {createStore, sample} from 'effector';

import {apiV1DiscussionsGet, apiV1UsersUserIdGet} from '~/shared/api';
import {routes} from '~/shared/routes';

export const currentRoute = routes.profile;

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: apiV1UsersUserIdGet,
    mapParams: ({params}) => {
      return {
        path: {
          userId: params.userId,
        },
      };
    },
  },
});

export const $user = createStore<any>(null);

sample({
  clock: apiV1UsersUserIdGet.doneData,
  fn: (x) => x.answer,
  target: $user,
});

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: apiV1DiscussionsGet,
    mapParams: ({params}) => {
      return {
        query: {
          authorId: params.userId,
        },
      };
    },
  },
});

export const $discussions = createStore<any>(null);

sample({
  clock: apiV1DiscussionsGet.doneData,
  fn: (x) => x.answer,
  target: $discussions,
});
