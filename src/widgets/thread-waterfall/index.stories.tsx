import {Meta, StoryObj} from '@storybook/react';

import {ThreadWaterfall} from '.';

const meta: Meta<typeof ThreadWaterfall> = {
  title: 'widgets/ThreadWaterfall',
  component: ThreadWaterfall,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThreadWaterfall>;

export const Default: Story = {};
