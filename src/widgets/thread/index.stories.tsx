import {Meta, StoryObj} from '@storybook/react';

import {Thread} from '.';

const meta: Meta<typeof Thread> = {
  title: 'widgets/Thread',
  component: Thread,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Thread>;

export const Default: Story = {
  args: {
    content: 'Тут по условию задачи нужно посчитать непрерывную серию нулей? Или просто количество нулей после минималки, даже если эта минималка повторяется',
    author: {
      username: 'crowdparlay',
      displayName: 'Crowd Parlay',
      avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
      verified: true,
    },
    replyAvatarUrls: [
      'https://source.unsplash.com/random/100x100?sig=2',
      'https://source.unsplash.com/random/100x100?sig=3',
      'https://source.unsplash.com/random/100x100?sig=4',
    ],
  },
};
