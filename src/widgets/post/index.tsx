import classNames from 'classnames';
import {createStore} from 'effector';
import {useUnit} from 'effector-react/compat';
import {sortBy} from 'lodash';
import {HTMLAttributes, memo, ReactNode, useCallback, useEffect, useState} from 'react';
import {toast} from 'sonner';
import {cn} from '~/lib/utils';

import ReplyIcon from '~/widgets/post/assets/reply.svg';
import {getTimeSince, isEmoji} from '~/widgets/post/lib';

import {InlineAvatars} from '~/features/inline-avatars';
import {ProfilePreview} from '~/features/profile-preview';
import {ReplyForm, ReplyFormProps} from '~/features/reply-form';

import '~/shared/api';
import {apiV1CommentsDiscussionIdReactionsPostFx, apiV1LookupReactionsGetFx} from '~/shared/api';
import {User} from '~/shared/api/types';
import {$user} from '~/shared/session';
import {ButtonVariant, CustomButton, Text, TextSize} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import {ContextMenu, ContextMenuContent, ContextMenuTrigger} from '~/shared/ui/context-menu';

import cls from './index.module.scss';

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  replyId?: string;
  author: User;
  date: Date;
  text: ReactNode;
  reactionCounters: Record<string, number>;
  viewerReactions: readonly string[];
  commentators: User[];
  commentsCount: number;
  canReply: boolean;
  onReplyClick?: (id: string) => void;
  onShownClick?: (id: string) => void;
  onReplyFormSubmit?: ReplyFormProps['onSubmit'];
}

export const $availableReactions = createStore<readonly string[]>([]);
$availableReactions.on(apiV1LookupReactionsGetFx.doneData, (_, payload) => payload.answer);

export const Post = memo((props: PostProps) => {
  const {
    id,
    replyId,
    author,
    date,
    text,
    reactionCounters,
    viewerReactions,
    commentators,
    commentsCount,
    canReply,
    className,
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReplyClick,
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

  const availableReactions = useUnit($availableReactions);
  const [committedReactions, setCommittedReactions] = useState<string[]>([]);
  const [draftReactions, setDraftReactions] = useState<string[]>([]);

  useEffect(() => {
    const reactions = viewerReactions as string[];
    setCommittedReactions(reactions);
    setDraftReactions(reactions);
  }, [viewerReactions]);

  const toggleReaction = async (reaction: string) => {
    const newReactions = draftReactions.includes(reaction)
      ? draftReactions.filter((draftReaction) => draftReaction !== reaction)
      : [...draftReactions, reaction].slice(-3);

    setDraftReactions(newReactions);

    apiV1CommentsDiscussionIdReactionsPostFx({
      path: {discussionId: id},
      body: newReactions,
    })
      .then(() => {
        setCommittedReactions(newReactions);
      })
      .catch(() => {
        setDraftReactions(committedReactions);
        toast('Oops...', {
          description: (
            <p>
              Failed to toggle <span className="font-semibold">{reaction}</span>
            </p>
          ),
          action: {
            label: 'Shit happens',
            onClick: () => {},
          },
        });
      });
  };

  const [draftReactionCounters, setDraftReactionCounters] =
    useState<Record<string, number>>(reactionCounters);

  useEffect(() => {
    const draftReactionCounters: Record<string, number> = {
      ...reactionCounters,
    };

    viewerReactions.forEach((reaction) => {
      draftReactionCounters[reaction]--;
    });

    draftReactions.forEach((reaction) => {
      draftReactionCounters[reaction] ??= 0;
      draftReactionCounters[reaction]++;
    });

    const sortedReactionCounters: Record<string, number> = Object.fromEntries(
      sortBy(
        Object.entries(draftReactionCounters).filter(([, counter]) => counter > 0),
        [
          ([, counter]) => -counter,
          ([reaction]) => !draftReactions.includes(reaction),
          ([reaction]) => reaction,
        ],
      ),
    );

    setDraftReactionCounters(sortedReactionCounters);
  }, [draftReactions, reactionCounters, viewerReactions]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
                <CustomButton
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
                    <Text size={TextSize.S}>
                      Collapse {commentsCount > 1 ? 'replies' : 'reply'}
                    </Text>
                  )}
                </CustomButton>

                {draftReactionCounters &&
                  Object.keys(draftReactionCounters).length > 0 &&
                  Object.entries(draftReactionCounters).map(([reaction, counter]) => (
                    <Button
                      key={reaction}
                      variant={draftReactions.includes(reaction) ? 'default' : 'outline'}
                      className={cn('rounded-full pr-4', isEmoji(reaction) && 'pl-2')}
                      onClick={() => toggleReaction(reaction)}
                    >
                      <span className={cn('font-medium', isEmoji(reaction) && 'text-xl')}>
                        {reaction}
                      </span>
                      {counter}
                    </Button>
                  ))}

                {canReply && !showReplyForm && (
                  <CustomButton
                    onClick={onButtonReplyClick}
                    className={cls.hover}
                    variant={ButtonVariant.CLEAR}
                    round={true}
                  >
                    <ReplyIcon />
                    Reply
                  </CustomButton>
                )}
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
      </ContextMenuTrigger>
      <ContextMenuContent className="rounded-xl">
        <div className="flex max-w-[15rem] flex-wrap">
          {availableReactions
            .concat('убей себя')
            .filter((reaction) => !draftReactions.includes(reaction))
            .map((reaction) => (
              <Button
                variant="ghost"
                size={isEmoji(reaction) ? 'icon' : 'default'}
                className="text-xl p-6"
                onClick={() => toggleReaction(reaction)}
              >
                {reaction}
              </Button>
            ))}
        </div>
      </ContextMenuContent>
    </ContextMenu>
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
