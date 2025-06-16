import * as typed from 'typed-contracts';
import {createEvent, createStore, merge, sample, split} from 'effector';
import {attach} from 'effector/compat';

import {CommentEntity, DiscussionEntity, SubjectEntity} from '~/entities/types';

import {
  apiV1CommentsCommentIdRepliesGetFx,
  apiV1DiscussionsDiscussionIdCommentsGetFx,
  apiV1DiscussionsDiscussionIdCommentsGetOk,
} from '~/shared/api';
import {signalRFactory} from '~/shared/factory/signal-r.factory';

export const commentsFactory = (discussion: DiscussionEntity) => {
  const resetComments = createEvent();

  const fetchComments = createEvent<{subject: SubjectEntity; offset: number}>();

  const {fetchDiscussionComments, fetchCommentReplies} = split(fetchComments, {
    fetchDiscussionComments: ({subject}) => subject instanceof DiscussionEntity,
    fetchCommentReplies: ({subject}) => subject instanceof CommentEntity,
  });

  const fetchDiscussionCommentsFx = attach({
    effect: apiV1DiscussionsDiscussionIdCommentsGetFx,
    mapParams: ({subject, offset}: {subject: SubjectEntity; offset: number}) => ({
      path: {discussionId: subject.id},
      query: {flatten: false, offset, count: 10},
    }),
  });

  sample({
    clock: fetchDiscussionComments,
    target: fetchDiscussionCommentsFx,
  });

  const fetchCommentRepliesFx = attach({
    effect: apiV1CommentsCommentIdRepliesGetFx,
    mapParams: ({subject, offset}: {subject: SubjectEntity; offset: number}) => ({
      path: {commentId: subject.id},
      query: {flatten: false, offset, count: 10},
    }),
  });

  sample({
    clock: fetchCommentReplies,
    target: fetchCommentRepliesFx,
  });

  const fetchReplies = createEvent<{subject: SubjectEntity; offset: number}>();

  sample({
    clock: fetchReplies,
    target: fetchReplies,
  });

  const commentsFetched = merge([fetchDiscussionCommentsFx.done, fetchCommentRepliesFx.done]).map(
    ({params, result}) => ({
      subject: params.subject,
      comments: result.answer.items.map((comment) => CommentEntity.fromResponse(comment)),
      totalCommentCount: result.answer.total_count,
    }),
  );

  const hub =
    signalRFactory<typed.Get<typeof apiV1DiscussionsDiscussionIdCommentsGetOk>['items'][number]>(
      'NewComment',
    );

  const $subjects = createStore<SubjectEntity[]>([discussion])
    .on(hub.messageReceived, (state, comment) => {
      console.log(comment);
      const entity = CommentEntity.fromResponse(comment);
      const subject = state.find((x) => x.id === entity.subjectId)!;
      subject.directCommentCount = (subject.directCommentCount ?? 0) + 1;
      return [...state, entity];
    })
    .on(commentsFetched, (state, {subject, comments, totalCommentCount}) => {
      state.find((x) => x.id === subject.id)!.directCommentCount = totalCommentCount;
      return [...state, ...comments];
    })
    .reset(resetComments);

  hub.start({url: `/api/v1/hubs/comments?discussionId=${discussion.id}`});

  sample({
    clock: resetComments,
    target: hub.stop,
  });

  const $discussion = $subjects.map((subjects) => subjects[0] as DiscussionEntity);

  return {$discussion, $subjects, fetchComments, resetComments};
};
