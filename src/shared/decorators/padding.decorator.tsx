import {StoryFn} from '@storybook/react';

export const PaddingDecorator = (paddingTop: number, paddingBottom: number) => (Story: StoryFn) =>
  (
    <div style={{paddingTop, paddingBottom}}>
      <Story />
    </div>
  );
