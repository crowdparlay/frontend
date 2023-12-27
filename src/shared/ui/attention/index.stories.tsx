import {Meta, StoryObj} from '@storybook/react';

import {Attention} from '.';
import {PaddingDecorator} from '../../decorators';

const meta: Meta<typeof Attention> = {
  title: 'shared/Attention',
  component: Attention,
  tags: ['autodocs'],
  decorators: [PaddingDecorator(40, 40)],
};

export default meta;
type Story = StoryObj<typeof Attention>;

export const Error: Story = {
  args: {
    children:
      'Случилось что-то ужасное и непоправимое настолько, что двух слов будет недостаточно, чтобы выразить безысходность ситуации.',
  },
};
