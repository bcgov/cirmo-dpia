import { IsBoolean } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { RoleReview } from '../role-review';

export class ProgramAreaSelectedRolesReview extends RoleReview {
  // override mandatory fields
  @IsBoolean()
  isAcknowledged: boolean;
}

export const selectedRolesReviewMetadata: Array<
  IFormField<ProgramAreaSelectedRolesReview>
> = [
  {
    key: 'isAcknowledged',
    type: 'boolean',
    allowedUserTypesEdit: null, // null signifies that anyone can change this field
    isSystemGeneratedField: false,
  },
  {
    key: 'reviewNote',
    type: 'text',
    allowedUserTypesEdit: null,
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

export const validateRoleForSelectedRoleReviews = (
  updatedValue: ProgramAreaSelectedRolesReview,
  storedValue: ProgramAreaSelectedRolesReview,
  userType: UserTypesEnum[],
  path: string,
  loggedInUser: KeycloakUser,
) => {
  RoleReview.validateRoleForReview<ProgramAreaSelectedRolesReview>(
    updatedValue,
    storedValue,
    userType,
    path,
    loggedInUser,
    selectedRolesReviewMetadata,
  );
};
