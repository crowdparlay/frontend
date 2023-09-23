import {currentRoute} from './model';
import {NotFoundPage} from './page';

export const ForbiddenRoute = {
  view: NotFoundPage,
  route: currentRoute,
};
