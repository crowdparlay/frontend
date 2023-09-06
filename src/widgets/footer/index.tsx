import classNames from 'classnames';
import {HTMLAttributes} from 'react';

import {Container, Link, LinkVariant, Text, TextSize} from '~/shared/ui';

import Logo from './assets/logo.svg';
import cls from './index.module.scss';

export type FooterProps = HTMLAttributes<HTMLDivElement>;

export const Footer = (props: FooterProps) => {
  const {className, ...otherProps} = props;

  return (
    <footer className={classNames(cls.footer, className)} {...otherProps}>
      <Container className={cls.row}>
        <div className={cls.column}>
          <Text size={TextSize.S} accent Component="h4">
            Legal
          </Text>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Terms of use
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Platform policies
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Privacy
          </Link>
        </div>
        <div className={cls.column}>
          <Text size={TextSize.S} accent Component="h4">
            Contacts
          </Text>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Telegram
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Twitter
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Email
          </Link>
        </div>
        <div className={cls.column}>
          <Text size={TextSize.S} accent Component="h4">
            Developers
          </Text>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Source code
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            API reference
          </Link>
          <Link variant={LinkVariant.PRIMARY} to={''}>
            Status
          </Link>
        </div>
        <div className={cls.column}>
          <Logo />
          <Text size={TextSize.S}>Copyright © 2023 Crowd Parlay</Text>
          <Text size={TextSize.S}>All rights reserved</Text>
        </div>
      </Container>
    </footer>
  );
};
