import type {Preview} from '@storybook/react';
import '~/app/styles/index.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        {name: 'black', value: '#000'},
        {name: 'white', value: '#fff'},
      ],
    },
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
