import {RouteParams} from 'atomic-router';
import {createRouteView, RouteRecord} from 'atomic-router-react';

import {PageLoader} from '~/widgets/page-loader';

import {anonymousRoute, currentRoute} from './model';
import {SignInPage} from './page';

export const SignInRoute: RouteRecord<typeof SignInPage, RouteParams> = {
  view: createRouteView({route: anonymousRoute, view: SignInPage, otherwise: PageLoader}),
  route: currentRoute,
};
