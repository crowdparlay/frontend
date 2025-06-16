import {useStoreMap, useUnit} from 'effector-react';

import {$commentReactions, toggleCommentReaction} from '~/entities/comment/model';
import {$discussionReactions, toggleDiscussionReaction} from '~/entities/discussion/model';
import {$availableReactions} from '~/entities/reaction/model';
import {DiscussionEntity, SubjectEntity} from '~/entities/types';

export const useReactions = (subject: SubjectEntity) => {
  const availableReactions = useUnit($availableReactions);

  const reactions = useStoreMap({
    store: subject instanceof DiscussionEntity ? $discussionReactions : $commentReactions,
    keys: [subject.id],
    fn: (reactions, [id]) =>
      reactions[id] ?? {
        draft: [],
        committed: [],
        countersWithDraft: {},
        countersWithoutDraft: {},
      },
  });

  const toggleReaction = useUnit(
    subject instanceof DiscussionEntity ? toggleDiscussionReaction : toggleCommentReaction,
  );

  return {availableReactions, reactions, toggleReaction};
};
