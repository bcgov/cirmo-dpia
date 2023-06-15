import { IsObject, IsOptional, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { UserTypesEnum } from 'src/common/enums/users.enum';
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
}

/**
 * @method validateRoleForReview
 * Validate roles and form fields inside the review object
 */
export const validateRoleForReview = (
  updatedValue: Review,
  storedValue: Review,
  userType: UserTypesEnum[],
) => {
  if (!updatedValue) return;

  // program area validations
  validateRoleForProgramAreaReview(
    updatedValue?.programArea,
    storedValue?.programArea,
    userType,
  );

  // mpo validations
  validateRoleForMpoReview(updatedValue?.mpo, storedValue?.mpo, userType);
};
