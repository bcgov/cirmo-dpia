import { IsArray, IsObject, IsOptional } from '@nestjs/class-validator';
import { ForbiddenException } from '@nestjs/common';
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

  // no records
  if (!updatedReviews && !storedReviews) return;

  const updatedReviewers = Object.keys(updatedReviews || {});
  const storedReviewers = Object.keys(storedReviews || {});

  // check role access for reviews that are cleared / removed reviews
  // check role for non-system generated values
  const deletedReviewers = storedReviewers.filter((r) => {
    return (
      !updatedReviewers.includes(r) || // when the role key does not exist at all
      !updatedReviews[r] // or when the key exists, but null or undefined
    );
  });

  deletedReviewers.forEach((role) => {
    // check if user only deletes/removes reviews he only left
    if (
      storedReviews?.[role]?.reviewedByGuid !== loggedInUser?.idir_user_guid
    ) {
      throw new ForbiddenException({
        message: 'User is not allowed to remove review for the path',
        path: `review.programArea.reviews.${role}`,
      });
    }

    // check for role considerations of the user
    validateRoleForSelectedRoleReviews(
      updatedReviews?.[role],
      storedReviews?.[role],
      userType,
      `review.programArea.reviews.${role}`,
      true,
    );
  });

  // check role access for reviews that are updated or added
  updatedReviewers
    .filter((r) => !deletedReviewers.includes(r)) // filter deleted / nullified reviews
    .forEach((role) => {
      validateRoleForSelectedRoleReviews(
        updatedReviews?.[role],
        storedReviews?.[role],
        userType,
        `review.programArea.reviews.${role}`,
      );
    });
};
