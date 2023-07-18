import {RouteParams} from 'atomic-router';
import {createRouteView, RouteRecord} from 'atomic-router-react';

import {PageLoader} from '~/widgets/page-loader';

import {anonymousRoute, currentRoute} from './model';
import {SignUpPage} from './page';

export const SignUpRoute: RouteRecord<typeof SignUpPage, RouteParams> = {
  view: createRouteView({route: anonymousRoute, view: SignUpPage, otherwise: PageLoader}),
  route: currentRoute,
};
