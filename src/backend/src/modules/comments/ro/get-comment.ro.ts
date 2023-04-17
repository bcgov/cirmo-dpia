import {
  ExcludeBaseSelection,
  omitBaseKeys,
} from 'src/common/helpers/base-helper';
import { CommentEntity } from '../entities/comment.entity';

export type CommentRO = Omit<CommentEntity, keyof ExcludeBaseSelection>;

export const getFormattedComment = (comment: CommentEntity) => {
  return omitBaseKeys<CommentRO>(comment);
};

export const getFormattedComments = (comments: CommentEntity[]) => {
  return comments.map((comment) => getFormattedComment(comment));
};
