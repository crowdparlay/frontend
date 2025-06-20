import {Meta, StoryObj} from '@storybook/react';

import {UserEntity} from '~/entities/types';

import {RouterDecorator} from '~/shared/decorators';

import {Header} from '.';

const meta: Meta<typeof Header> = {
  title: 'widgets/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [RouterDecorator],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Unauthorized: Story = {
  args: {},
};

export const Authorized: Story = {
  args: {
    forceUser: new UserEntity({
      id: '1',
      username: 'compartmental',
      displayName: 'Степной ишак',
    }),
  },
};
