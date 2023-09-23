import {Container, ContainerSize, Page, Text, TextSize} from "~/shared/ui";
import Hand from './assets/hand.png'
import cls from './page.module.scss';

export const NotFoundPage = () => {
  return (
    <Page>
      <Container className={cls.container} size={ContainerSize.M}>
        <img className={cls.hand} src={Hand} alt={''}/>
        <Text size={TextSize.XXL} serif={true} italic={true}>
          Not found.
        </Text>
      </Container>
    </Page>
  );
};
