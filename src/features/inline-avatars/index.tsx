import classNames from 'classnames';
import {HTMLAttributes} from 'react';

import {UserEntity} from '~/entities/types';

import {Avatar, AvatarVariant} from '~/shared/ui';

import cls from './index.module.scss';

export interface InlineAvatarsProps extends HTMLAttributes<HTMLDivElement> {
  users: UserEntity[];
}

export const InlineAvatars = (props: InlineAvatarsProps) => {
  const {users, className, ...otherProps} = props;

  return (
    <div className={classNames(cls.avatars, className)} {...otherProps}>
      {users.map((user, index) => (
        <Avatar key={index} className={cls.avatar} variant={AvatarVariant.INLINE} user={user} />
      ))}
    </div>
  );
};
