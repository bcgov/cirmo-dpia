import { IsArray } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';

export class ProgramAreaReview {
  @IsArray()
  selectedRoles: string[];
}

export const programAreaReviewMetadata: Array<IFormField<ProgramAreaReview>> = [
  {
    key: 'selectedRoles',
    type: 'text',
    allowedUserTypesEdit: [UserTypesEnum.MPO, UserTypesEnum.CPO],
  },
];

export const validateRoleForProgramAreaReview = (
  updatedValue: ProgramAreaReview,
  storedValue: ProgramAreaReview,
  userType: UserTypesEnum[],
) => {
  if (!updatedValue) return;

  const keys = Object.keys(updatedValue) as Array<keyof ProgramAreaReview>;

  keys.forEach((key) => {
    const updatedKeyValue = updatedValue?.[key];
    const storedKeyValue = storedValue?.[key];
    const metadata = programAreaReviewMetadata.find((m) => m.key === key);

    // validate every role inside selectedRoles
    updatedKeyValue.forEach((val, i) => {
      validateRoleForFormField(
        metadata,
        updatedKeyValue?.[i],
        storedKeyValue?.[i],
        userType,
        `review.programArea.${key}`,
      );
    });
  });
};
