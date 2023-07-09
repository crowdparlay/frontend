import {Meta, StoryObj} from '@storybook/react';

import {Select, SelectOption} from '.';

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
  decorators: [
    (Story) => (
      <div style={{paddingBottom: 300}}>
        <Story />
      </div>
    ),
  ],
  args: {
    options,
    position: 'bottom',
  },
};

export const Top: Story = {
  decorators: [
    (Story) => (
      <div style={{paddingTop: 300}}>
        <Story />
      </div>
    ),
  ],
  args: {
    options,
    position: 'top',
  },
};
