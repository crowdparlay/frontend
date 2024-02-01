import classNames from 'classnames';
import {HTMLAttributes, memo} from 'react';

import {Avatar, Link, Text, TextSize} from '~/shared/ui';

import VerifiedIcon from './assets/verified.svg';
import cls from './index.module.scss';

export interface ProfilePreviewProps extends HTMLAttributes<HTMLDivElement> {
  username: string;
  displayName: string;
  avatarUrl?: string;
  hint?: string;
  verified?: boolean;
}

export const ProfilePreview = memo((props: ProfilePreviewProps) => {
  const {verified, username, displayName, avatarUrl, hint, className, ...otherProps} = props;

  return (
    <div className={classNames(cls.preview, className)} {...otherProps}>
      <Link to={`/u/${username}`}>
        <Avatar username={username} displayName={displayName} avatarUrl={avatarUrl} />
      </Link>
      <div className={cls.list}>
        <div className={cls.nameContainer}>
          <Link to={`/u/${username}`}>
            <Text size={TextSize.S} className={classNames(cls.name, cls.wrapText)}>
              {displayName || 'Display name'}
            </Text>
          </Link>

          {verified && <VerifiedIcon />}
        </div>

        <div className={cls.subContainer}>
          <Link to={`/u/${username}`}>
            <Text className={cls.wrapText} size={TextSize.S}>
              @{username || 'username'}
            </Text>
          </Link>

          {hint && (
            <Text size={TextSize.S} style={{opacity: 0.5}}>
              {hint}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
});
