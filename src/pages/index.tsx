import {createRoutesView} from 'atomic-router-react';

import {EditProfileRoute} from './edit-profile';
import {ForbiddenRoute} from './forbidden';
import {HomeRoute} from './home';
import {NotFoundRoute} from './not-found';
import {ProfileRoute} from './profile';
import {SignInRoute} from './sign-in';
import {SignUpRoute} from './sign-up';

export const Pages = createRoutesView({
  routes: [
    HomeRoute,
    SignInRoute,
    SignUpRoute,
    ProfileRoute,
    EditProfileRoute,
    NotFoundRoute,
    ForbiddenRoute,
  ],
});
