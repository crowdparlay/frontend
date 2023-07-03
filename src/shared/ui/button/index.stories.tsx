import type {Meta, StoryObj} from '@storybook/react';

import AddIcon from '~/shared/assets/icons/add.svg';

import {Button, ButtonVariant} from '.';

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Icon: AddIcon,
  },
};

export const Badge: Story = {
  args: {
    children: 'My bets',
    variant: ButtonVariant.CLEAR,
    badge: 2,
  },
};
