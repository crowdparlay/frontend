import type {Meta, StoryObj} from '@storybook/react';

import {Link, LinkVariant} from '.';

const meta: Meta<typeof Link> = {
  title: 'shared/Link',
  component: Link,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  args: {
    children: 'Sign In',
    variant: LinkVariant.PRIMARY,
  },
};

export const Clear: Story = {
  args: {
    children: 'Sign Up',
    variant: LinkVariant.CLEAR,
  },
};

export const Navigation: Story = {
  args: {
    children: 'Explore',
    variant: LinkVariant.NAVIGATION,
    active: true,
  },
};

export const Badge: Story = {
  args: {
    children: 'My bets',
    variant: LinkVariant.CLEAR,
    badge: 2,
  },
};
