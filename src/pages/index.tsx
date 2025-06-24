import {createRoutesView} from 'atomic-router-react';

import {ProfilesRoute} from '~/pages/profiles';

import {DiscussionRoute} from './discussion';
import {EditProfileRoute} from './edit-profile';
import {ExploreRoute} from './explore';
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
    ProfilesRoute,
    ExploreRoute,
    ProfileRoute,
    EditProfileRoute,
    DiscussionRoute,
    NotFoundRoute,
    ForbiddenRoute,
  ],
});
