import {attach, createStore, sample} from 'effector';
import {spread} from 'patronum';

import {UserEntity} from '~/entities/types';

import {apiV1UsersGetFx} from '~/shared/api';
import {routes} from '~/shared/routes';

export const currentRoute = routes.profiles;

export const $users = createStore<UserEntity[] | 'loading'>('loading');
export const $totalCount = createStore(0);

const loadUsersFx = attach({
  effect: apiV1UsersGetFx,
  mapParams: () => ({query: {offset: 0, count: 100}}),
});

sample({
  clock: currentRoute.opened,
  target: loadUsersFx,
});

sample({
  clock: loadUsersFx.doneData,
  fn: ({answer}) => ({
    users: (answer.items as any[]).map((item) => UserEntity.fromResponse(item)!),
    totalCount: answer.total_count!,
  }),
  target: spread({
    targets: {
      users: $users,
      totalCount: $totalCount,
    },
  }),
});
