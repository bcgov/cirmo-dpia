import { CreateCommentDto } from 'src/modules/comments/dto/create-comment.dto';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import { AllowedCommentPaths } from 'src/modules/comments/enums/allowed-comment-paths.enum';
import {
  CommentsCountDbRO,
  CommentsCountRO,
} from 'src/modules/comments/ro/comments-count-ro';
import { CommentRO } from 'src/modules/comments/ro/get-comment.ro';
import { keycloakUserMock } from './auth.mock';
import { piaIntakeEntityMock } from './pia-intake.mock';

export const createCommentDtoMock: CreateCommentDto = {
  path: AllowedCommentPaths['accuracyCorrectionAndRetention.accuracy'],
  piaId: 101,
  text: 'This is a test Comment',
};

export const commentROMock: CommentRO = {
  id: 1,
  isActive: true,
  isResolved: false,
  createdByDisplayName: 'Test User',
  createdByGuid: 'AAA00001B22C333DD4EEEEE55F6666G77',
  piaId: 101,
  path: AllowedCommentPaths['accuracyCorrectionAndRetention.accuracy'],
  text: 'Test Comment 0',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Below fields are not included in the RO
const commentsExcludedFields = {
  pia: { ...piaIntakeEntityMock },
  createdByGuid: keycloakUserMock.idir_user_guid,
  createdByUsername: keycloakUserMock.idir_username,
  updatedByGuid: keycloakUserMock.idir_user_guid,
  updatedByUsername: keycloakUserMock.idir_username,
};

export const commentEntityMock: CommentEntity = {
  ...commentROMock,
  ...commentsExcludedFields,
};

export const findCommentsROMock: CommentRO[] = [
  {
    ...commentROMock,
    id: 1,
    text: 'Test Comment 1',
  },
  {
    ...commentROMock,
    id: 2,
    text: 'Test Comment 2',
  },
];

// [findCommentsROMock + commentsExcludedFields]
export const findCommentsMock: CommentEntity[] = [...findCommentsROMock].map(
  (ro) => ({ ...ro, ...commentsExcludedFields }),
);

export const commentsCountDbRO: CommentsCountDbRO = {
  path: AllowedCommentPaths['accuracyCorrectionAndRetention.accuracy'],
  count: '1',
};

export const commentsCountROMock: Partial<CommentsCountRO> = {
  [commentsCountDbRO.path]: +commentsCountDbRO.count,
};
