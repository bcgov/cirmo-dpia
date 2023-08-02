import { IsObject, IsOptional, ValidateNested } from '@nestjs/class-validator';
import { ForbiddenException } from '@nestjs/common';
import { Type } from 'class-transformer';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { CpoReview, validateRoleForCpoReview } from './cpo-review';
import { MpoReview, validateRoleForMpoReview } from './mpo-review';
import {
  ProgramAreaReview,
  validateRoleForProgramAreaReview,
} from './program-area-review';

export class Review {
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramAreaReview)
  programArea?: ProgramAreaReview;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => MpoReview)
  mpo?: MpoReview;

  @IsObject()
  @IsOptional()
  cpo?: Record<string, CpoReview>;
}

/**
 * @method validateRoleForReview
 * Validate roles and form fields inside the review object
 */
export const validateRoleForReview = (
  updatedValue: Review,
  storedValue: Review,
  userType: UserTypesEnum[],
  loggedInUser: KeycloakUser,
) => {
  if (!updatedValue && !storedValue) return;

  //
  // program area validations
  //
  validateRoleForProgramAreaReview(
    updatedValue?.programArea,
    storedValue?.programArea,
    userType,
    loggedInUser,
  );

  //
  // mpo validations
  //
  let isMpoReviewDeleted = false;

  if (!updatedValue?.mpo && storedValue?.mpo) {
    isMpoReviewDeleted = true;

    if (updatedValue?.mpo?.reviewedByGuid !== loggedInUser.idir_user_guid) {
      new ForbiddenException({
        message: 'User is not allowed to remove review for the path',
        path: `review.mpo`,
      });
    }
  }

  validateRoleForMpoReview(
    updatedValue?.mpo,
    storedValue?.mpo,
    userType,
    isMpoReviewDeleted,
  );

  //
  // cpo validations
  //
  const updatedCpoReviews = updatedValue?.cpo;
  const storedCpoReviews = storedValue?.cpo;

  // no records
  if (!updatedCpoReviews && !storedCpoReviews) return;

  const updatedReviewers = Object.keys(updatedCpoReviews || {});
  const storedReviewers = Object.keys(storedCpoReviews || {});

  // check role access for reviews that are cleared / removed reviews
  // check role for non-system generated values
  const deletedReviewers = storedReviewers.filter((r) => {
    return (
      !updatedReviewers.includes(r) || // when the role key does not exist at all
      !updatedCpoReviews[r] // or when the key exists, but null or undefined
    );
  });

  deletedReviewers.forEach((userId) => {
    // check if user only deletes/removes reviews he only left
    if (
      storedCpoReviews?.[userId]?.reviewedByGuid !==
      loggedInUser?.idir_user_guid
    ) {
      new ForbiddenException({
        message: 'User is not allowed to remove review for the path',
        path: `review.cpo.${userId}`,
      });
    }

    // check for role considerations of the user
    validateRoleForCpoReview(
      updatedCpoReviews?.[userId],
      storedCpoReviews?.[userId],
      userType,
      `review.cpo.${userId}`,
      true,
    );
  });

  // check role access for reviews that are updated or added
  updatedReviewers
    .filter((r) => !deletedReviewers.includes(r)) // filter deleted / nullified reviews
    .forEach((userId) => {
      validateRoleForCpoReview(
        updatedCpoReviews?.[userId],
        storedCpoReviews?.[userId],
        userType,
        `review.cpo.${userId}`,
      );
    });
};
