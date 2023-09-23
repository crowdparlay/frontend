import {createRoutesView} from 'atomic-router-react';

import {HomeRoute} from './home';
import {ProfileRoute} from './profile';
import {SignInRoute} from './sign-in';
import {SignUpRoute} from './sign-up';
import {NotFoundRoute} from "~/pages/not-found";
import {ForbiddenRoute} from "~/pages/forbidden";

export const Pages = createRoutesView({
  routes: [HomeRoute, SignInRoute, SignUpRoute, ProfileRoute, NotFoundRoute, ForbiddenRoute],
});
