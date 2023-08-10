import { IsBoolean } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { RoleReview } from './role-review';

export class MpoReview extends RoleReview {
  // overriding the mandatory fields
  @IsBoolean()
  isAcknowledged: boolean;
}

export const mpoReviewMetadata: Array<IFormField<MpoReview>> = [
  {
    key: 'isAcknowledged',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
    isSystemGeneratedField: false,
  },
  {
    key: 'reviewNote',
    type: 'text',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
    isSystemGeneratedField: false,
  },
  {
    key: 'reviewedByDisplayName',
    type: 'text',
    allowedUserTypesEdit: [], // empty array signifies that the client can't edit these fields
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

export const validateRoleForMpoReview = (
  updatedValue: MpoReview,
  storedValue: MpoReview,
  userType: UserTypesEnum[],
  path: string,
  loggedInUser: KeycloakUser,
) => {
  RoleReview.validateRoleForReview<MpoReview>(
    updatedValue,
    storedValue,
    userType,
    path,
    loggedInUser,
    mpoReviewMetadata,
  );
};
