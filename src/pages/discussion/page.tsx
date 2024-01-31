import {useList, useUnit} from 'effector-react';

import {Post} from '~/widgets/post';

import {Container, ContainerSize, Page, Text, TextSize} from '~/shared/ui';

import * as model from './model';

export const DiscussionPage = () => {
  const [discussion] = useUnit([model.$discussion]);

  const comments = useList(model.$comments, (comment) => (
    <Post
      key={comment.id!}
      id={comment.id!}
      author={{
        id: comment.author!.id!,
        username: comment.author!.username!,
        displayName: comment.author!.display_name!,
        avatarUrl: comment.author!.avatar_url!,
      }}
      date={new Date(comment.created_at!)}
      text={comment.content!}
      commentators={[]}
      commentsCount={comment.reply_count!}
      canReply={true}
      canReport={true}
    />
  ));

  if (!discussion) {
    return null;
  }

  return (
    <Page>
      <Text size={TextSize.XL}>{discussion.title!}</Text>
      <Text size={TextSize.M}>{discussion.description!}</Text>

      <Container size={ContainerSize.M}>{comments}</Container>
    </Page>
  );
};
