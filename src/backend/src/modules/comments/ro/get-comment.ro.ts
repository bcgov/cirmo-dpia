import {
  ExcludeBaseSelection,
  omitBaseKeys,
} from 'src/common/helpers/base-helper';
import { CommentEntity } from '../entities/comment.entity';
import { ReplyEntity } from '../entities/reply.entity';

export const excludeCommentKeys = { pia: true };
export const excludeReplyKeys = { comment: true };

export type CommentRO = Omit<
  CommentEntity,
  keyof ExcludeBaseSelection | keyof typeof excludeCommentKeys
>;

export type ReplyRO = Omit<
  ReplyEntity,
  keyof ExcludeBaseSelection | keyof typeof excludeReplyKeys
>;

export const getFormattedComment = (comment: CommentEntity) => {
  return omitBaseKeys<CommentRO>(comment, Object.keys(excludeCommentKeys));
};

export const getFormattedReply = (reply: ReplyEntity) => {
  return omitBaseKeys<ReplyRO>(reply, Object.keys(excludeReplyKeys));
};

export const getFormattedComments = (comments: CommentEntity[]) => {
  return comments.map((comment) => getFormattedComment(comment));
};
