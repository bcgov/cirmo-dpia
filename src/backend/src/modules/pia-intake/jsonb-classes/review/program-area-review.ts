import { IsArray, IsObject, IsOptional } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';
import {
  ProgramAreaSelectedRolesReview,
  validateRoleForSelectedRoleReviews,
} from './programArea/programAreaSelectedRoleReviews';

export class ProgramAreaReview {
  @IsArray()
  selectedRoles: string[];

  @IsObject()
  @IsOptional()
  reviews?: Record<string, ProgramAreaSelectedRolesReview>;
}

export const selectedRolesMetadata: IFormField<ProgramAreaReview> = {
  key: 'selectedRoles',
  type: 'text',
  allowedUserTypesEdit: [UserTypesEnum.MPO, UserTypesEnum.CPO],
};

export const validateRoleForProgramAreaReview = (
  updatedValue: ProgramAreaReview,
  storedValue: ProgramAreaReview,
  userType: UserTypesEnum[],
) => {
  if (!updatedValue) return;

  //
  // selectedRoles
  //
  const updatedSelectedRolesKeyValue = updatedValue?.selectedRoles;
  const storedSelectedRolesKeyValue = storedValue?.selectedRoles;

  // validate every role inside selectedRoles
  updatedSelectedRolesKeyValue?.forEach((val, i) => {
    validateRoleForFormField(
      selectedRolesMetadata,
      val,
      storedSelectedRolesKeyValue?.[i],
      userType,
      `review.programArea.selectedRoles`,
    );
  });

  //
  // selectedRoleReviews
  //
  const updatedReviews = updatedValue?.reviews;
  const storedReviews = storedValue?.reviews;

  if (!updatedReviews) return;

  Object.keys(updatedReviews).forEach((role) => {
    validateRoleForSelectedRoleReviews(
      updatedReviews?.[role],
      storedReviews?.[role],
      userType,
      `review.programArea.reviews.${role}`,
    );
  });
};
