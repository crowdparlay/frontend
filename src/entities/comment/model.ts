import {attach, merge} from 'effector';

import {newCommentReceived} from '~/pages/discussion/model';

import {
  apiV1CommentsCommentIdGetFx,
  apiV1CommentsCommentIdReactionsPostFx,
  apiV1CommentsCommentIdRepliesGetFx,
  apiV1DiscussionsDiscussionIdCommentsGetFx,
} from '~/shared/api';
import {reactionsFactory} from '~/shared/factory/reactions.factory';

const commitReactionsFx = attach({
  effect: apiV1CommentsCommentIdReactionsPostFx,
  mapParams: ({subjectId, reactions}) => ({
    path: {commentId: subjectId},
    body: reactions,
  }),
});

const committedReactionsFetched = merge([
  apiV1DiscussionsDiscussionIdCommentsGetFx.doneData.map((data) => data.answer.items),
  apiV1CommentsCommentIdRepliesGetFx.doneData.map((data) => data.answer.items),
  apiV1CommentsCommentIdGetFx.doneData.map((data) => [data.answer]),
  newCommentReceived.map((comment) => [comment]),
]).map((comments) => ({
  subjects: comments.map((comment) => ({
    id: comment.id,
    viewerReactions: comment.viewer_reactions as string[],
    reactionCounters: comment.reaction_counters as Record<string, number>,
  })),
}));

const reactions = reactionsFactory({
  commitReactionsFx,
  committedReactionsFetched,
});

export const $commentReactions = reactions.$reactions;
export const toggleCommentReaction = reactions.toggleReaction;
