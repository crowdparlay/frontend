import {RouteInstance, RouteParams} from 'atomic-router';
import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/widgets/page-loader';

import {currentRoute, dataLoadedRoute} from './model';
import {DiscussionPage} from './page';

export const DiscussionRoute = {
  view: createRouteView({
    route: dataLoadedRoute as unknown as RouteInstance<RouteParams>,
    view: DiscussionPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
