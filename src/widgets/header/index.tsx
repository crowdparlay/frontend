import {RouteInstance} from 'atomic-router';
import {useUnit} from 'effector-react';

import {ModeToggle} from '~/widgets/mode-toggle';

import {User} from '~/shared/api/types';
import {routes} from '~/shared/routes';
import {$user} from '~/shared/session';
import {Input, Link, LinkVariant} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
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
        <Link className={cls.logo} variant={LinkVariant.CLEAR} to={routes.home}>
          <Logo />
        </Link>

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className={cls.search}
        />

        <div className={cls.linksContainer}>
          <Link variant={LinkVariant.NAVIGATION} to={routes.explore}>
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
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <NotificationIcon />
          </Button>
          <Link
            to={routes.profile as RouteInstance<any>}
            params={{
              username: user!.username,
            }}
          >
            <img src={Avatar} alt="avatar" className="rounded-full h-9" />
          </Link>
          <Button variant="ghost" size="icon">
            <ArrowIcon />
          </Button>
        </div>
      ) : (
        <div className={cls.authorization}>
          <Link to={routes.auth.signUp}>
            <Button>Sign up</Button>
          </Link>
          <Link to={routes.auth.signIn}>
            <Button variant="ghost">Sign in</Button>
          </Link>
        </div>
      )}
    </header>
  );
};
