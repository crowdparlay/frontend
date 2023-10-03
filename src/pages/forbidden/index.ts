import {currentRoute} from './model';
import {ForbiddenPage} from './page';

export const ForbiddenRoute = {
  view: ForbiddenPage,
  route: currentRoute,
};
