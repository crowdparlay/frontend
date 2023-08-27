import {Meta, StoryObj} from '@storybook/react';

import {Thread} from './index';

const meta: Meta<typeof Thread> = {
  title: 'features/Thread',
  component: Thread,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Thread>;

export const Default: Story = {
  args: {
    content:
      'Тут по условию задачи нужно посчитать непрерывную серию нулей? Или просто количество нулей после минималки, даже если эта минималка повторяется',
    author: {
      username: 'crowdparlay',
      displayName: 'Crowd Parlay',
      avatarUrl: 'https://source.unsplash.com/random/100x100?sig=1',
      verified: true,
    },
    replyCount: 3,
    repliers: [
      {
        username: 'zendet',
        displayName: 'Z E N D E T',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=2'
      },
      {
        username: 'crowdparlay',
        displayName: 'Crowd Parlay'
      },
    ]
  },
};
