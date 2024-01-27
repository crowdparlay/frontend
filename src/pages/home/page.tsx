import {Container, ContainerSize, Page, Text, TextSize} from '~/shared/ui';

import cls from './page.module.scss';

export const HomePage = () => {
  return (
    <Page className={cls.page}>
      <Container size={ContainerSize.S} className={cls.header}>
        <Text size={TextSize.L}>Hello, world!</Text>
        <Text size={TextSize.S}>How's it going?</Text>
      </Container>
      <Container size={ContainerSize.M} className={cls.card}>
        <div className={cls.row}>
          <Text size={TextSize.XL}>🎉 Release notes</Text>
          <Text size={TextSize.S} className={cls.label}>
            yesterday
          </Text>
        </div>
        <hr />
        <Text>
          Главное у человека не деньги, а натурально — хворма, вчёность. Потому ежели человек
          вчёный, так ему уже свет переворачивается вверх ногами, пардон, вверх дыбом. И тогда когда
          тому, одному, которому невчёному, будеть белое, так уже ему, вчёному которому, будет уже
          как... ну...
          <br />
          — Зелёное!?
          <br />— Нет... Рябое!
        </Text>
      </Container>
    </Page>
  );
};
