import * as typed from 'typed-contracts';
import {chainRoute, redirect, RouteInstance, RouteParams, RouteParamsAndQuery} from 'atomic-router';
import {attach, createEvent, createStore, Effect, sample} from 'effector';
import {decodeToken} from 'react-jwt';

import {ApiV1UsersUserIdGet, apiV1UsersUserIdGet, apiV1UsersUserIdGetOk} from '~/shared/api';
import {logoutFx} from '~/shared/api/auth';
import {JwtPayload} from '~/shared/api/types';
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from '~/shared/config';

import {routes} from '../routes';

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated,
}

export const sessionRequestFx = attach({effect: apiV1UsersUserIdGet});

export const $user = createStore<typed.Get<typeof apiV1UsersUserIdGetOk> | null>(null);
const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionRequestFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$user.on(sessionRequestFx.doneData, (_, user) => user.answer);
$authenticationStatus.on(sessionRequestFx.doneData, () => AuthStatus.Authenticated);

$authenticationStatus.on(sessionRequestFx.fail, () => AuthStatus.Anonymous);
$user.on(sessionRequestFx.fail, () => null);

$user.on(logoutFx.done, () => null);
$authenticationStatus.on(logoutFx.done, () => AuthStatus.Anonymous);

redirect({
  clock: logoutFx.done,
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
    fn: (): ApiV1UsersUserIdGet => {
      let userId: string = '';

      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      if (accessToken) {
        const jwtPayload = decodeToken<JwtPayload>(accessToken);
        if (jwtPayload) {
          userId = jwtPayload.sub;
        }
      }

      return {
        path: {
          userId,
        },
      };
    },
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
      // @ts-ignore
      target: otherwise as Event<void>,
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
    fn: (): ApiV1UsersUserIdGet => {
      let userId: string = '';

      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      if (accessToken) {
        const jwtPayload = decodeToken<JwtPayload>(accessToken);
        if (jwtPayload) {
          userId = jwtPayload.sub;
        }
      }

      return {
        path: {
          userId,
        },
      };
    },
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
