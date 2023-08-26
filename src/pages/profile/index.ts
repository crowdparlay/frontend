import {RouteParams} from 'atomic-router';
import {createRouteView, RouteRecord} from 'atomic-router-react';

import {ProfilePage} from '~/pages/profile/page';

import {PageLoader} from '~/widgets/page-loader';

import {authorizedRoute, currentRoute} from './model';

export const ProfileRoute: RouteRecord<typeof ProfilePage, RouteParams> = {
  view: createRouteView({route: authorizedRoute, view: ProfilePage, otherwise: PageLoader}),
  route: currentRoute,
};
