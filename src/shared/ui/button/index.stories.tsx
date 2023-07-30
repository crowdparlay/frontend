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
    text: 'Sign in',
    variant: ButtonVariant.PRIMARY,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    text: 'щитпост',
    variant: ButtonVariant.PRIMARY,
    children: <AddIcon />,
  },
};

export const PrimarySingleIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    children: <AddIcon />,
  },
};

export const Secondary: Story = {
  args: {
    text: 'Sign in',
    variant: ButtonVariant.SECONDARY,
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    text: 'щитпост',
    variant: ButtonVariant.SECONDARY,
    children: <AddIcon />,
  },
};

export const SecondarySingleIcon: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    children: <AddIcon />,
  },
};
