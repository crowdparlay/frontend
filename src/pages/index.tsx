import {createRoutesView} from 'atomic-router-react';

import {ProfileRoute} from '~/pages/profile';

import {HomeRoute} from './home';
import {SignInRoute} from './sign-in';
import {SignUpRoute} from './sign-up';

export const Pages = createRoutesView({
  routes: [HomeRoute, SignInRoute, SignUpRoute, ProfileRoute],
});
