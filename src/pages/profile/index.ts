import {RouteInstance, RouteParams} from 'atomic-router';
import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/widgets/page-loader';

import {currentRoute, dataLoadedRoute} from './model';
import {ProfilePage} from './page';

export const ProfileRoute = {
  view: createRouteView({
    route: dataLoadedRoute as unknown as RouteInstance<RouteParams>,
    view: ProfilePage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
