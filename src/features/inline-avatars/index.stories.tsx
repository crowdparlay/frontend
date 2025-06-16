import {Meta, StoryObj} from '@storybook/react';

import {UserEntity} from '~/entities/types';

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
      new UserEntity({
        id: '',
        username: 'mere1y',
        displayName: 'Me-re-ly!',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
      }),
      new UserEntity({
        id: '',
        username: 'mere1y',
        displayName: 'Me-re-ly!',
      }),
      new UserEntity({
        id: '',
        username: 'mere1y',
        displayName: 'Me-re-ly!',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=2',
      }),
    ],
  },
};
