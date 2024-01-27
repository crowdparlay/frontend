import classNames from 'classnames';
import {HTMLAttributes} from 'react';

import {Avatar, AvatarVariant} from '~/shared/ui';

import cls from './index.module.scss';

export interface InlineAvatarsProps extends HTMLAttributes<HTMLDivElement> {
  users: User[];
}

export interface User {
  username: string;
  displayName: string;
  avatarUrl?: string;
}

export const InlineAvatars = (props: InlineAvatarsProps) => {
  const {users, className, ...otherProps} = props;

  return (
    <div className={classNames(cls.avatars, className)} {...otherProps}>
      {users.map((user, index) => (
        <Avatar key={index} className={cls.avatar} variant={AvatarVariant.INLINE} {...user} />
      ))}
    </div>
  );
};
