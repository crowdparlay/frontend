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
      avatarUrl: 'https://gitlab.otter.su/uploads/-/system/group/avatar/6/crowdparlay_fill.png?width=64',
      verified: true,
    },
    replyAvatarUrls: [
      'https://picsum.photos/70',
      'https://picsum.photos/80',
      'https://picsum.photos/90',
    ],
  },
};
