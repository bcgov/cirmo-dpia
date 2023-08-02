import { IsBoolean, IsString } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';
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
  isDeleted?: boolean, // when review is deleted, only check roles of NON-system generated values
) => {
  if (!updatedValue) return;

  let keys = Object.keys(updatedValue) as Array<keyof CpoReview>;

  // if review is deleted, only check role for ONLY user generated keys
  if (isDeleted) {
    keys = keys.filter((key) => {
      const metadata = cpoReviewMetadata.find((m) => m.key === key);
      return !metadata.isSystemGeneratedField;
    });
  }

  keys.forEach((key) => {
    const updatedKeyValue = updatedValue?.[key];
    const storedKeyValue = storedValue?.[key];
    const metadata = cpoReviewMetadata.find((m) => m.key === key);

    validateRoleForFormField(
      metadata,
      updatedKeyValue,
      storedKeyValue,
      userType,
      `${path}.${key}`,
    );
  });
};
