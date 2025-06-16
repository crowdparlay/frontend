import * as typed from 'typed-contracts';

import {apiV1CommentsCommentIdGetOk, apiV1DiscussionsDiscussionIdGetOk} from '~/shared/api';
import {UserEntity} from '~/shared/api/types';

export abstract class SubjectEntity {
  id: string;
  author?: UserEntity;
  content: string;
  publishedAt: Date;
  commentAuthors: UserEntity[];
  recursiveCommentCount: number;
  directCommentCount?: number;

  protected constructor(params: {
    id: string;
    author?: UserEntity;
    content: string;
    publishedAt: Date;
    commentAuthors: UserEntity[];
    recursiveCommentCount: number;
    directCommentCount?: number;
  }) {
    this.id = params.id;
    this.author = params.author;
    this.content = params.content;
    this.publishedAt = params.publishedAt;
    this.commentAuthors = params.commentAuthors;
    this.recursiveCommentCount = params.recursiveCommentCount;
    this.directCommentCount = params.directCommentCount;
  }
}

export class DiscussionEntity extends SubjectEntity {
  title: string;

  constructor(params: {
    id: string;
    author?: UserEntity;
    title: string;
    content: string;
    publishedAt: Date;
    commentAuthors: UserEntity[];
    recursiveCommentCount: number;
    directCommentCount?: number;
  }) {
    super(params);
    this.title = params.title;
  }

  static fromResponse(
    response: typed.Get<typeof apiV1DiscussionsDiscussionIdGetOk>,
  ): DiscussionEntity {
    return new DiscussionEntity({
      id: response.id,
      author: UserEntity.fromResponse(response.author),
      title: response.title,
      content: response.content,
      publishedAt: new Date(response.created_at),
      commentAuthors: response.last_comments_authors.map(
        (author) => UserEntity.fromResponse(author)!,
      ),
      recursiveCommentCount: response.comment_count,
    });
  }
}

export class CommentEntity extends SubjectEntity {
  subjectId: string;

  constructor(params: {
    id: string;
    subjectId: string;
    author?: UserEntity;
    content: string;
    publishedAt: Date;
    commentAuthors: UserEntity[];
    recursiveCommentCount: number;
    directCommentCount?: number;
  }) {
    super(params);
    this.subjectId = params.subjectId;
  }

  static fromResponse(response: typed.Get<typeof apiV1CommentsCommentIdGetOk>): CommentEntity {
    return new CommentEntity({
      id: response.id,
      subjectId: response.subject_id,
      author: UserEntity.fromResponse(response.author),
      content: response.content,
      publishedAt: new Date(response.created_at),
      commentAuthors: response.last_comments_authors.map(
        (author) => UserEntity.fromResponse(author)!,
      ),
      recursiveCommentCount: response.comment_count,
    });
  }
}
