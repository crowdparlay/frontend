import {RouterProvider} from 'atomic-router-react';

import {Pages} from '~/pages';

import {Header} from '~/widgets/header';

import {router} from '~/shared/routes';

import './styles/index.scss';

export const App = () => {
  return (
    <RouterProvider router={router}>
      <div className="app">
        <Header />

        <Pages />
      </div>
    </RouterProvider>
  );
};
