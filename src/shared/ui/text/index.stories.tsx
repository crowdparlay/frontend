import {Meta, StoryObj} from '@storybook/react';

import {Text, TextSize} from '.';

const meta: Meta<typeof Text> = {
  title: 'shared/Text',
  component: Text,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: '@crowdparlay',
  },
};

export const S: Story = {
  args: {
    children: '@crowdparlay',
    size: TextSize.S,
  },
};

export const M: Story = {
  args: {
    children: '@crowdparlay',
    size: TextSize.M,
  },
};

export const L: Story = {
  args: {
    children: 'Who is going to win?',
    Component: 'h3',
    size: TextSize.L,
    style: {
      color: '#fff',
    },
  },
};

export const Xl: Story = {
  args: {
    children: 'Discussion',
    Component: 'h2',
    size: TextSize.XL,
    style: {
      color: '#fff',
    },
  },
};

export const Mixed: Story = {
  args: {
    children: (
      <>
        <i>ммм... кстати, прод.</i> @compartmental <b>скоро</b> у меня сервак придёт, я <b>смогу</b>{' '}
        на нём gitlab локально развернуть и попрактикуюсь в <i>CI/</i>CD. идёт?
      </>
    ),
    size: TextSize.M,
  },
};
