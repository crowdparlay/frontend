import {Meta, StoryObj} from '@storybook/react';

import {Select, SelectOption} from '.';
import {PaddingDecorator} from '../../decorators';

const meta: Meta<typeof Select> = {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

enum FormatMode {
  HTML,
  MARKDOWN,
  MARKDOWN_V2,
  ATTR,
}

const options: SelectOption[] = [
  {
    value: FormatMode.HTML,
    label: 'HTML',
  },
  {value: FormatMode.MARKDOWN, label: 'Markdown'},
  {value: FormatMode.ATTR, label: 'Attributes', disabled: true},
  {value: FormatMode.MARKDOWN_V2, label: 'Markdown V2'},
];

export const Bottom: Story = {
  decorators: [PaddingDecorator(0, 300)],
  args: {
    options,
    position: 'bottom',
  },
};

export const Top: Story = {
  decorators: [PaddingDecorator(300, 0)],
  args: {
    options,
    position: 'top',
  },
};
