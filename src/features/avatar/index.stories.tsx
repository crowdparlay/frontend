import {Meta, StoryObj} from '@storybook/react';

import {Avatar, AvatarVariant} from './index';

const meta: Meta<typeof Avatar> = {
  title: 'features/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const NoUserpic: Story = {
  args: {
    username: 'mere1y',
    displayName: 'Me-re-ly!',
  },
};

export const Userpic: Story = {
  args: {
    username: 'mere1y',
    displayName: 'Me-re-ly!',
    avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
  },
};

export const InlineNoUserpic: Story = {
  args: {
    username: 'mere1y',
    displayName: 'Me-re-ly!',
    variant: AvatarVariant.INLINE,
  },
};

export const InlineUserpic: Story = {
  args: {
    username: 'mere1y',
    displayName: 'Me-re-ly!',
    avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
    variant: AvatarVariant.INLINE,
  },
};
