import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { RoleReview } from 'src/modules/pia-intake/jsonb-classes/review/role-review';
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

export const piaReviewMetadataMock: Array<IFormField<RoleReview>> = [
  {
    key: 'isAcknowledged',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.CPO],
    isSystemGeneratedField: false,
  },
  {
    key: 'reviewNote',
    type: 'text',
    allowedUserTypesEdit: [UserTypesEnum.CPO],
    isSystemGeneratedField: false,
  },
  {
    key: 'reviewedByDisplayName',
    type: 'text',
    allowedUserTypesEdit: [],
    isSystemGeneratedField: true,
  },
  {
    key: 'reviewedByUsername',
    type: 'text',
    allowedUserTypesEdit: [],
    isSystemGeneratedField: true,
  },
  {
    key: 'reviewedByGuid',
    type: 'text',
    allowedUserTypesEdit: [],
    isSystemGeneratedField: true,
  },
  {
    key: 'reviewedAt',
    type: 'text',
    allowedUserTypesEdit: [],
    isSystemGeneratedField: true,
  },
  {
    key: 'reviewLastUpdatedAt',
    type: 'text',
    allowedUserTypesEdit: [],
    isSystemGeneratedField: true,
  },
];
