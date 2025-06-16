import {RouterProvider} from 'atomic-router-react';

import {Pages} from '~/pages';

import {Footer} from '~/widgets/footer';
import {Header} from '~/widgets/header';

import {ThemeProvider} from '~/shared/providers/theme-provider';
import {router} from '~/shared/routes';
import {Toaster} from '~/shared/ui/sonner';

import './styles/index.scss';

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}>
        <div className="app bg-background text-foreground">
          <Header />
          <Pages />
          <Footer />
          <Toaster />
        </div>
      </RouterProvider>
    </ThemeProvider>
  );
};
