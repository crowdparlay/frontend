import {Meta, StoryObj} from '@storybook/react';

import {InlineAvatars} from '.';

const meta: Meta<typeof InlineAvatars> = {
  title: 'widgets/InlineAvatars',
  component: InlineAvatars,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InlineAvatars>;

export const Default: Story = {
  args: {
    avatarUrls: [
      'https://source.unsplash.com/random/100x100?sig=1',
      'https://source.unsplash.com/random/100x100?sig=2',
      'https://source.unsplash.com/random/100x100?sig=3',
    ]
  },
};
