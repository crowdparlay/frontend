import {StoryFn} from '@storybook/react';
import {RouterProvider} from 'atomic-router-react';

import {router} from '../routes';

export const RouterDecorator = (Story: StoryFn) => (
  <RouterProvider router={router}>
    <Story />
  </RouterProvider>
);
