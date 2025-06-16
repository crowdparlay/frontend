import {HTMLAttributes, memo, useState} from 'react';
import {cn} from '~/lib/utils';

import {Comments} from '~/widgets/comments';
import {useDiscussionContext} from '~/widgets/discussion/context';

import {FormattedContent} from '~/features/formatted-content';
import {Profile, ProfileSkeleton} from '~/features/profile';
import {SubjectFooter, SubjectFooterSkeleton} from '~/features/subject-footer';
import {Timestamp} from '~/features/timestamp';

import {CommentEntity} from '~/entities/types';

import '~/shared/api';
import {Skeleton} from '~/shared/ui/skeleton';

export const CommentSkeleton = (props: HTMLAttributes<HTMLDivElement>) => {
  const {className, ...otherProps} = props;
  const contentWidthPercentage = Math.random() * 40 + 10;
  return (
    <div className={cn('p-5 space-y-3', className)} {...otherProps}>
      <div className="flex justify-between">
        <ProfileSkeleton />
        <Skeleton className="w-16 h-2" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3" style={{width: `${contentWidthPercentage}%`}} />
      </div>
      <SubjectFooterSkeleton inclusiveReactionsRange={[1, 4]} hideCommentsButton={true} />
    </div>
  );
};

export interface CommentProps extends HTMLAttributes<HTMLDivElement> {
  comment: CommentEntity;
  isAuthoredByTopicStarter?: boolean;
}

export const Comment = memo((props: CommentProps) => {
  const {comment, isAuthoredByTopicStarter, className, ...otherProps} = props;
  const {author, content, publishedAt} = comment;

  const [expandReplies, setExpandReplies] = useState(false);
  const {replyDraftSubject, setReplyDraftSubject} = useDiscussionContext();

  return (
    <div className={cn(replyDraftSubject.id === comment.id && 'bs-4', className)} {...otherProps}>
      <div className="flex flex-col gap-3 p-5 group/subject">
        <div className="flex justify-between text-sm">
          <Profile user={author} variant="md" isTopicStarter={isAuthoredByTopicStarter} />
          <Timestamp date={publishedAt} />
        </div>

        <div>
          <FormattedContent>{content}</FormattedContent>
        </div>

        <SubjectFooter
          subject={comment}
          expandComments={expandReplies}
          onToggleComments={() => setExpandReplies(!expandReplies)}
          onReply={() => setReplyDraftSubject(comment)}
        />
      </div>

      {expandReplies && <Comments subject={comment} className="ps-20" />}
    </div>
  );
});
