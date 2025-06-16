import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/widgets/page-loader';

import {currentRoute} from './model';
import {ExplorePage} from './page';

export const ExploreRoute = {
  view: createRouteView({
    route: currentRoute,
    view: ExplorePage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
