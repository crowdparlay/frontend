import {useList, useUnit} from 'effector-react';

import {Page, Text, TextSize} from '~/shared/ui';

import * as model from './model';

export const DiscussionPage = () => {
  const [discussion] = useUnit([model.$discussion]);

  const comments = useList(model.$comments, (comment) => (
    <Text key={comment.id!}>{comment.content!}</Text>
  ));

  if (!discussion) {
    return null;
  }

  return (
    <Page>
      <Text>авпыщвпвщап</Text>
      <Text size={TextSize.XL}>{discussion.title!}</Text>
      <Text size={TextSize.M}>{discussion.description!}</Text>

      {comments}
    </Page>
  );
};
