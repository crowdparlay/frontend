import {Meta, StoryObj} from '@storybook/react';

import {Pagination} from '.';

const meta: Meta<typeof Pagination> = {
  title: 'shared/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  args: {
    total: 23,
  },
};
