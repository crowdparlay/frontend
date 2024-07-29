import {useUnit} from 'effector-react';

import {Post} from '~/widgets/post';

import {ReplyForm} from '~/features/reply-form';

import {
  ApiV1CommentsParentCommentIdRepliesGet,
  ApiV1CommentsParentCommentIdRepliesPost,
} from '~/shared/api';
import {Container, ContainerSize, Page, Text, TextSize} from '~/shared/ui';
import {Card, CardSize} from '~/shared/ui/card';

import * as model from './model';
import {Replies} from './model';
import cls from './page.module.scss';

const buildReplyTree = (
  id: string,
  replies: Replies,
  onReplyClicked: (payload: ApiV1CommentsParentCommentIdRepliesGet) => void,
  onReplyFormSubmit: (payload: ApiV1CommentsParentCommentIdRepliesPost) => void,
) => {
  return replies[id]?.map((reply) => {
    const children = buildReplyTree(reply.id!, replies, onReplyClicked, onReplyFormSubmit);

    return (
      <Post
        key={reply.id!}
        replyId={id}
        id={reply.id!}
        author={{
          id: reply.author!.id!,
          username: reply.author!.username!,
          displayName: reply.author!.display_name!,
          avatarUrl: reply.author!.avatar_url!,
        }}
        date={new Date(reply.created_at!)}
        text={reply.content!}
        commentators={reply.first_replies_authors!.map((x) => ({
          id: x.id!,
          username: x.username!,
          displayName: x.display_name!,
          avatarUrl: x.avatar_url!,
        }))}
        commentsCount={reply.reply_count!}
        canReply={true}
        canReport={true}
        onShownClick={(parentCommentId) =>
          onReplyClicked({path: {parentCommentId}, query: {offset: 0, count: 100}})
        }
        onReplyFormSubmit={(payload) =>
          onReplyFormSubmit({
            path: {parentCommentId: payload.postId},
            body: {content: payload.value},
          })
        }
        children={children}
      />
    );
  });
};

export const DiscussionPage = () => {
  const [discussion, comments, onCommentFormSubmit, onReplyClicked, replies, onReplyFormSubmit] =
    useUnit([
      model.$discussion,
      model.$comments,
      model.commentFormSubmit,
      model.replyClicked,
      model.$replies,
      model.replyFormSubmit,
    ]);

  const items = comments.map((comment) => {
    const children = buildReplyTree(comment.id!, replies, onReplyClicked, onReplyFormSubmit);

    return (
      <Post
        key={comment.id!}
        id={comment.id!}
        author={{
          id: comment.author!.id!,
          username: comment.author!.username!,
          displayName: comment.author!.display_name!,
          avatarUrl: comment.author!.avatar_url!,
        }}
        date={new Date(comment.created_at!)}
        text={comment.content!}
        commentators={comment.first_replies_authors!.map((x) => ({
          id: x.id!,
          username: x.username!,
          displayName: x.display_name!,
          avatarUrl: x.avatar_url!,
        }))}
        commentsCount={comment.reply_count!}
        canReply={true}
        canReport={true}
        onShownClick={(parentCommentId) =>
          onReplyClicked({path: {parentCommentId}, query: {offset: 0, count: 100}})
        }
        onReplyFormSubmit={(payload) =>
          onReplyFormSubmit({
            path: {parentCommentId: payload.postId},
            body: {content: payload.value},
          })
        }
        children={children}
      />
    );
  });

  if (!discussion) {
    return null;
  }

  return (
    <Page>
      <Container size={ContainerSize.M}>
        <Card size={CardSize.L} className={cls.head}>
          <Text size={TextSize.XL} style={{marginBottom: 20}}>
            {discussion.title!}
          </Text>
          <Text size={TextSize.M}>{discussion.description!}</Text>
        </Card>
      </Container>

      <Container size={ContainerSize.M} style={{marginTop: 50, marginBottom: 20}}>
        {...items}
      </Container>

      <Container size={ContainerSize.M}>
        <ReplyForm
          postId={discussion.id!}
          maxLength={500}
          onSubmit={(payload) =>
            onCommentFormSubmit({body: {discussion_id: payload.postId, content: payload.value}})
          }
        />
      </Container>
    </Page>
  );
};
