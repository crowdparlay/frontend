import {HTMLAttributes, memo, useState} from 'react';
import {cn} from '~/lib/utils';

import {UserEntity} from '~/entities/types';

import {Skeleton} from '~/shared/ui/skeleton';

import cls from './index.module.scss';

export const AvatarSkeleton = (props: HTMLAttributes<HTMLDivElement>) => {
  const {className, ...otherProps} = props;
  return <Skeleton className={cn('w-10 h-10 rounded-full', className)} {...otherProps} />;
};

export enum AvatarVariant {
  DEFAULT = 'default',
  INLINE = 'inline',
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  user?: UserEntity | null;
  variant?: AvatarVariant;
}

export const Avatar = memo((props: AvatarProps) => {
  const {user, variant = AvatarVariant.DEFAULT, className, ...otherProps} = props;

  const [isImageValid, setIsImageValid] = useState(true);

  const mods = {
    [cls[variant]]: true,
  };

  if (!user)
    return (
      <AvatarSkeleton className={cn(variant === AvatarVariant.INLINE && 'w-6 h-6', className)} />
    );

  if (user.avatarUrl && isImageValid) {
    return (
      <img
        className={cn(
          'size-10 rounded-full',
          cls.avatar,
          mods,
          className,
          variant === 'default' && 'border',
        )}
        src={user.avatarUrl}
        alt=""
        {...otherProps}
        onError={() => setIsImageValid(false)}
      />
    );
  }

  return (
    <div
      style={{backgroundColor: user.getPersonalStyle().color}}
      className={cn('size-10 rounded-full text-white', cls.avatar, mods, className)}
      {...otherProps}
    >
      <svg
        className="grayscale"
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        preserveAspectRatio="xMinYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <text
          x="50%"
          y="54%"
          fontSize="24"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="currentColor"
        >
          {Array.from(user.displayName)[0]?.toUpperCase() ?? 'D'}
        </text>
      </svg>
    </div>
  );
});
