import {Meta, StoryObj} from '@storybook/react';

import {UserEntity} from '~/entities/types';

import {Avatar, AvatarVariant} from '.';

const meta: Meta<typeof Avatar> = {
  title: 'features/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const NoUserpic: Story = {
  args: {
    user: new UserEntity({
      id: '',
      username: 'mere1y',
      displayName: 'Me-re-ly!',
    }),
  },
};

export const Userpic: Story = {
  args: {
    user: new UserEntity({
      id: '',
      username: 'mere1y',
      displayName: 'Me-re-ly!',
      avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
    }),
  },
};

export const InlineNoUserpic: Story = {
  args: {
    user: new UserEntity({
      id: '',
      username: 'mere1y',
      displayName: 'Me-re-ly!',
    }),
    variant: AvatarVariant.INLINE,
  },
};

export const InlineUserpic: Story = {
  args: {
    user: new UserEntity({
      id: '',
      username: 'mere1y',
      displayName: 'Me-re-ly!',
      avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
    }),
    variant: AvatarVariant.INLINE,
  },
};
