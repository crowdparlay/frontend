import classNames from 'classnames';
import {HTMLAttributes, memo} from 'react';

import {Avatar, Text, TextSize} from '~/shared/ui';

import VerifiedIcon from './assets/verified.svg';
import cls from './index.module.scss';

export interface ProfilePreviewProps extends HTMLAttributes<HTMLDivElement> {
  username: string;
  displayName: string;
  avatarUrl?: string;
  date?: Date;
  verified?: boolean;
}

export const ProfilePreview = memo((props: ProfilePreviewProps) => {
  const {verified, username, displayName, avatarUrl, date, className, ...otherProps} = props;

  return (
    <div className={classNames(cls.preview, className)} {...otherProps}>
      <Avatar username={username} displayName={displayName} avatarUrl={avatarUrl} />
      <div className={cls.list}>
        <div className={cls.nameContainer}>
          <Text size={TextSize.S} className={classNames(cls.name, cls.wrapText)}>
            {displayName || 'Display name'}
          </Text>

          {verified && <VerifiedIcon />}
        </div>

        <div className={cls.subContainer}>
          <Text className={cls.wrapText} size={TextSize.S}>
            @{username || 'username'}
          </Text>

          {date && (
            <Text className={cls.time} size={TextSize.S}>
              {date.toLocaleTimeString()}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
});
