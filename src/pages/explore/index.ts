import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/widgets/page-loader';

import {authorizedRoute, currentRoute} from './model';
import {ExplorePage} from './page';

export const ExploreRoute = {
  view: createRouteView({
    route: authorizedRoute,
    view: ExplorePage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
