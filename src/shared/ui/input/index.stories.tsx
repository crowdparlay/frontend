import type {Meta, StoryObj} from '@storybook/react';

import {Input} from '~/shared/ui';

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Email',
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Password',
    defaultValue: 'toor',
    type: 'password',
  },
};

export const PasswordShown: Story = {
  args: {
    placeholder: 'Password',
    defaultValue: 'toor',
    type: 'password',
    alwaysShown: true,
  },
};

export const Hover: Story = {
  args: {
    hover: true,
    placeholder: 'Email',
  },
};

export const WithValue: Story = {
  args: {
    focus: true,
    placeholder: 'Email',
    defaultValue: 'mere1y@split-team.com',
  },
};

export const HoverWithValue: Story = {
  args: {
    hover: true,
    placeholder: 'Email',
    defaultValue: 'mere1y@split-team.com',
  },
};
