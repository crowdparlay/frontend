import {chainRoute} from 'atomic-router';
import {attach, createStore, sample} from 'effector';

import {DiscussionEntity} from '~/entities/types';

import {apiV1DiscussionsGetFx, apiV1UsersResolveGetFx} from '~/shared/api';
import {UserEntity} from '~/shared/api/types';
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

export const $user = createStore<UserEntity | null>(null);

export const $discussions = createStore<DiscussionEntity[] | 'loading'>('loading');

sample({
  clock: getUserFx.doneData,
  fn: (x) => UserEntity.fromResponse(x.answer) ?? null,
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
  fn: (x) => x.answer.items.map((discussion) => DiscussionEntity.fromResponse(discussion)),
  target: $discussions,
});
