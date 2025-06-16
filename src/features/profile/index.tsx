import {Link} from 'atomic-router-react';
import {Ban, HeartHandshake, Mic, Rocket} from 'lucide-react';
import {HTMLAttributes, memo} from 'react';
import {cn} from '~/lib/utils';

import {UserEntity} from '~/entities/types';

import {Avatar, AvatarSkeleton} from '~/shared/ui';
import {Skeleton} from '~/shared/ui/skeleton';

export const ProfileSkeleton = (props: HTMLAttributes<HTMLDivElement>) => {
  const {className, ...otherProps} = props;
  return (
    <div className={cn('flex gap-3 items-center', className)} {...otherProps}>
      <AvatarSkeleton />
      <div className="space-y-3">
        <Skeleton className="w-24 h-2" />
        <Skeleton className="w-10 h-2" />
      </div>
    </div>
  );
};

export interface ProfileProps extends HTMLAttributes<HTMLAnchorElement> {
  user?: UserEntity;
  hideAvatar?: boolean;
  isTopicStarter?: boolean;
  isStuff?: boolean;
  isContributor?: boolean;
  isBanned?: boolean;
  variant: 'md' | 'xs';
}

export const Profile = memo((props: ProfileProps) => {
  const {
    user,
    isTopicStarter,
    isStuff,
    isContributor,
    isBanned,
    variant,
    className,
    ...otherProps
  } = props;

  if (!user) return <p>Unknown user</p>;

  return (
    <Link
      to={`/u/${user.username}`}
      className={cn(
        className,
        'flex items-center w-fit space-x-3',
        variant === 'xs' && 'space-x-2',
      )}
      {...otherProps}
    >
      <Avatar user={user} className={cn(variant === 'xs' && 'w-4 h-4')} />
      <div className={cn('flex gap-1.5', variant === 'md' && 'flex-col')}>
        <p className="text-sm font-medium leading-none">
          {user.displayName}
          {variant === 'xs' && (
            <span className="ml-2 font-normal text-sm opacity-50 leading-none">
              {user.username}
            </span>
          )}
          {isTopicStarter && (
            <span className="ml-2 text-muted-foreground font-normal">
              <Mic className="w-5 h-4 inline" /> Topic starter
            </span>
          )}
          {isStuff && (
            <span className="ml-2 text-muted-foreground font-normal">
              <Rocket className="w-5 h-4 inline" /> Stuff
            </span>
          )}
          {isContributor && (
            <span className="ml-2 text-muted-foreground font-normal">
              <HeartHandshake className="w-5 h-4 inline" /> Contributor
            </span>
          )}
          {isBanned && (
            <span className="ml-2 text-muted-foreground font-normal">
              <Ban className="w-5 h-4 inline" /> Banned
            </span>
          )}
        </p>
        {variant === 'md' && (
          <p className="text-sm text-muted-foreground leading-none">{user.username}</p>
        )}
      </div>
    </Link>
  );
});
