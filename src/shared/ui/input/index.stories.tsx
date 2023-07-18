import type {Meta, StoryObj} from '@storybook/react';

import {Input} from '~/shared/ui';

import {PaddingDecorator} from '../../decorators';

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [PaddingDecorator(40, 40)],
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

export const Invalid: Story = {
  args: {
    placeholder: 'Email',
    defaultValue: 'mere1y@',
    isInvalid: true,
    errorMessage: 'Invalid mail provider',
  },
};

export const PasswordInvalid: Story = {
  args: {
    placeholder: 'Email',
    defaultValue: 'toor',
    type: 'password',
    isInvalid: true,
    errorMessage: 'Password must be unique',
  },
};
