import classNames from 'classnames';
import {HTMLAttributes, memo, ReactNode, useCallback, useState} from 'react';

import LikeFillIcon from '~/widgets/post/assets/likeFill.svg';
import LikeOutlineIcon from '~/widgets/post/assets/likeOutline.svg';
import ReplyIcon from '~/widgets/post/assets/reply.svg';
import ReportIcon from '~/widgets/post/assets/report.svg';

import {InlineAvatars} from '~/features/inline-avatars';
import {ProfilePreview} from '~/features/profile-preview';

import '~/shared/api';
import {User} from '~/shared/api/types';
import {Button, ButtonVariant, Text, TextSize} from '~/shared/ui';

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
  onReplyClicked?: (id: string) => void;
  onReportClicked?: (id: string) => void;
  onLikeClicked?: (id: string) => void;
  onDisLikeClicked?: (id: string) => void;
}

export const Post = memo((props: PostProps) => {
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
    onReplyClicked,
    onReportClicked,
    onLikeClicked,
    onDisLikeClicked,
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
              <Button
                onClick={() => onReplyClicked && onReplyClicked(id)}
                className={classNames(cls.hover)}
                variant={ButtonVariant.CLEAR}
                round={true}
              >
                <ReplyIcon />
                Reply
              </Button>
            )}
            {canReport && (
              <Button
                onClick={() => onReportClicked && onReportClicked(id)}
                className={classNames(cls.hover)}
                variant={ButtonVariant.CLEAR}
                round={true}
              >
                <ReportIcon />
                Report
              </Button>
            )}

            <div style={{width: '100%'}} />

            <Button
              onClick={() => onLikeClicked && onLikeClicked(id)}
              className={classNames(cls.react, react === 'like' && cls.active)}
              variant={ButtonVariant.CLEAR}
              round={true}
            >
              {react === 'like' ? <LikeFillIcon /> : <LikeOutlineIcon />}
              19
            </Button>
            <Button
              onClick={() => onDisLikeClicked && onDisLikeClicked(id)}
              className={classNames(cls.react, react === 'dislike' && cls.active)}
              variant={ButtonVariant.CLEAR}
              round={true}
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
});
