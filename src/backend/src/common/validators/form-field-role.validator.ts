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
  metadata = { isRichText: false, type: 'text', ...metadata }; // assigning defaults; gets overridden if provided with metadata

  // Fist save checks
  if (storedValue === undefined) {
    if (metadata.type === 'text' && updatedValue === '') return; // Allow empty strings on first save

    if (updatedValue === null) return; // Allow nulls for other types
  }

  // Checking primitives matching;
  // TO introduce object matching, if needed
  if (updatedValue === storedValue) return; // if value is not updated by the current user;

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
