import { IsBoolean } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';
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
  },
  {
    key: 'reviewNote',
    type: 'text',
    allowedUserTypesEdit: null,
  },
  {
    key: 'reviewedByDisplayName',
    type: 'text',
    allowedUserTypesEdit: [], // empty array signifies that the client can't edit these fields
  },
  {
    key: 'reviewedByUsername',
    type: 'text',
    allowedUserTypesEdit: [],
  },
  {
    key: 'reviewedByGuid',
    type: 'text',
    allowedUserTypesEdit: [],
  },
  {
    key: 'reviewedAt',
    type: 'text',
    allowedUserTypesEdit: [],
  },
  {
    key: 'reviewLastUpdatedAt',
    type: 'text',
    allowedUserTypesEdit: [],
  },
];

export const validateRoleForSelectedRoleReviews = (
  updatedValue: ProgramAreaSelectedRolesReview,
  storedValue: ProgramAreaSelectedRolesReview,
  userType: UserTypesEnum[],
  path: string,
) => {
  if (!updatedValue) return;

  const keys = Object.keys(updatedValue) as Array<
    keyof ProgramAreaSelectedRolesReview
  >;

  keys.forEach((key) => {
    const updatedKeyValue = updatedValue?.[key];
    const storedKeyValue = storedValue?.[key];
    const metadata = selectedRolesReviewMetadata.find((m) => m.key === key);
    validateRoleForFormField(
      metadata,
      updatedKeyValue,
      storedKeyValue,
      userType,
      `${path}.${key}`,
    );
  });
};
