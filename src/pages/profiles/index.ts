import {currentRoute} from '~/pages/profiles/model';
import {ProfilesPage} from '~/pages/profiles/page';

export const ProfilesRoute = {
  view: ProfilesPage,
  route: currentRoute,
};
