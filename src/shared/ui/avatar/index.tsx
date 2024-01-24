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

  if (avatarUrl) {
    return (
      <img
        className={classNames(cls.avatar, mods, className)}
        src={avatarUrl}
        alt={username}
        {...otherProps}
      />
    );
  }

  return (
    <div
      style={{backgroundColor}}
      className={classNames(cls.avatar, mods, className)}
      {...otherProps}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        preserveAspectRatio="xMinYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        // @ts-ignore
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <text
          x="50%"
          y="54%"
          font-size="24"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="currentColor"
        >
          {displayName[0]?.toUpperCase() ?? 'D'}
        </text>
      </svg>
    </div>
  );
};
