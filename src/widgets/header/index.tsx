import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react';
import {Bell, ChevronDown} from 'lucide-react';
import {cn} from '~/lib/utils';

import {ModeToggle} from '~/widgets/mode-toggle';

import {UserEntity} from '~/entities/types';

import {routes} from '~/shared/routes';
import {$user} from '~/shared/session';
import {Avatar} from '~/shared/ui';
import {Button} from '~/shared/ui/button';

import LogoMini from './assets/logo-mini.svg';
import Logo from './assets/logo.svg';

export interface HeaderProps {
  forceUser?: UserEntity;
}

export const Header = (props: HeaderProps) => {
  const {forceUser} = props;
  const user = useUnit($user);

  return (
    <header className="fixed z-20 w-full h-16 flex flex-nowrap justify-between bg-background border-b">
      <div className="flex grow-1 shrink-0">
        <Link to={routes.home} className="flex items-center invert dark:filter-none">
          <Logo className="hidden md:block ps-6 me-4" />
          <LogoMini className="md:hidden h-full p-3 pe-4" />
        </Link>
      </div>
      <div
        className={cn(
          'flex h-full font-medium text-sm',
          'w-full sm:max-w-xl md:max-w-3xl',
          '[&>*]:flex [&>*]:items-center [&>*]:h-full [&>*]:px-4 [&>*]:hover:opacity-80',
          'xl:[&>*]:first:ps-0',
        )}
      >
        <Link to={routes.explore}>Discussions</Link>
        <Link to={routes.profiles}>Profiles</Link>
      </div>
      <div className="flex grow-1 shrink-0 justify-end overflow-hidden items-center gap-4 pe-3">
        <ModeToggle />
        {(forceUser ?? user) ? (
          <>
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <Link
              className="shrink-0"
              to={routes.profile}
              params={{
                username: user!.username,
              }}
            >
              <Avatar user={user} className="rounded-full size-8" />
            </Link>
            <Button variant="ghost" size="icon">
              <ChevronDown />
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
