import {RouteInstance} from 'atomic-router';
import {useUnit} from 'effector-react';

import {ModeToggle} from '~/widgets/mode-toggle';

import {UserEntity} from '~/shared/api/types';
import {routes} from '~/shared/routes';
import {$user} from '~/shared/session';
import {Avatar, Input, Link, LinkVariant} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import ArrowIcon from '~/shared/ui/icon/assets/arrow.svg';

import Logo from './assets/logo.svg';
import NotificationIcon from './assets/notification.svg';
import cls from './index.module.scss';
import {$search, searchChange} from './model';

export interface HeaderProps {
  forceUser?: UserEntity;
}

export const Header = (props: HeaderProps) => {
  const {forceUser} = props;

  const [user, search, onSearchChange] = useUnit([$user, $search, searchChange]);

  return (
    <header className="fixed z-20 w-full h-16 flex flex-nowrap justify-between bg-background border-b overflow-hidden">
      <div className="flex items-center">
        <Link className={cls.logo} variant={LinkVariant.CLEAR} to={routes.home}>
          <Logo className="invert dark:filter-none" />
        </Link>

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className={cls.search}
        />

        <div className="space-x-8 mx-8">
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

      <div className="flex items-center gap-4 pe-3">
        <ModeToggle />
        {(forceUser ?? user) ? (
          <>
            <Button variant="ghost" size="icon">
              <NotificationIcon />
            </Button>
            <Link
              to={routes.profile as RouteInstance<any>}
              params={{
                username: user!.username,
              }}
            >
              <Avatar user={user} className="rounded-full size-8" />
            </Link>
            <Button variant="ghost" size="icon">
              <ArrowIcon />
            </Button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to={routes.auth.signUp}>
              <Button className="rounded-lg bg-primary">Sign up</Button>
            </Link>
            <Link to={routes.auth.signIn}>
              <Button className="rounded-lg text-foreground" variant="ghost">
                Sign in
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
