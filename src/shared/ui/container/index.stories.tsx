import {Meta, StoryObj} from '@storybook/react';

import {Text} from '~/shared/ui';

import {Container, ContainerSize} from '.';

const meta: Meta<typeof Container> = {
  title: 'shared/Container',
  component: Container,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const S: Story = {
  args: {
    size: ContainerSize.S,
    children: <Text>content</Text>,
  },
};

export const M: Story = {
  args: {
    size: ContainerSize.M,
    children: <Text>content</Text>,
  },
};

export const L: Story = {
  args: {
    size: ContainerSize.L,
    children: <Text>content</Text>,
  },
};

export const XL: Story = {
  args: {
    size: ContainerSize.XL,
    children: <Text>content</Text>,
  },
};
