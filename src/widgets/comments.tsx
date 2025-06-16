import {useUnit} from 'effector-react';
import {ChevronDown} from 'lucide-react';
import {FC, HTMLAttributes, useEffect, useState} from 'react';

import {useDiscussionContext} from '~/widgets/discussion/context';
import {Comment, CommentSkeleton} from '~/widgets/post';

import {useComments} from '~/entities/comment/hook';
import {SubjectEntity} from '~/entities/types';

import {Button} from '~/shared/ui/button';

export const Comments: FC<{subject: SubjectEntity} & HTMLAttributes<HTMLDivElement>> = ({
  subject,
  ...props
}) => {
  const comments = useComments(subject);
  const discussion = useDiscussionContext();
  const storedSubjects = useUnit(discussion.$subjects);
  const storedSubject = storedSubjects.find((x) => x.id === subject.id)!;

  const totalCommentCount = storedSubject.directCommentCount ?? storedSubject.recursiveCommentCount;
  const unloadedCommentCount = totalCommentCount - comments.length;
  const [expectedCommentCount, setExpectedCommentCount] = useState(comments.length);

  if (expectedCommentCount > totalCommentCount) setExpectedCommentCount(totalCommentCount);

  const loadingCommentCount = Math.max(0, expectedCommentCount - comments.length);
  const fetchNextComments = () => discussion.fetchComments({subject, offset: comments.length});

  useEffect(() => {
    setExpectedCommentCount(comments.length + 10);
    fetchNextComments();
  }, []);

  return (
    <div {...props}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          className="border-0 border-t rounded-none overflow-hidden"
          isAuthoredByTopicStarter={storedSubject.author?.id === comment.author?.id}
        />
      ))}
      {[...Array(loadingCommentCount).keys()].map((i) => (
        <CommentSkeleton key={i} className="border-t" />
      ))}
      {loadingCommentCount === 0 && unloadedCommentCount > 0 && (
        <Button
          variant="link"
          className="w-full border-t pt-1 justify-start rounded-none no-underline! text-xs text-foreground/70 hover:text-foreground hover:bg-accent/25"
          onClick={fetchNextComments}
        >
          <ChevronDown /> {unloadedCommentCount} more
        </Button>
      )}
    </div>
  );
};
