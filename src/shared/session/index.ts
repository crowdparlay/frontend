import * as typed from 'typed-contracts';
import {
  chainRoute,
  redirect,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  RouteQuery,
} from 'atomic-router';
import {attach, createEvent, createStore, Effect, sample} from 'effector';
import {persist} from 'effector-storage/local';

import {
  apiV1AuthenticationSignOutPostFx,
  apiV1UsersSelfGetFx,
  apiV1UsersUserIdGetOk,
} from '~/shared/api';

import {routes, routesMap} from '../routes';

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated,
}

export const sessionRequestFx = attach({
  effect: apiV1UsersSelfGetFx,
});

export const $user = createStore<typed.Get<typeof apiV1UsersUserIdGetOk> | null>(null);
persist({store: $user, key: 'user'});

const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionRequestFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$user.on(sessionRequestFx.doneData, (_, user) => user.answer);
$authenticationStatus.on(sessionRequestFx.doneData, () => AuthStatus.Authenticated);

$authenticationStatus.on(sessionRequestFx.fail, () => AuthStatus.Anonymous);
$user.on(sessionRequestFx.fail, () => null);

$user.on(apiV1AuthenticationSignOutPostFx.done, () => null);
$authenticationStatus.on(apiV1AuthenticationSignOutPostFx.done, () => AuthStatus.Anonymous);

redirect({
  clock: apiV1AuthenticationSignOutPostFx.done,
  route: routes.auth.signIn,
});

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ChainParams<Params extends RouteParams> {
  // @ts-ignore
  otherwise?: Event<void> | Effect<void, any, any>;
}

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  {otherwise}: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAnonymous, sessionRequestFx.fail],
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      fn: () => {
        const routeMap = routesMap.find((r) => r.route === route);

        if (routeMap) {
          const returnUrl = new URL(routeMap.path, window.location.origin).href;
          return {
            query: {
              returnUrl,
            },
          };
        }
      },
      // @ts-ignore
      target: otherwise as Event<{query: RouteQuery} | void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionRequestFx.done],
    cancelOn: sessionReceivedAnonymous,
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  {otherwise}: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAuthenticated, sessionRequestFx.done],
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      // @ts-ignore
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionRequestFx.fail],
    cancelOn: sessionReceivedAuthenticated,
  });
}
