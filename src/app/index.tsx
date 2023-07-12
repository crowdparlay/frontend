import {RouterProvider} from 'atomic-router-react';

import {Pages} from '~/pages';

import {router} from '~/shared/routes';

import './styles/index.scss';

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
};
