import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {attach, createStore, sample} from 'effector';

import {
  apiV1DiscussionsGet,
  apiV1DiscussionsGetOk,
  apiV1UsersResolveGet,
  apiV1UsersResolveGetOk,
} from '~/shared/api';
import {routes} from '~/shared/routes';

const getUserFx = attach({effect: apiV1UsersResolveGet});
const getDiscussionsFx = attach({effect: apiV1DiscussionsGet});

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

export const $discussions = createStore<typed.Get<typeof apiV1DiscussionsGetOk>>([]);

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
    },
  }),
  target: getDiscussionsFx,
});

sample({
  clock: apiV1DiscussionsGet.doneData,
  fn: (x) => x.answer,
  target: $discussions,
});
