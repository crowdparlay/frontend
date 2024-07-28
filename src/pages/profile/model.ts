import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {attach, createStore, sample} from 'effector';

import {
  apiV1DiscussionsGetFx,
  apiV1DiscussionsGetOk,
  apiV1UsersResolveGetFx,
  apiV1UsersResolveGetOk,
} from '~/shared/api';
import {routes} from '~/shared/routes';

const getUserFx = attach({effect: apiV1UsersResolveGetFx});
const getDiscussionsFx = attach({effect: apiV1DiscussionsGetFx});

export const currentRoute = routes.profile;

export const dataLoadedRoute = chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: getUserFx,
    mapParams: ({params}) => {
      return {
        query: {
          username: params.username,
        },
      };
    },
  },
});

export const $user = createStore<typed.Get<typeof apiV1UsersResolveGetOk> | null>(null);

export const $discussions = createStore<typed.Get<typeof apiV1DiscussionsGetOk>['items']>([]);

sample({
  clock: getUserFx.doneData,
  fn: (x) => x.answer,
  target: $user,
});

sample({
  clock: getUserFx.doneData,
  fn: ({answer}) => ({
    query: {
      authorId: answer.id!,
      count: 20,
      offset: 0,
    },
  }),
  target: getDiscussionsFx,
});

sample({
  clock: getDiscussionsFx.doneData,
  fn: (x) => x.answer.items,
  target: $discussions,
});
