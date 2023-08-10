import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ForbiddenException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';

export class RoleReview {
  @IsBoolean()
  @IsOptional()
  isAcknowledged?: boolean;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  reviewNote?: string;

  @IsString()
  @IsOptional()
  reviewedByDisplayName?: string;

  @IsString()
  @IsOptional()
  reviewedByUsername?: string;

  @IsString()
  @IsOptional()
  reviewedByGuid?: string;

  @IsDateString()
  @IsOptional()
  reviewedAt?: Date;

  @IsDateString()
  @IsOptional()
  reviewLastUpdatedAt?: Date;

  // untouched records
  static isReviewPristine(updatedValue: RoleReview, storedValue: RoleReview) {
    return !updatedValue && !storedValue;
  }

  static validateReviewDelete(
    updatedValue: RoleReview,
    storedValue: RoleReview,
    loggedInUser: KeycloakUser,
    path: string,
  ) {
    let isDeleted = false;

    if (!updatedValue && storedValue) {
      isDeleted = true; // when review is deleted, only check roles of NON-system generated values

      // check if user only deletes/removes reviews he only left
      if (storedValue.reviewedByGuid !== loggedInUser?.idir_user_guid) {
        throw new ForbiddenException({
          message: 'User is not allowed to remove review for the path',
          path,
        });
      }
    }

    return isDeleted;
  }

  static validateRoleForReview<T extends RoleReview>(
    updatedValue: T,
    storedValue: T,
    userType: UserTypesEnum[],
    path: string,
    loggedInUser: KeycloakUser,
    metadata: Array<IFormField<T>>,
  ) {
    if (RoleReview.isReviewPristine(updatedValue, storedValue)) return;

    const isReviewDeleted = RoleReview.validateReviewDelete(
      updatedValue,
      storedValue,
      loggedInUser,
      path,
    );

    const keySet = new Set();
    Object.keys(updatedValue || {}).forEach((key) => keySet.add(key));
    Object.keys(storedValue || {}).forEach((key) => keySet.add(key));

    let keys = Array.from(keySet) as Array<keyof T>;

    // if review is deleted, only check role for ONLY user generated keys
    if (isReviewDeleted) {
      keys = keys.filter((key) => {
        const meta = metadata.find((m) => m.key === key);
        return !meta.isSystemGeneratedField;
      });
    }

    keys.forEach((key) => {
      const updatedKeyValue = updatedValue?.[key];
      const storedKeyValue = storedValue?.[key];
      const meta = metadata.find((m) => m.key === key);

      validateRoleForFormField(
        meta,
        updatedKeyValue,
        storedKeyValue,
        userType,
        `${path}.${key as string}`,
      );
    });
  }
}
