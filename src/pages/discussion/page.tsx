import {useList, useUnit} from 'effector-react';

import {Post} from '~/widgets/post';

import {Container, ContainerSize, Page, Text, TextSize} from '~/shared/ui';
import {Card, CardSize} from '~/shared/ui/card';

import * as model from './model';
import cls from './page.module.scss';

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
      commentators={comment.first_replies_authors!.map((x) => ({
        id: x.id!,
        username: x.username!,
        displayName: x.display_name!,
        avatarUrl: x.avatar_url!,
      }))}
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
      <Container size={ContainerSize.M}>
        <Card size={CardSize.L} className={cls.head}>
          <Text size={TextSize.XL} style={{marginBottom: 20}}>
            {discussion.title!}
          </Text>
          <Text size={TextSize.M}>{discussion.description!}</Text>
        </Card>
      </Container>

      <Container size={ContainerSize.M}>{comments}</Container>
    </Page>
  );
};
