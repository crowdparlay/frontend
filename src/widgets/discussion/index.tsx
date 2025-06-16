import {Link, LinkProps} from 'atomic-router-react';
import {useUnit} from 'effector-react';
import {ChevronUp} from 'lucide-react';
import {HTMLAttributes, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {cn} from '~/lib/utils';

import {DiscussionRoute} from '~/pages/discussion';

import {Comments} from '~/widgets/comments';

import {CommentForm} from '~/features/comment-form';
import {FormattedContent} from '~/features/formatted-content';
import {Profile, ProfileSkeleton} from '~/features/profile';
import {SubjectFooter, SubjectFooterSkeleton} from '~/features/subject-footer';
import {Timestamp} from '~/features/timestamp';

import {CommentEntity, DiscussionEntity, SubjectEntity} from '~/entities/types';

import {
  apiV1CommentsCommentIdRepliesPostFx,
  apiV1DiscussionsDiscussionIdCommentsPostFx,
} from '~/shared/api';
import {commentsFactory} from '~/shared/factory/comments.factory';
import {$user} from '~/shared/session';
import {Avatar, AvatarVariant} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import {Skeleton} from '~/shared/ui/skeleton';

import {DiscussionContext} from './context';

export interface DiscussionProps extends HTMLAttributes<HTMLDivElement> {
  discussion: DiscussionEntity;
  preview?: boolean;
}

export const DiscussionSkeleton = (props: HTMLAttributes<HTMLDivElement>) => {
  const {className, ...otherProps} = props;
  const lines = [...Array(Math.round(Math.random()) + 2).keys()];
  return (
    <div className={cn('border rounded-xl bg-background p-5 space-y-5', className)} {...otherProps}>
      <div className="flex justify-between">
        <ProfileSkeleton />
        <Skeleton className="w-16 h-2" />
      </div>
      <Skeleton className="w-[20%] h-6 rounded-full" />
      <div className="space-y-3">
        {lines.map((i) => (
          <Skeleton key={i} className="h-3" />
        ))}
        <Skeleton key={-1} className="h-3 w-[20%]" />
      </div>
      <SubjectFooterSkeleton inclusiveReactionsRange={[2, 5]} />
    </div>
  );
};

export const Discussion = (props: DiscussionProps) => {
  const {discussion, preview, className, ...otherProps} = props;
  const {id, author, title, content, publishedAt} = discussion;

  const [replyDraftSubject, setReplyDraftSubject] = useState<SubjectEntity>(discussion);
  const [expandComments, setExpandComments] = useState(false);
  const [expandReplyFormSection, setExpandReplyFormSection] = useState(false);
  const [replyFormSectionHeight, setReplyFormSectionHeight] = useState(0);
  const replyFormSectionRef = useRef<HTMLDivElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);
  const user = useUnit($user);

  const commentsModel = useMemo(() => commentsFactory(discussion), [discussion]);
  useEffect(() => () => commentsModel.resetComments(), [commentsModel]);

  const updateReplyFormSectionHeight = () =>
    setReplyFormSectionHeight(replyFormSectionRef.current?.clientHeight ?? 0);

  return (
    <DiscussionContext.Provider
      value={{
        $discussion: commentsModel.$discussion,
        $subjects: commentsModel.$subjects,
        fetchComments: commentsModel.fetchComments,
        replyDraftSubject,
        setReplyDraftSubject: (subject: SubjectEntity) => {
          setReplyDraftSubject(subject);
          setExpandReplyFormSection(true);
        },
      }}
    >
      <div
        ref={discussionRef}
        key={id}
        className={cn(
          'scroll-m-20 border rounded-xl bg-background',
          !user && 'overflow-hidden',
          className,
        )}
        {...otherProps}
      >
        <div className="flex flex-col gap-3 p-5 group/subject">
          <div className="flex justify-between text-sm">
            <Profile user={author} variant="md" />
            <Timestamp date={publishedAt} />
          </div>

          <ConditionalLink
            condition={preview}
            to={DiscussionRoute.route}
            params={{discussionId: discussion.id}}
            className="hover:text-foreground"
          >
            <div>
              <h1 className="text-3xl font-extrabold font-[Inter] text-balance mt-2 mb-3 text-foreground/90">
                {title}
              </h1>
              <FormattedContent>{content}</FormattedContent>
            </div>
          </ConditionalLink>

          <SubjectFooter
            subject={discussion}
            expandComments={expandComments}
            onToggleComments={() => {
              if (expandComments) setExpandReplyFormSection(false);
              setExpandComments(!expandComments);
            }}
            onReply={() => {
              setReplyDraftSubject(discussion);
              setExpandReplyFormSection(true);
              setExpandComments(true);
            }}
          />
        </div>

        <div
          className="relative transition-all"
          style={{paddingBottom: expandComments ? replyFormSectionHeight : 0}}
        >
          {expandComments && <Comments subject={discussion} />}
          {user && (expandComments || expandReplyFormSection) && (
            <div className={cn('w-full h-full absolute top-0 pointer-events-none transition-all')}>
              <div
                className={cn(
                  'pt-4 sm:pt-0 -mt-4 sm:mt-0 sticky ml-[0.5px] sm:rounded-b-xl w-full pointer-events-auto sm:ring ring-background sm:shadow-[1.25rem_1.25rem_0_1px_var(--background),-1.25rem_1.25rem_0_1px_var(--background)]',
                )}
                style={{top: `calc(100% - ${replyFormSectionHeight}px - 1rem)`}}
              >
                <div
                  ref={replyFormSectionRef}
                  className="bg-background/90 backdrop-blur-2xl outline outline-1 outline-border sm:rounded-b-xl overflow-hidden"
                >
                  <CommentForm
                    author={user}
                    subject={replyDraftSubject}
                    onRemoveSubject={() => setReplyDraftSubject(discussion)}
                    onSubmit={(content) => {
                      if (replyDraftSubject instanceof DiscussionEntity) {
                        apiV1DiscussionsDiscussionIdCommentsPostFx({
                          path: {discussionId: replyDraftSubject.id},
                          body: {content},
                        });
                      } else if (replyDraftSubject instanceof CommentEntity) {
                        apiV1CommentsCommentIdRepliesPostFx({
                          path: {commentId: replyDraftSubject.id},
                          body: {content},
                        });
                      }
                      setExpandReplyFormSection(false);
                    }}
                    onReset={() => setExpandReplyFormSection(false)}
                    onHide={() => {
                      setExpandReplyFormSection(false);
                      updateReplyFormSectionHeight();
                    }}
                    onTogglePreview={updateReplyFormSectionHeight}
                    className={cn('p-5 hidden', expandReplyFormSection && 'flex')}
                  />
                  {expandReplyFormSection || (
                    <div className={cn('h-12 w-full flex items-center justify-between')}>
                      <Button
                        variant="link"
                        onClick={() => {
                          setExpandReplyFormSection(true);
                          updateReplyFormSectionHeight();
                        }}
                        className="h-full gap-3"
                      >
                        <Avatar user={author} variant={AvatarVariant.INLINE} />
                        Reply
                      </Button>
                      <Button
                        variant="link"
                        className="h-full rounded-none group/collapse-replies-button"
                        onClick={() => {
                          setExpandComments(false);
                          discussionRef.current?.scrollIntoView();
                        }}
                      >
                        <ChevronUp />
                        <p className="group-hover/collapse-replies-button:">Collapse</p>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DiscussionContext.Provider>
  );
};

const ConditionalLink = (props: LinkProps<any> & {condition?: boolean}): ReactNode =>
  props.condition ? <Link {...props}>{props.children}</Link> : props.children;
