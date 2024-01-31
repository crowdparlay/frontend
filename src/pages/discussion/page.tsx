import {useUnit} from 'effector-react';

import {Page, Text, TextSize} from '~/shared/ui';

import {$comments, $discussion} from './model';

export const DiscussionPage = () => {
  const discussion = useUnit($discussion);
  const comments = useUnit($comments);

  return (
    <Page>
      <Text>авпыщвпвщап</Text>
      {discussion && (
        <>
          <Text size={TextSize.XL}>{discussion.title}</Text>
          <Text size={TextSize.M}>{discussion.description}</Text>
        </>
      )}
    </Page>
  );
};
