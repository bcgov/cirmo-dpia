import { keycloakUserMock } from './auth.mock';

export const piaReviewMock = {
  isAcknowledged: true,
  reviewNote: 'Test note!',
  reviewedAt: new Date(),
  reviewLastUpdatedAt: new Date(),
  reviewedByGuid: keycloakUserMock.idir_user_guid,
  reviewedByUsername: keycloakUserMock.idir_username,
  reviewedByDisplayName: keycloakUserMock.display_name,
};
