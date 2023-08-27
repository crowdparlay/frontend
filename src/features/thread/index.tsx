import classNames from 'classnames';
import {HTMLAttributes, useState} from 'react';
import {InlineAvatars} from 'src/features/inline-avatars';

import {Button, ButtonVariant, Text, TextSize} from '~/shared/ui';

import {ProfilePreview} from '../profile-preview';
import cls from './index.module.scss';

export interface ThreadProps extends HTMLAttributes<HTMLDivElement>, Post {
  replyCount?: number;
  repliers?: Author[];
  onExpanded?: () => void;
}

interface Author {
  username: string;
  displayName: string;
  avatarUrl?: string;
  verified: true;
}

interface Post {
  content: string;
  author: Author;
}

export const Thread = (props: ThreadProps) => {
  const {author, replyCount, repliers, onExpanded, content, className, ...otherProps} = props;

  const [isThreadExpanded, setIsThreadExpanded] = useState(false);
  const [replies, setReplies] = useState<Post[]>([]);

  const expandReplies = () => {
    // TODO: fetch replies

    const newReplies: Post[] = [
      {
        content: 'Первый ответ реплай',
        author: {
          username: 'crowdparlay',
          displayName: 'Crowd Parlay',
          avatarUrl: 'https://i.imgur.com/xGN9UzF.png',
          verified: true,
        },
      },
      {
        content: 'второй понский',
        author: {
          username: 'crowdparlay',
          displayName: 'Crowd Parlay',
          avatarUrl: null,
          verified: true,
        },
      },
    ];
    setReplies([...replies, ...newReplies]);

    setIsThreadExpanded(true);
    onExpanded && onExpanded();
  };

  return (
    <div className={classNames(cls.thread, className)} {...otherProps}>
      <div className={cls.post}>
        <div className={cls.content}>
          <Text size={TextSize.M}>{content}</Text>
          <ProfilePreview {...author} />
        </div>

        {!isThreadExpanded && replyCount > 0 && (
          <div className={cls.epilogue} onClick={expandReplies}>
            <InlineAvatars users={repliers} />
            <Text size={TextSize.S}>
              {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
            </Text>
          </div>
        )}
      </div>

      {isThreadExpanded &&
        replies.map((replyThread) => (
          <div>
            <div className={cls.connector} />
            <Thread {...replyThread} />
          </div>
        ))}

      {isThreadExpanded && (
        <div>
          <div className={cls.connector} />
          <Button className={cls.showMore} variant={ButtonVariant.INLINE} text={'show more'} />
        </div>
      )}
    </div>
  );
};
