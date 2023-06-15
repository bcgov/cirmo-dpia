import { IsBoolean, IsString } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';

export class MpoReview {
  @IsBoolean()
  isAcknowledged: boolean;

  @IsString()
  reviewNote: string;
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

    validateRoleForFormField(
      metadata,
      updatedKeyValue,
      storedKeyValue,
      userType,
      `review.mpo.${key}`,
    );
  });
};
