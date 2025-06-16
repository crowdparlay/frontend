import {useUnit} from 'effector-react';

import {Discussion, DiscussionSkeleton} from '~/widgets/discussion';

import {
  Avatar,
  ButtonShape,
  ButtonVariant,
  Container,
  ContainerSize,
  CustomButton,
  Page,
  Text,
  TextSize,
} from '~/shared/ui';

import * as model from './model';
import ChatIcon from './assets/chat.svg';
import FollowIcon from './assets/follow.svg';
import MoreIcon from './assets/more.svg';
import ReportIcon from './assets/report.svg';
import cls from './page.module.scss';

export const ProfilePage = () => {
  const user = useUnit(model.$user);

  const discussions = useUnit(model.$discussions);

  if (!user) return null;

  return (
    <Page>
      <Container size={ContainerSize.M} className={cls.head}>
        <Avatar user={user} className={cls.avatar} />
        <div className={cls.column}>
          <Text className={cls.displayName} size={TextSize.XL}>
            {user.displayName}
          </Text>
          <Text size={TextSize.M}>@{user.username!}</Text>
        </div>
        <Text className={cls.bio} center={true} size={TextSize.M}>
          Fulltext search in Neo4j is supported by means of fulltext schema indexes. Fulltext schema
          indexes are created, dropped, and updated transactionally, and are automatically
          replicated throughout a cluster.
        </Text>
        <div className={cls.actions}>
          <CustomButton variant={ButtonVariant.PRIMARY}>
            <FollowIcon />
            Follow
          </CustomButton>
          <CustomButton variant={ButtonVariant.SECONDARY} shape={ButtonShape.EQUILATERAL}>
            <ChatIcon />
          </CustomButton>
          <CustomButton variant={ButtonVariant.SECONDARY} shape={ButtonShape.EQUILATERAL}>
            <ReportIcon />
          </CustomButton>
          <CustomButton variant={ButtonVariant.SECONDARY} shape={ButtonShape.EQUILATERAL}>
            <MoreIcon />
          </CustomButton>
        </div>
      </Container>

      <div className="flex-1 w-full mt-6 sm:max-w-xl md:max-w-3xl">
        <div className="sm:space-y-6 sm:mb-6">
          {discussions === 'loading' &&
            [...Array(5).keys()].map((i) => <DiscussionSkeleton key={i} />)}
          {discussions !== 'loading' &&
            discussions.map((discussion) => (
              <Discussion
                key={discussion.id}
                className="rounded-none sm:rounded-xl border-x-0 border-b-0 border-t sm:border"
                discussion={discussion}
                preview={true}
              />
            ))}
        </div>
      </div>
    </Page>
  );
};
