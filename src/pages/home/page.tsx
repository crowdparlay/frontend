import {routes} from '~/shared/routes';
import {Container, ContainerSize, Link, Page, Text, TextSize} from '~/shared/ui';

import cls from './page.module.scss';

export const HomePage = () => {
  return (
    <Page className={cls.page}>
      <Container size={ContainerSize.S} className={cls.header}>
        <Text size={TextSize.L}>Hello, world!</Text>

        <Link
          to={routes.explore}
          style={{
            textDecoration: 'underline',
          }}
        >
          <Text size={TextSize.S}>How's it going?</Text>
        </Link>
      </Container>
    </Page>
  );
};
