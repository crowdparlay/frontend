import {useList, useUnit} from 'effector-react';

import {NotFoundPage} from '~/pages/not-found/page';

import {
  Avatar,
  Button,
  ButtonShape,
  ButtonVariant,
  Container,
  ContainerSize,
  Page,
  Text,
  TextSize,
} from '~/shared/ui';
import {Card, CardSize} from '~/shared/ui/card';

import * as model from './model';
import ChatIcon from './assets/chat.svg';
import FollowIcon from './assets/follow.svg';
import MoreIcon from './assets/more.svg';
import ReportIcon from './assets/report.svg';
import cls from './page.module.scss';

export const ProfilePage = () => {
  const user = useUnit(model.$user);

  const discussions = useList(model.$discussions, (discussion) => (
    <a href={`/d/${discussion.id}`}>
      <Card size={CardSize.L} style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        <Text size={TextSize.L}>{discussion.title!}</Text>
        <Text size={TextSize.M}>{discussion.description!}</Text>
      </Card>
    </a>
  ));

  if (!user) {
    return null;
  }

  return (
    <Page>
      <Container size={ContainerSize.M} className={cls.head}>
        <Avatar
          className={cls.avatar}
          avatarUrl={user.avatar_url!}
          username={user.username!}
          displayName={user.display_name!}
        />
        <div className={cls.column}>
          <Text className={cls.displayName} size={TextSize.XL}>
            {user.display_name!}
          </Text>
          <Text size={TextSize.M}>@{user.username!}</Text>
        </div>
        <Text className={cls.bio} center={true} size={TextSize.M}>
          Fulltext search in Neo4j is supported by means of fulltext schema indexes. Fulltext schema
          indexes are created, dropped, and updated transactionally, and are automatically
          replicated throughout a cluster.
        </Text>
        <div className={cls.actions}>
          <Button variant={ButtonVariant.PRIMARY}>
            <FollowIcon />
            Follow
          </Button>
          <Button variant={ButtonVariant.SECONDARY} shape={ButtonShape.EQUILATERAL}>
            <ChatIcon />
          </Button>
          <Button variant={ButtonVariant.SECONDARY} shape={ButtonShape.EQUILATERAL}>
            <ReportIcon />
          </Button>
          <Button variant={ButtonVariant.SECONDARY} shape={ButtonShape.EQUILATERAL}>
            <MoreIcon />
          </Button>
        </div>
      </Container>

      <Container size={ContainerSize.M} className={cls.discussions}>
        {discussions}
      </Container>
    </Page>
  );
};
