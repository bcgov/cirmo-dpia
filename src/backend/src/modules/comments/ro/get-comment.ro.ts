import {
  ExcludeBaseSelection,
  omitBaseKeys,
} from 'src/common/helpers/base-helper';
import { CommentEntity } from '../entities/comment.entity';

export const excludeCommentKeys = { pia: true };

export type CommentRO = Omit<
  CommentEntity,
  keyof ExcludeBaseSelection | keyof typeof excludeCommentKeys
>;

export const getFormattedComment = (comment: CommentEntity) => {
  return omitBaseKeys<CommentRO>(comment, Object.keys(excludeCommentKeys));
};

export const getFormattedComments = (comments: CommentEntity[]) => {
  return comments.map((comment) => getFormattedComment(comment));
};
