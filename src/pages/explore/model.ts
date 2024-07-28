import * as typed from 'typed-contracts';
import {chainRoute} from 'atomic-router';
import {attach, createStore, sample} from 'effector';
import {debug} from 'patronum';

import {apiV1DiscussionsGetFx, apiV1DiscussionsGetOk} from '~/shared/api';
import {routes} from '~/shared/routes';
import {chainAuthorized} from '~/shared/session';

const getDiscussionsFx = attach({effect: apiV1DiscussionsGetFx});

export const currentRoute = routes.explore;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signIn.navigate,
});

export const $discussions = createStore<typed.Get<typeof apiV1DiscussionsGetOk>['items']>([]);

chainRoute({
  route: authorizedRoute,
  beforeOpen: {
    effect: getDiscussionsFx,
    mapParams: () => ({
      query: {
        count: 20,
        offset: 0,
      },
    }),
  },
});

sample({
  clock: getDiscussionsFx.doneData,
  fn: (payload) => payload.answer.items,
  target: $discussions,
});

debug(getDiscussionsFx, $discussions);
