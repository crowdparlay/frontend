import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
  UnmappedRouteObject,
} from 'atomic-router';
import {sample} from 'effector';
import {createBrowserHistory} from 'history';

import {appStarted} from '~/shared/config/init';

export const routes = {
  home: createRoute(),
  auth: {
    signIn: createRoute(),
    signUp: createRoute(),
    resetPassword: createRoute(),
  },
  profile: createRoute<{username: string}>(),
  editProfile: createRoute(),
  explore: createRoute(),
  bets: createRoute(),
  events: createRoute(),
  bookmarks: createRoute(),
  discussion: createRoute<{discussionId: string}>(),
  problems: {
    notFound: createRoute(),
    forbidden: createRoute(),
  },
};

export const controls = createRouterControls();

export const routesMap: UnmappedRouteObject<any>[] = [
  {path: '/', route: routes.home},
  {path: '/sign-in', route: routes.auth.signIn},
  {path: '/sign-up', route: routes.auth.signUp},
  {path: '/reset-password', route: routes.auth.resetPassword},
  {path: '/u/:username', route: routes.profile},
  {path: '/edit-profile', route: routes.editProfile},
  {path: '/explore', route: routes.explore},
  {path: '/bets', route: routes.bets},
  {path: '/events', route: routes.events},
  {path: '/bookmarks', route: routes.bookmarks},
  {path: '/d/:discussionId', route: routes.discussion},
  {path: '/forbidden', route: routes.problems.forbidden},
];

export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute: routes.problems.notFound,
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
