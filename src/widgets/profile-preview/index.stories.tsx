import {Meta, StoryObj} from '@storybook/react';

import {ProfilePreview} from '.';

const meta: Meta<typeof ProfilePreview> = {
  title: 'widgets/ProfilePreview',
  component: ProfilePreview,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfilePreview>;

export const SignUp: Story = {
  args: {},
};

export const User: Story = {
  args: {
    username: 'mere1y',
    displayName: 'devyoursite',
    avatarUrl:
      'https://source.unsplash.com/random/100x100?sig=1',
  },
};

export const WithDate: Story = {
  args: {
    username: 'xIMRANx',
    displayName: 'Imran Akhmedov',
    avatarUrl:
      'https://source.unsplash.com/random/100x100?sig=1',
    date: new Date(),
    showDate: true,
  },
};

export const Verified: Story = {
  args: {
    username: 'crowdparlay',
    displayName: 'Crowd Parlay',
    avatarUrl:
      'https://source.unsplash.com/random/100x100?sig=1',
    verified: true,
  },
};
