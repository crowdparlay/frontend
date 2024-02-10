import classNames from 'classnames';
import {useUnit} from 'effector-react/compat';
import {HTMLAttributes, memo, ReactNode, useCallback, useState} from 'react';

import LikeFillIcon from '~/widgets/post/assets/likeFill.svg';
import LikeOutlineIcon from '~/widgets/post/assets/likeOutline.svg';
import ReplyIcon from '~/widgets/post/assets/reply.svg';
import ReportIcon from '~/widgets/post/assets/report.svg';
import {getTimeSince} from '~/widgets/post/lib';

import {InlineAvatars} from '~/features/inline-avatars';
import {ProfilePreview} from '~/features/profile-preview';
import {ReplyForm, ReplyFormProps} from '~/features/reply-form';

import '~/shared/api';
import {User} from '~/shared/api/types';
import {$user} from '~/shared/session';
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
  onReplyClick?: (id: string) => void;
  onReportClick?: (id: string) => void;
  onLikeClick?: (id: string) => void;
  onDisLikeClick?: (id: string) => void;
  onShownClick?: (id: string) => void;
  onReplyFormSubmit?: ReplyFormProps['onSubmit'];
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
    onReplyClick,
    onReportClick,
    onLikeClick,
    onDisLikeClick,
    onShownClick,
    onReplyFormSubmit,
    ...otherProps
  } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const isReply = Boolean(replyId);

  const onButtonClick = useCallback(
    (collapsed: boolean) => {
      setCollapsed(collapsed);
      if (!collapsed && onShownClick) {
        onShownClick(id);
      }
    },
    [onShownClick, id],
  );

  const onButtonReplyClick = useCallback(() => {
    if (collapsed) {
      onButtonClick(!collapsed);
    }

    setShowReplyForm(true);
  }, [collapsed, onButtonClick]);

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
          style={{paddingLeft: isReply ? 0 : 20}}
        >
          <ProfilePreview
            username={author.username}
            displayName={author.displayName}
            avatarUrl={author.avatarUrl}
            hint={getTimeSince(date)}
          />

          <Text size={TextSize.M}>{text}</Text>

          <div className={cls.actions}>
            <Button
              onClick={() => onButtonClick(!collapsed)}
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

            {canReply && !showReplyForm && (
              <Button
                onClick={onButtonReplyClick}
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
                onClick={() => onReportClick && onReportClick(id)}
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
              onClick={() => onLikeClick && onLikeClick(id)}
              className={classNames(cls.hover, cls.react, react === 'like' && cls.active)}
              variant={ButtonVariant.CLEAR}
              round={true}
            >
              {react === 'like' ? <LikeFillIcon /> : <LikeOutlineIcon />}
              19
            </Button>
            <Button
              onClick={() => onDisLikeClick && onDisLikeClick(id)}
              className={classNames(cls.hover, cls.react, react === 'dislike' && cls.active)}
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

        <div className={cls.line} />

        {showReplyForm && (
          <ReplyFormWithUser
            postId={id}
            onSubmit={(payload) => {
              setShowReplyForm(false);
              if (onReplyFormSubmit) {
                onReplyFormSubmit(payload);
              }
            }}
            onCancel={() => setShowReplyForm(false)}
          />
        )}
        {!collapsed && children}
      </div>
    </div>
  );
});

interface ReplyFormWithUserProps extends Pick<ReplyFormProps, 'onSubmit'> {
  postId: string;
  onCancel: () => void;
}

const ReplyFormWithUser = (props: ReplyFormWithUserProps) => {
  const {postId, onSubmit, onCancel} = props;

  const user = useUnit($user);
  if (!user) {
    return null;
  }

  return (
    <div className={classNames(cls.replyContainer)}>
      <div className={cls.circleContainer}>
        <div className={cls.circle} />
      </div>

      <div className={cls.post} style={{width: '100%', paddingLeft: 0}}>
        <ProfilePreview
          username={user.username!}
          displayName={user.display_name!}
          avatarUrl={user.avatar_url!}
        />
        <ReplyForm postId={postId} maxLength={500} onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    </div>
  );
};
