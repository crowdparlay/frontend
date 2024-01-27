import {Meta, StoryObj} from '@storybook/react';

import {TextArea} from '.';

const meta: Meta<typeof TextArea> = {
  title: 'shared/TextArea',
  component: TextArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Введите, вставьте, вырежьте текст здесь...',
    maxLength: 500,
  },
};
