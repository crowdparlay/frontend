import classNames from 'classnames';
import {HTMLAttributes, useState} from 'react';

import {Text, TextSize} from '~/shared/ui';

import {InlineAvatars} from '../inline-avatars';
import {ProfilePreview, ProfilePreviewProps} from '../profile-preview';
import cls from './index.module.scss';

export interface ThreadProps extends HTMLAttributes<HTMLDivElement> {
  author?: ProfilePreviewProps;
  replyAvatarUrls: string[];
}

export const Thread = (props: ThreadProps) => {
  const {author, replyAvatarUrls, content, className, ...otherProps} = props;

  const [isThreadExpanded, setIsThreadExpanded] = useState(false);
  const [replyThreads, setReplyThreads] = useState<ThreadProps[]>([]);

  const expandReplies = () => {
    // TODO: fetch replies
    setReplyThreads([]);

    setIsThreadExpanded(true);
  };

  const repliesCount = replyAvatarUrls.length;

  return (
    <div className={classNames(cls.thread, className)} {...otherProps}>
      <div className={cls.post}>
        <div className={cls.content}>
          <Text size={TextSize.M}>{content}</Text>
          <ProfilePreview {...author} />
        </div>

        {!isThreadExpanded && (
          <div className={cls.epilogue} onClick={expandReplies}>
            <InlineAvatars avatarUrls={replyAvatarUrls} />
            <Text size={TextSize.S}>
              {repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}
            </Text>
          </div>
        )}
      </div>

      {isThreadExpanded &&
        replyThreads.map((replyThread) => (
          <div>
            <div className={cls.connector} />
            <Thread {...replyThread} />
          </div>
        ))}
    </div>
  );
};
