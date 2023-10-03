import {RouteParams} from 'atomic-router';
import {createRouteView, RouteRecord} from 'atomic-router-react';

import {EditProfilePage} from './page';

import {PageLoader} from '~/widgets/page-loader';

import {authorizedRoute, currentRoute} from './model';

export const EditProfileRoute: RouteRecord<typeof EditProfilePage, RouteParams> = {
  view: createRouteView({route: authorizedRoute, view: EditProfilePage, otherwise: PageLoader}),
  route: currentRoute,
};
