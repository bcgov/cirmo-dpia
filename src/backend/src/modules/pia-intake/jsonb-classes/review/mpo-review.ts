import { IsBoolean } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';
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
  isDeleted?: boolean,
) => {
  if (!updatedValue) return;

  let keys = Object.keys(updatedValue) as Array<keyof MpoReview>;

  // if review is deleted, only check role for ONLY user generated keys
  if (isDeleted) {
    keys = keys.filter((key) => {
      const metadata = mpoReviewMetadata.find((m) => m.key === key);
      return !metadata.isSystemGeneratedField;
    });
  }

  keys.forEach((key) => {
    const updatedKeyValue = updatedValue?.[key];
    const storedKeyValue = storedValue?.[key];
    const metadata = mpoReviewMetadata.find((m) => m.key === key);

    validateRoleForFormField(
      metadata,
      updatedKeyValue,
      storedKeyValue,
      userType,
      `review.mpo.${key}`,
    );
  });
};
