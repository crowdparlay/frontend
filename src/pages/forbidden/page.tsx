import {Container, ContainerSize, Page, Text, TextSize} from '~/shared/ui';

import Legs from './assets/legs.webp';
import cls from './page.module.scss';

export const ForbiddenPage = () => {
  return (
    <Page>
      <Container className={cls.container} size={ContainerSize.M}>
        <img className={cls.legs} src={Legs} alt={''} />
        <Text className={cls.caption} size={TextSize.XXL} serif={true} italic={true}>
          Forbidden.
        </Text>
      </Container>
    </Page>
  );
};
