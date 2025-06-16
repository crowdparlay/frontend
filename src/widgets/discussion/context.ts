import {Event, Store} from 'effector';
import {createContext, useContext} from 'react';

import {DiscussionEntity, SubjectEntity} from '~/entities/types';

interface DiscussionContextType {
  $discussion: Store<DiscussionEntity>;
  $subjects: Store<SubjectEntity[]>;
  fetchComments: Event<{subject: SubjectEntity; offset: number}>;
  replyDraftSubject: SubjectEntity;
  setReplyDraftSubject: (subject: SubjectEntity) => void;
}

export const DiscussionContext = createContext<DiscussionContextType | null>(null);
export const useDiscussionContext = () => {
  const context = useContext(DiscussionContext);
  if (!context) throw new Error('useDiscussionContext must be used within DiscussionProvider');
  return context;
};
