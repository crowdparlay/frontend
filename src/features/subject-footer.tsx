import {Reply, SmilePlus} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {HTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import {cn, isEmoji} from '~/lib/utils';

import cls from '~/widgets/post/index.module.scss';

import {InlineAvatars} from '~/features/inline-avatars';
import {ReactionContextMenu} from '~/features/reactions-context-menu';

import {useReactions} from '~/entities/reaction/hook';
import {CommentEntity, SubjectEntity} from '~/entities/types';

import {Button} from '~/shared/ui/button';
import {Skeleton} from '~/shared/ui/skeleton';

export const SubjectFooterSkeleton = (
  props: {
    inclusiveReactionsRange: [number, number];
    hideCommentsButton?: boolean;
  } & HTMLAttributes<HTMLDivElement>,
) => {
  const {inclusiveReactionsRange, hideCommentsButton, className, ...otherProps} = props;
  const [minReactions, maxReactions] = inclusiveReactionsRange;
  const reactions = [
    ...Array(Math.round(Math.random() * (maxReactions - minReactions)) + minReactions).keys(),
  ];
  return (
    <div className={cn('flex gap-3', className)} {...otherProps}>
      {hideCommentsButton || <Skeleton key={-1} className="w-24 h-5 rounded-full" />}
      {reactions.map((i) => (
        <Skeleton key={i} className="w-10 h-5 rounded-full" />
      ))}
    </div>
  );
};

export const SubjectFooter = (props: {
  subject: SubjectEntity;
  expandComments: boolean;
  onToggleComments: () => void;
  onReply: () => void;
}) => {
  const {subject, expandComments, onToggleComments, onReply} = props;
  const {id} = subject;
  const footerRef = useRef<HTMLDivElement>(null);
  const [areActionButtonsSolelyWrapped, setAreActionButtonsSolelyWrapped] = useState(false);
  const actionButtonsRef = useRef<HTMLDivElement>(null);
  const {availableReactions, reactions, toggleReaction} = useReactions(subject);

  const updateForceShowActionButtons = useCallback(() => {
    if (!actionButtonsRef.current || !footerRef.current) return;
    const actionButtonsLeft = actionButtonsRef.current.getBoundingClientRect().left;
    const footerLeft = footerRef.current.getBoundingClientRect().left;
    setAreActionButtonsSolelyWrapped(actionButtonsLeft === footerLeft);
  }, [actionButtonsRef, footerRef]);

  const noReactions = Object.keys(reactions.countersWithDraft).length === 0;
  const showActionButtons = noReactions || areActionButtonsSolelyWrapped;

  useEffect(() => {
    window.addEventListener('resize', () => updateForceShowActionButtons());
  }, [updateForceShowActionButtons]);

  const commentNoun: {plural: string; singular: string} =
    subject instanceof CommentEntity
      ? {plural: 'replies', singular: 'reply'}
      : {plural: 'comments', singular: 'comment'};

  return (
    <motion.div
      ref={footerRef}
      className="flex w-fit gap-2 flex-wrap"
      variants={{
        shown: {transition: {staggerChildren: 0, delayChildren: 0}},
      }}
      initial="hidden"
      animate="shown"
    >
      {subject.recursiveCommentCount > 0 && (
        <Button
          key="replies"
          onClick={() => {
            onToggleComments();
          }}
          className={cn(
            'rounded-full font-normal text-xs h-8 border-none ring-accent ring-1 group/replies-button',
            expandComments ? 'text-muted-foreground' : 'ps-1.5 pe-3.5',
          )}
          variant="outline"
        >
          {expandComments ? (
            <p>
              Collapse{' '}
              {subject.recursiveCommentCount === 1 ? commentNoun.singular : commentNoun.plural}
            </p>
          ) : (
            <>
              <InlineAvatars
                className={cn('group-hover/replies-button:[&>*]:!outline-accent', cls.avatars)}
                users={subject.commentAuthors}
              />
              <p>
                {subject.recursiveCommentCount}{' '}
                {subject.recursiveCommentCount === 1 ? commentNoun.singular : commentNoun.plural}
              </p>
            </>
          )}
        </Button>
      )}

      <AnimatePresence initial={false} onExitComplete={() => updateForceShowActionButtons()}>
        {Object.entries(reactions.countersWithDraft).map(([reaction, counter], i) => {
          const isLastReactionCounter = i === Object.keys(reactions.countersWithDraft).length - 1;
          return (
            <motion.div
              onAnimationComplete={() => updateForceShowActionButtons()}
              key={reaction}
              layout
              whileTap={{
                scale: 0.7,
                transition: {type: 'spring', stiffness: 400, damping: 10},
              }}
              exit={{
                opacity: 0,
                scale: 0.6,
                width: isLastReactionCounter ? 'auto' : 0,
                marginLeft: isLastReactionCounter ? 0 : '-1rem',
                transition: {duration: isLastReactionCounter ? 0.1 : 0.3},
              }}
              variants={{
                hidden: {opacity: 0, scale: 2},
                shown: {opacity: 1, scale: 1},
              }}
            >
              <Button
                variant={reactions.draft.includes(reaction) ? 'default' : 'ghost'}
                className={cn(
                  'rounded-full pr-4 h-8 font-normal dark:font-medium',
                  reactions.draft.includes(reaction) &&
                    'bg-border/50 hover:bg-border text-foreground dark:text-primary-foreground',
                  isEmoji(reaction) && 'pl-2',
                )}
                onClick={() =>
                  toggleReaction({
                    subjectId: id,
                    toggledReaction: reaction,
                  })
                }
              >
                <span className={cn(isEmoji(reaction) && 'text-lg')}>{reaction}</span>
                {counter}
              </Button>
            </motion.div>
          );
        })}
        <motion.div
          ref={actionButtonsRef}
          key="actions"
          layout
          className={cn(
            'sm:opacity-0 group-hover/subject:opacity-100 space-x-2 transition-opacity',
            showActionButtons && 'opacity-100!',
          )}
        >
          {!availableReactions.every((reaction) => reactions.draft.includes(reaction)) && (
            <ReactionContextMenu subject={subject}>
              <Button variant="outline" className="w-8 h-8 p-0 rounded-full">
                <SmilePlus />
              </Button>
            </ReactionContextMenu>
          )}
          <Button variant="link" className="h-8 p-0" onClick={onReply}>
            <Reply /> Reply
          </Button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
