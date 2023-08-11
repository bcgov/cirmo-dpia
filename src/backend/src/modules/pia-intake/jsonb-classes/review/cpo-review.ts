import { IsBoolean, IsString } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { RoleReview } from './role-review';

export class CpoReview extends RoleReview {
  // overriding the mandatory fields
  @IsBoolean()
  isAcknowledged: boolean;

  @IsString()
  @Transform(({ value }) => value?.trim())
  reviewNote?: string;
}

export const cpoReviewMetadata: Array<IFormField<CpoReview>> = [
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

export const validateRoleForCpoReview = (
  updatedValue: CpoReview,
  storedValue: CpoReview,
  userType: UserTypesEnum[],
  path: string,
  loggedInUser: KeycloakUser,
) => {
  RoleReview.validateRoleForReview<CpoReview>(
    updatedValue,
    storedValue,
    userType,
    path,
    loggedInUser,
    cpoReviewMetadata,
  );
};
