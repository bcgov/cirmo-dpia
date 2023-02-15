import { ForbiddenException } from '@nestjs/common';
import { UserTypesEnum } from '../enums/users.enum';
import { IFormField } from '../interfaces/form-field.interface';

/**
 * @method validateRoleForFormField
 *
 * @description
 * This method validates role access to Form Fields values
 */
export const validateRoleForFormField = <T>(
  metadata: IFormField<T>,
  updatedValue: any,
  storedValue: any,
  userType: UserTypesEnum,
  path: string,
) => {
  if (!updatedValue) return; // if value not edited - no need to validate permissions

  if (typeof updatedValue === 'string' && updatedValue === storedValue) return; // if value is not updated by the current user;

  if (!metadata?.allowedUserTypesEdit) return; // if allowedUserTypesEdit is null, all roles can edit this field/key

  if (
    metadata.allowedUserTypesEdit.includes(UserTypesEnum.MPO) &&
    userType !== UserTypesEnum.MPO
  ) {
    // if allowed user types is MPO and the user is not an MPO user, throw error
    throw new ForbiddenException({
      path: path,
      message: `You do not have permissions to edit certain section of this document. Please reach out to your MPO to proceed.`,
    });
  }

  // allow otherwise
  return;
};
