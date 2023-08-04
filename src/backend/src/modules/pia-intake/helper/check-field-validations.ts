import { SizeEnum } from 'src/common/enums/size.enum';
import { getNested } from 'src/common/helpers/get-nested-helper';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import {
  IFieldValidation,
  IFieldValidationsByPath,
} from '../metadata/pia-status.metadata';

const validateRequired = (value, path: string, errors?: string[]) => {
  if (!value) {
    errors?.push(`missing value for the path: ${path}`);
    return false;
  }

  return true;
};

const validateSize = (
  value,
  path: string,
  size: SizeEnum,
  errors?: string[],
) => {
  switch (size) {
    case SizeEnum.AT_LEAST_ONE:
      if (Array.isArray(value) && value.length > 0) return true; // validation ok
      break;
    case SizeEnum.ALL:
      if (Array.isArray(value) && value.length > 0) {
        return value.every((v) => v.isAcknowledged === true);
      }
      break;
  }

  errors?.push(`path: ${path} should have at-least one value`);
  return false;
};

export const checkFieldValidationsByPath = (
  path: string,
  fieldValidation: IFieldValidation,
  piaEntity: PiaIntakeEntity,
  errors?: string[],
) => {
  const value = getNested(path, piaEntity);

  if (fieldValidation?.required) {
    return validateRequired(value, path, errors);
  }

  if (fieldValidation?.size) {
    return validateSize(value, path, fieldValidation?.size, errors);
  }

  return true;
};

export const validateAllFields = (
  fieldValidations: IFieldValidationsByPath,
  piaEntity: PiaIntakeEntity,
  errors?: string[],
) => {
  if (Object.keys(Object(fieldValidations)).length === 0) return; // nothing to validate

  return Object.keys(fieldValidations).every((path) =>
    checkFieldValidationsByPath(
      path,
      fieldValidations[path],
      piaEntity,
      errors,
    ),
  );
};
