import {Meta, StoryObj} from '@storybook/react';

import {Page} from '.';
import {Text} from '../text';

const meta: Meta<typeof Page> = {
  title: 'shared/Page',
  component: Page,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    children: <Text>Default page</Text>,
  },
};
