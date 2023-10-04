import type {Meta, StoryObj} from '@storybook/react';

import {Link, LinkVariant} from '.';
import {RouterDecorator} from '../../decorators';
import AddIcon from '../icon/assets/add.svg';

const meta: Meta<typeof Link> = {
  title: 'shared/Link',
  component: Link,
  tags: ['autodocs'],
  decorators: [RouterDecorator],
};

const to = '';

export default meta;
type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  args: {
    children: 'Sign In',
    variant: LinkVariant.PRIMARY,
    to,
  },
};

export const Clear: Story = {
  args: {
    children: 'Sign Up',
    variant: LinkVariant.CLEAR,
    to,
  },
};

export const Icon: Story = {
  args: {
    children: 'щитпост',
    variant: LinkVariant.PRIMARY,
    Icon: () => <AddIcon />,
    to,
  },
};

export const Badge: Story = {
  args: {
    children: 'My bets',
    variant: LinkVariant.CLEAR,
    badge: 2,
    to,
  },
};

export const Raw: Story = {
  args: {
    children: 'Reset password',
    variant: LinkVariant.RAW,
    to,
  },
};

export const Navigation: Story = {
  args: {
    children: 'Explore',
    variant: LinkVariant.NAVIGATION,
    to,
  },
};
