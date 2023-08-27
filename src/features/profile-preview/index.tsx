import classNames from 'classnames';
import {HTMLAttributes} from 'react';
import stc from 'string-to-color';

import {Text, TextSize} from '~/shared/ui';

import VerifiedIcon from './assets/verified.svg';
import cls from './index.module.scss';
import {getLuminance} from '../avatar/lib';
import {Avatar} from "~/features/avatar";

export interface ProfilePreviewProps extends HTMLAttributes<HTMLDivElement> {
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  date?: Date;
  showDate?: boolean;
  verified?: boolean;
}

export const ProfilePreview = (props: ProfilePreviewProps) => {
  const {verified, username, displayName, avatarUrl, showDate, date, className, ...otherProps} =
    props;

  return (
    <div className={classNames(cls.preview, className)} {...otherProps}>
      <Avatar username={username} displayName={displayName} avatarUrl={avatarUrl}/>
      <div className={cls.list}>
        <div className={cls.nameContainer}>
          <Text className={cls.name}>{displayName || 'Display name'}</Text>

          {verified && <VerifiedIcon />}
        </div>
        {showDate && date ? (
          <Text size={TextSize.S}>{date.toLocaleTimeString()}</Text>
        ) : (
          <Text size={TextSize.S}>@{username || 'username'}</Text>
        )}
      </div>
    </div>
  );
};
