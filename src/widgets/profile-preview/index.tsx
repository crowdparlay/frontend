import classNames from 'classnames';
import {HTMLAttributes} from 'react';
import stc from 'string-to-color';

import {Text, TextSize} from '~/shared/ui';

import VerifiedIcon from './assets/verified.svg';
import cls from './index.module.scss';
import {getLuminance} from './lib';

export interface ProfilePreviewProps extends HTMLAttributes<HTMLDivElement> {
  displayName?: string;
  username?: string;
  avatarUrl?: string;
  date?: Date;
  showDate?: boolean;
  verified?: boolean;
}

export const ProfilePreview = (props: ProfilePreviewProps) => {
  const {verified, displayName, username, avatarUrl, showDate, date, className, ...otherProps} =
    props;

  const backgroundColor = stc(displayName ?? 'Display name');
  const luminance = getLuminance(backgroundColor);
  const theme = luminance > 0.5 ? 'dark' : 'light';

  const mods = {
    [cls[theme]]: true,
  };

  return (
    <div className={classNames(cls.preview, className)} {...otherProps}>
      {avatarUrl ? (
        <img className={cls.avatar} src={avatarUrl} alt={username} />
      ) : (
        <div style={{backgroundColor}} className={classNames(cls.avatar, mods)}>
          {displayName ? displayName[0].toUpperCase() : 'D'}
        </div>
      )}

      <div className={cls.list}>
        <div className={cls.nameContainer}>
          <Text className={classNames(cls.name, cls.maxWidth)}>
            {displayName || 'Display name'}
          </Text>

          {verified && <VerifiedIcon />}
        </div>
        {showDate && date ? (
          <Text size={TextSize.S}>{date.toLocaleTimeString()}</Text>
        ) : (
          <Text className={cls.maxWidth} size={TextSize.S}>
            @{username || 'username'}
          </Text>
        )}
      </div>
    </div>
  );
};
