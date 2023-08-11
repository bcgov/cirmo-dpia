import { IsArray, IsObject, IsOptional } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
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
  loggedInUser: KeycloakUser,
) => {
  if (!updatedValue && !storedValue) return;

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

  const allKeys = new Set<string>();
  Object.keys(updatedReviews || {}).forEach((key) => allKeys.add(key));
  Object.keys(storedReviews || {}).forEach((key) => allKeys.add(key));

  // check role access for reviews that are updated or added
  Array.from(allKeys).forEach((role) => {
    validateRoleForSelectedRoleReviews(
      updatedReviews?.[role],
      storedReviews?.[role],
      userType,
      `review.programArea.reviews.${role}`,
      loggedInUser,
    );
  });
};
