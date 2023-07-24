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
      'https://picsum.photos/70',
      'https://picsum.photos/80',
      'https://picsum.photos/90',
    ]
  },
};
