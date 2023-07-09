import type {Meta, StoryObj} from '@storybook/react';

import {Button, ButtonVariant} from '.';
import AddIcon from '../icon/assets/add.svg';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Sign In',
    variant: ButtonVariant.PRIMARY,
  },
};

export const Clear: Story = {
  args: {
    children: 'Sign Up',
    variant: ButtonVariant.CLEAR,
  },
};

export const Icon: Story = {
  args: {
    children: 'щитпост',
    variant: ButtonVariant.PRIMARY,
    Icon: () => <AddIcon />,
  },
};

export const Badge: Story = {
  args: {
    children: 'My bets',
    variant: ButtonVariant.CLEAR,
    badge: 2,
  },
};
