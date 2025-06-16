import {attach, merge} from 'effector';

import {
  apiV1DiscussionsDiscussionIdGetFx,
  apiV1DiscussionsDiscussionIdReactionsPostFx,
  apiV1DiscussionsGetFx,
} from '~/shared/api';
import {reactionsFactory} from '~/shared/factory/reactions.factory';

const commitReactionsFx = attach({
  effect: apiV1DiscussionsDiscussionIdReactionsPostFx,
  mapParams: ({subjectId, reactions}) => ({
    path: {discussionId: subjectId},
    body: reactions,
  }),
});

const committedReactionsFetched = merge([
  apiV1DiscussionsGetFx.doneData.map((data) => data.answer.items),
  apiV1DiscussionsDiscussionIdGetFx.doneData.map((data) => [data.answer]),
]).map((discussions) => ({
  subjects: discussions.map((discussion) => ({
    id: discussion.id,
    viewerReactions: discussion.viewer_reactions as string[],
    reactionCounters: discussion.reaction_counters as Record<string, number>,
  })),
}));

const reactions = reactionsFactory({
  commitReactionsFx,
  committedReactionsFetched,
});

export const $discussionReactions = reactions.$reactions;
export const toggleDiscussionReaction = reactions.toggleReaction;
