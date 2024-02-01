import {Meta, StoryObj} from '@storybook/react';

import {Text} from '~/shared/ui';

import {Card, CardSize} from '.';

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const S: Story = {
  args: {
    size: CardSize.S,
    children: <Text>content</Text>,
  },
};

export const M: Story = {
  args: {
    size: CardSize.M,
    children: <Text>content</Text>,
  },
};

export const L: Story = {
  args: {
    size: CardSize.L,
    children: <Text>content</Text>,
  },
};
