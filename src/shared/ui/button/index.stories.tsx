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
    children: 'Sign in',
    variant: ButtonVariant.PRIMARY,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    children: 'щитпост',
    variant: ButtonVariant.PRIMARY,
    Icon: () => <AddIcon />,
  },
}

export const PrimarySingleIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    Icon: () => <AddIcon />,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Sign in',
    variant: ButtonVariant.SECONDARY,
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    children: 'щитпост',
    variant: ButtonVariant.SECONDARY,
    Icon: () => <AddIcon />,
  },
};

export const SecondarySingleIcon: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    Icon: () => <AddIcon />,
  },
};

export const Clear: Story = {
  args: {
    children: 'Sign up',
    variant: ButtonVariant.CLEAR,
  },
};

export const ClearWithIcon: Story = {
  args: {
    children: 'щитпост',
    variant: ButtonVariant.CLEAR,
    Icon: () => <AddIcon />,
  },
};

export const ClearWithBadge: Story = {
  args: {
    children: 'My bets',
    variant: ButtonVariant.CLEAR,
    badge: 2,
  },
};
