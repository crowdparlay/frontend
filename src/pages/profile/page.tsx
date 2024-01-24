import {ThreadWaterfall} from '~/widgets/thread-waterfall';

import {Avatar} from '~/shared/ui';
import {
  Button,
  ButtonShape,
  ButtonVariant,
  Container,
  ContainerSize,
  Page,
  Text,
  TextSize,
} from '~/shared/ui';

import ChatIcon from './assets/chat.svg';
import MoreIcon from './assets/more.svg';
import ReportIcon from './assets/report.svg';
import cls from './page.module.scss';

export const ProfilePage = () => {
  return (
    <Page>
      <Container className={cls.head} size={ContainerSize.M}>
        <Avatar
          className={cls.avatar}
          username={'Bark111'}
          displayName={'А у нас в квартире газ'}
        />
        <Text className={cls.displayName} center={true} size={TextSize.XL}>
          А у нас в квартире газ
        </Text>
        <Text size={TextSize.M} Component="h1">
          @Bark111
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
      <Container size={ContainerSize.L}>
        <ThreadWaterfall />
      </Container>
    </Page>
  );
};
