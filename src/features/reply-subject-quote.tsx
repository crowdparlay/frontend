import {HTMLAttributes} from 'react';
import {cn} from '~/lib/utils';

import {SubjectEntity} from '~/entities/types';

import {Skeleton} from '~/shared/ui/skeleton';

interface ReplySubjectQuoteProps extends HTMLAttributes<HTMLDivElement> {
  subject: SubjectEntity;
}

export const ReplySubjectQuote = ({
  subject,
  className,
  style,
  ...otherProps
}: ReplySubjectQuoteProps) => {
  const subjectAuthorStyle = subject.author?.getPersonalStyle();
  return (
    <div
      className={cn('w-full ps-3 text-sm border-s-2', className)}
      {...{
        style: {
          color: subjectAuthorStyle?.color,
          borderColor: subjectAuthorStyle?.color,
          ...style,
        },
      }}
      {...otherProps}
    >
      {subject.author ? (
        <p className="font-medium">{subject.author?.displayName}</p>
      ) : (
        <div className="py-1.5">
          <Skeleton className="w-24 h-2" />
        </div>
      )}
      <p className="truncate text-muted-foreground">{subject?.content}</p>
    </div>
  );
};
