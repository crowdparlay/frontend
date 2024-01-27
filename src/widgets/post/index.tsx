import classNames from 'classnames';
import {HTMLAttributes, memo, ReactNode, useCallback, useState} from 'react';

import {InlineAvatars} from '~/features/inline-avatars';
import {ProfilePreview} from '~/features/profile-preview';

import '~/shared/api';
import {User} from '~/shared/api/types';
import {Button, ButtonVariant, Text, TextSize} from '~/shared/ui';

import LikeFillIcon from './icons/likeFill.svg';
import LikeOutlineIcon from './icons/likeOutline.svg';
import ReplyIcon from './icons/reply.svg';
import ReportIcon from './icons/report.svg';
import cls from './index.module.scss';

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  replyId?: string;
  author: User;
  date: Date;
  text: ReactNode;
  commentators: User[];
  commentsCount: number;
  canReply: boolean;
  canReport: boolean;
  react?: 'like' | 'dislike';
}

export const Post = (props: PostProps) => {
  const {
    id,
    replyId,
    author,
    date,
    text,
    commentators,
    commentsCount,
    canReply,
    canReport,
    react,
    className,
    children,
    ...otherProps
  } = props;

  const [collapsed, setCollapsed] = useState(true);

  const isReply = Boolean(replyId);

  const onButtonClick = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div className={classNames(isReply && cls.replyContainer)}>
      {isReply && (
        <div className={cls.circleContainer}>
          <div className={cls.circle} />
        </div>
      )}

      <div style={{width: '100%'}}>
        <div
          data-id={id}
          className={classNames(cls.post, className)}
          {...otherProps}
          style={{paddingLeft: isReply ? 0 : '20px'}}
        >
          <ProfilePreview
            username={author.username}
            displayName={author.displayName}
            avatarUrl={author.avatarUrl}
            date={date}
          />

          <Text size={TextSize.M}>{text}</Text>

          <div className={cls.actions}>
            <Button
              onClick={onButtonClick}
              className={classNames(
                cls.repliesButton,
                !collapsed && cls.collapse,
                commentsCount === 0 && cls.hidden,
              )}
              variant={ButtonVariant.SECONDARY}
            >
              {collapsed ? (
                <>
                  <InlineAvatars className={cls.avatars} users={commentators} />
                  <Text size={TextSize.S}>
                    {commentsCount} {commentsCount > 1 ? 'replies' : 'reply'}
                  </Text>
                </>
              ) : (
                <Text size={TextSize.S}>Collapse {commentsCount > 1 ? 'replies' : 'reply'}</Text>
              )}
            </Button>

            {canReply && (
              <Button className={cls.button} variant={ButtonVariant.SECONDARY}>
                <ReplyIcon />
                Reply
              </Button>
            )}
            {canReport && (
              <Button className={cls.button} variant={ButtonVariant.SECONDARY}>
                <ReportIcon />
                Report
              </Button>
            )}

            <div style={{width: '100%'}} />

            <Button
              className={classNames(cls.button, cls.react, react === 'like' && cls.active)}
              variant={ButtonVariant.SECONDARY}
            >
              {react === 'like' ? <LikeFillIcon /> : <LikeOutlineIcon />}
              19
            </Button>
            <Button
              className={classNames(cls.button, cls.react, react === 'dislike' && cls.active)}
              variant={ButtonVariant.SECONDARY}
            >
              {react === 'dislike' ? (
                <LikeFillIcon className={cls.dislike} />
              ) : (
                <LikeOutlineIcon className={cls.dislike} />
              )}
              5
            </Button>
          </div>
        </div>

        {Boolean(children) && <div className={cls.line} />}

        {!collapsed && children}
      </div>
    </div>
  );
};
