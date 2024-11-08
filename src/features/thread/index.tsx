import classNames from 'classnames';
import {HTMLAttributes, useState} from 'react';

import {InlineAvatars, User} from '~/features/inline-avatars';
import {ProfilePreview} from '~/features/profile-preview';

import {ButtonVariant, CustomButton, Text, TextSize} from '~/shared/ui';

import cls from './index.module.scss';

interface Post {
  text: string;
  author: User;
}

export interface ThreadProps extends HTMLAttributes<HTMLDivElement>, Post {
  replyCount?: number;
  replyAuthors?: User[];
  onExpanded?: () => void;
}

export const Thread = (props: ThreadProps) => {
  const {author, replyCount, replyAuthors, onExpanded, text, className, ...otherProps} = props;

  const [isThreadExpanded, setIsThreadExpanded] = useState(false);
  const [replies, setReplies] = useState<Post[]>([]);

  const expandReplies = () => {
    // TODO: fetch replies

    const newReplies: Post[] = [
      {
        text: 'Первый ответ реплай',
        author: {
          username: 'crowdparlay',
          displayName: 'Crowd Parlay',
          avatarUrl: 'https://github.com/undrcrxwn/undrcrxwn/blob/main/harry.png?raw=true',
        },
      },
      {
        text: 'второй понский',
        author: {
          username: 'crowdparlay',
          displayName: 'Crowd Parlay',
          avatarUrl: undefined,
        },
      },
    ];
    setReplies([...replies, ...newReplies]);

    setIsThreadExpanded(true);
    onExpanded?.();
  };

  return (
    <div className={classNames(cls.thread, className)} {...otherProps}>
      <div className={cls.post}>
        <div className={cls.content}>
          <Text size={TextSize.M}>{text}</Text>
          <ProfilePreview {...author} />
        </div>

        {!isThreadExpanded && replyAuthors && replyCount && replyCount > 0 && (
          <div className={cls.epilogue} onClick={expandReplies}>
            <InlineAvatars users={replyAuthors} />
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
          <CustomButton className={cls.showMore} variant={ButtonVariant.INLINE}>
            show more
          </CustomButton>
        </div>
      )}
    </div>
  );
};
