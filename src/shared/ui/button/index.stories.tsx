import type {Meta, StoryObj} from '@storybook/react';

import {Button, ButtonShape, ButtonVariant} from '.';
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
    variant: ButtonVariant.PRIMARY,
    children: <p>Sign in</p>,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    children: [<AddIcon />, <p>щитпост</p>],
  },
};

export const PrimarySingleIcon: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    shape: ButtonShape.EQUILATERAL,
    children: <AddIcon />,
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    children: <p>Sign in</p>,
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    shape: ButtonShape.EQUILATERAL,
    children: <AddIcon />,
  },
};

export const SecondarySingleIcon: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    children: [<AddIcon />, <p>щитпост</p>],
  },
};

export const Inline: Story = {
  args: {
    variant: ButtonVariant.INLINE,
    children: <p>show more</p>,
  },
};
