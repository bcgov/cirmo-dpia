import { AllowedCommentPaths } from '../enums/allowed-comment-paths.enum';

export type CommentsCountRO = {
  [key in AllowedCommentPaths]: number;
};

export interface CommentsCountDbRO {
  path: string;
  count: string;
}

export const getFormattedCommentsCount = (
  recordsDb: CommentsCountDbRO[],
): Partial<CommentsCountRO> => {
  return recordsDb.reduce(
    (acc, record) => Object.assign(acc, { [record.path]: +record.count }),
    {},
  );
};
