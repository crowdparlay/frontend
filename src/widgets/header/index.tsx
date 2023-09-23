import {useUnit} from 'effector-react';

import {User} from '~/shared/api';
import {routes} from '~/shared/routes';
import {$user} from '~/shared/session';
import {Button, Input, Link, LinkVariant} from '~/shared/ui';
import ArrowIcon from '~/shared/ui/icon/assets/arrow.svg';

import Avatar from './assets/avatar.png';
import Logo from './assets/logo.svg';
import NotificationIcon from './assets/notification.svg';
import cls from './index.module.scss';
import {$search, searchChange} from './model';

export interface HeaderProps {
  forceUser?: User;
}

export const Header = (props: HeaderProps) => {
  const {forceUser} = props;

  const [user, search, onSearchChange] = useUnit([$user, $search, searchChange]);

  return (
    <header className={cls.header}>
      <div className={cls.row}>
        <Link variant={LinkVariant.CLEAR} style={{padding: 0}} to={routes.home}>
          <Logo />
        </Link>

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{width: 300, marginLeft: 20}}
          placeholder="Search"
        />

        <div className={cls.linksContainer} style={{marginLeft: 40}}>
          <Link variant={LinkVariant.NAVIGATION} forceActive={true} to={routes.explore}>
            Explore
          </Link>
          <Link variant={LinkVariant.NAVIGATION} badge={2} to={routes.bets}>
            My bets
          </Link>
          <Link variant={LinkVariant.NAVIGATION} to={routes.events}>
            My events
          </Link>
          <Link variant={LinkVariant.NAVIGATION} to={routes.bookmarks}>
            Bookmarks
          </Link>
        </div>
      </div>

      {forceUser ?? user ? (
        <div className={cls.row} style={{alignItems: 'normal'}}>
          <Button className={cls.button}>
            <NotificationIcon />
          </Button>
          <img src={Avatar} alt="avatar" />
          <Button className={cls.button}>
            <ArrowIcon />
          </Button>
        </div>
      ) : (
        <div className={cls.row}>
          <Link variant={LinkVariant.PRIMARY} to={routes.auth.signIn}>
            Sign in
          </Link>
          <Link style={{marginLeft: 14}} variant={LinkVariant.CLEAR} to={routes.auth.signUp}>
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
};
