import {Container, ContainerSize, Page, Text, TextSize} from '~/shared/ui';

import cls from './page.module.scss';

export const ProfilePage = () => {
  return (
    <Page>
      <Container size={ContainerSize.M}>
        <Text center={true} size={TextSize.XL} className={cls.title} Component="h1">
          Profile
        </Text>
      </Container>
    </Page>
  );
};
