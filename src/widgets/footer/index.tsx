import classNames from 'classnames';
import {HTMLAttributes} from 'react';

import {Container, ContainerSize, Link, LinkVariant, Text, TextSize} from '~/shared/ui';

import Logo from './assets/logo.svg';
import cls from './index.module.scss';

export type FooterProps = HTMLAttributes<HTMLDivElement>;

export const Footer = (props: FooterProps) => {
  const {className, ...otherProps} = props;

  return (
    <footer className={classNames(cls.footer, className)} {...otherProps}>
      <Container size={ContainerSize.L} style={{padding: 0}} className={cls.row}>
        <Container className={cls.column}>
          <Text size={TextSize.S} accent={true} Component="h4">
            Legal
          </Text>
          <Link variant={LinkVariant.PRIMARY} to={'/terms-of-use'}>
            Terms of use
          </Link>
          <Link
            variant={LinkVariant.PRIMARY}
            to={'https://github.com/crowdparlay/foundation/wiki/Концепция'}
            target={'_blank'}
          >
            Platform policies
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={'#'}>
            Privacy
          </Link>
        </Container>
        <Container className={cls.column}>
          <Text size={TextSize.S} accent={true} Component="h4">
            Contacts
          </Text>
          <Link variant={LinkVariant.PRIMARY} to={'https://t.me/crowdparlay'} target={'_blank'}>
            Telegram
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={'#'}>
            Twitter
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={'#'}>
            Email
          </Link>
        </Container>
        <Container className={cls.column}>
          <Text size={TextSize.S} accent={true} Component="h4">
            Developers
          </Text>
          <Link
            variant={LinkVariant.PRIMARY}
            to={'https://github.com/crowdparlay'}
            target={'_blank'}
          >
            Source code
          </Link>
          <Link
            variant={LinkVariant.PRIMARY}
            to={'https://bump.sh/undrcrxwn/doc/crowdparlay'}
            target={'_blank'}
          >
            API reference
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={'/forbidden'}>
            Status
          </Link>
        </Container>
        <Container className={cls.column}>
          <Logo />
          <Text size={TextSize.S}>Copyright © {new Date().getFullYear()} Crowd Parlay</Text>
          <Text size={TextSize.S}>All rights reserved</Text>
        </Container>
      </Container>
    </footer>
  );
};
