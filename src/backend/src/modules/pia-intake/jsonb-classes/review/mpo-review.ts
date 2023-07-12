import { IsBoolean } from '@nestjs/class-validator';
import { BadRequestException } from '@nestjs/common';
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
  },
  {
    key: 'reviewNote',
    type: 'text',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
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

export const validateRoleForMpoReview = (
  updatedValue: MpoReview,
  storedValue: MpoReview,
  userType: UserTypesEnum[],
) => {
  if (!updatedValue) return;

  const keys = Object.keys(updatedValue) as Array<keyof MpoReview>;

  keys.forEach((key) => {
    const updatedKeyValue = updatedValue?.[key];
    const storedKeyValue = storedValue?.[key];
    const metadata = mpoReviewMetadata.find((m) => m.key === key);

    // override class-validator checks
    // REVIEW_NOTE is REQUIRED when Delegated PIA
    if (key === 'reviewNote' && !updatedValue?.[key]) {
      throw new BadRequestException({
        path: `review.mpo.${key}`,
        message: 'Bad Request: Missing MPO Review note',
      });
    }

    validateRoleForFormField(
      metadata,
      updatedKeyValue,
      storedKeyValue,
      userType,
      `review.mpo.${key}`,
    );
  });
};
