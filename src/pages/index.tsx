import {createRoutesView} from 'atomic-router-react';

import {ForbiddenRoute} from '~/pages/forbidden';
import {NotFoundRoute} from '~/pages/not-found';

import {HomeRoute} from './home';
import {ProfileRoute} from './profile';
import {SignInRoute} from './sign-in';
import {SignUpRoute} from './sign-up';

export const Pages = createRoutesView({
  routes: [HomeRoute, SignInRoute, SignUpRoute, ProfileRoute, NotFoundRoute, ForbiddenRoute],
});
