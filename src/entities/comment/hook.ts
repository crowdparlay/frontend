import {useStoreMap} from 'effector-react';

import {useDiscussionContext} from '~/widgets/discussion/context';

import {CommentEntity, SubjectEntity} from '~/entities/types';

export const useComments = (subject: SubjectEntity): CommentEntity[] => {
  const {$subjects} = useDiscussionContext();
  return useStoreMap({
    store: $subjects,
    keys: [subject.id],
    fn: (subjects, [id]) =>
      subjects.filter(
        (subject) => subject instanceof CommentEntity && subject.subjectId === id,
      ) as CommentEntity[],
  });
};
