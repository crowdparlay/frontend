import {Meta, StoryObj} from '@storybook/react';

import {ReplyForm} from '.';

const meta: Meta<typeof ReplyForm> = {
  title: 'features/ReplyForm',
  component: ReplyForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ReplyForm>;

export const Default: Story = {
  args: {
    postId: '1',
    maxLength: 500,
  },
};
