import {useList, useUnit} from 'effector-react';

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

import * as model from './model';
import ChatIcon from './assets/chat.svg';
import MoreIcon from './assets/more.svg';
import ReportIcon from './assets/report.svg';
import cls from './page.module.scss';

export const ProfilePage = () => {
  const user = useUnit(model.$user);

  const discussions = useList(model.$discussions, (discussion) => (
    <a href={`/d/${discussion.id}`}>
      <div className={cls.discussionCard}>
        <Text size={TextSize.L}>{discussion.title!}</Text>
        <Text size={TextSize.M}>{discussion.description!}</Text>
      </div>
    </a>
  ));

  if (!user) {
    return null;
  }

  return (
    <Page>
      <Container className={cls.head} size={ContainerSize.M}>
        <Avatar
          className={cls.avatar}
          avatarUrl={user.avatar_url!}
          username={user.username!}
          displayName={user.display_name!}
        />
        <Text className={cls.displayName} center={true} size={TextSize.XL}>
          {user.username!}
        </Text>
        <Text size={TextSize.M} Component="h1">
          @{user.username!}
        </Text>
        <Text className={cls.bio} center={true} size={TextSize.M}>
          Fulltext search in Neo4j is supported by means of fulltext schema indexes. Fulltext schema
          indexes are created, dropped, and updated transactionally, and are automatically
          replicated throughout a cluster.
        </Text>
        <div className={cls.actions}>
          <Button>Subscribe</Button>
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
