import cls from './index.module.scss';
import classNames from 'classnames';
import {HTMLAttributes} from 'react';

export interface InlineAvatarsProps extends HTMLAttributes<HTMLDivElement> {
  avatarUrls: string[];
}

export const InlineAvatars = (props: InlineAvatarsProps) => {
  const {avatarUrls, className, ...otherProps} = props;

  return (
    <div className={classNames(cls.avatars, className)} {...otherProps}>
      {
        avatarUrls?.map(avatarUrl =>
          <span className={cls.avatar}>
            <img src={avatarUrl} alt=''/>
          </span>
        )
      }
    </div>
  );
};
