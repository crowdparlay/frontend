import {RouterProvider} from 'atomic-router-react';

import {Pages} from '~/pages';

import {Footer} from '~/widgets/footer';
import {Header} from '~/widgets/header';

import {router} from '~/shared/routes';

import './styles/index.scss';

export const App = () => {
  return (
    <RouterProvider router={router}>
      <div className="app">
        <Header />
        <Pages />
        <Footer />
      </div>
    </RouterProvider>
  );
};
