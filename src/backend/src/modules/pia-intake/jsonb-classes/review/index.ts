import { IsObject, IsOptional, ValidateNested } from '@nestjs/class-validator';
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
  validateRoleForMpoReview(
    updatedValue?.mpo,
    storedValue?.mpo,
    userType,
    `review.mpo`,
    loggedInUser,
  );

  //
  // cpo validations
  //
  const allKeys = new Set<string>();
  Object.keys(updatedValue?.cpo || {}).forEach((key) => allKeys.add(key));
  Object.keys(storedValue?.cpo || {}).forEach((key) => allKeys.add(key));

  Array.from(allKeys).forEach((userId) => {
    validateRoleForCpoReview(
      updatedValue?.cpo?.[userId],
      storedValue?.cpo?.[userId],
      userType,
      `review.cpo.${userId}`,
      loggedInUser,
    );
  });
};
