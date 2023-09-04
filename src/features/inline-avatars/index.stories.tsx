import {Meta, StoryObj} from '@storybook/react';

import {InlineAvatars} from './index';

const meta: Meta<typeof InlineAvatars> = {
  title: 'features/InlineAvatars',
  component: InlineAvatars,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InlineAvatars>;

export const Default: Story = {
  args: {
    users: [
      {
        username: 'mere1y',
        displayName: 'Me-re-ly!',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
      },
      {
        username: 'mere1y',
        displayName: 'Me-re-ly!',
      },
      {
        username: 'mere1y',
        displayName: 'Me-re-ly!',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=2',
      },
    ],
  },
};
