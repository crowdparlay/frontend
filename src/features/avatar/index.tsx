import classNames from 'classnames';
import {HTMLAttributes} from 'react';
import stc from 'string-to-color';

import cls from './index.module.scss';
import {getLuminance} from './lib';

export enum AvatarVariant {
  DEFAULT = 'default',
  INLINE = 'inline',
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  username: string;
  displayName: string;
  avatarUrl?: string;
  variant?: AvatarVariant;
}

export const Avatar = (props: AvatarProps) => {
  const {
    username,
    displayName,
    avatarUrl,
    variant = AvatarVariant.DEFAULT,
    className,
    ...otherProps
  } = props;

  const backgroundColor = stc(displayName + ' ' + username);
  const luminance = getLuminance(backgroundColor);
  const theme = luminance > 0.5 ? 'dark' : 'light';

  const mods = {
    [cls[theme]]: true,
    [cls[variant]]: true,
  };

  return avatarUrl ? (
    <img
      className={classNames(cls.avatar, mods, className)}
      src={avatarUrl}
      alt={username}
      {...otherProps}
    />
  ) : (
    <div
      style={{backgroundColor}}
      className={classNames(cls.avatar, mods, className)}
      {...otherProps}
    >
      {displayName.length > 0 && displayName[0].toUpperCase()}
    </div>
  );
};
