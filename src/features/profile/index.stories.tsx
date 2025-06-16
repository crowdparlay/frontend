import {Meta, StoryObj} from '@storybook/react';

import {Profile} from '.';

const meta: Meta<typeof Profile> = {
  title: 'features/Profile',
  component: Profile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const SignUp: Story = {
  args: {
    username: 'mere1y',
    displayName: 'Me-re-ly!',
  },
};

export const User: Story = {
  args: {
    username: 'mere1y',
    displayName: 'Me-re-ly!',
    avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
  },
};
