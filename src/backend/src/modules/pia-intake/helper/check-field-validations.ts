import { BadRequestException } from '@nestjs/common';
import { SizeEnum } from 'src/common/enums/size.enum';
import { getNested } from 'src/common/helpers/get-nested-helper';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import {
  IFieldValidation,
  IFieldValidationsByPath,
} from '../metadata/pia-status.metadata';

const validateRequired = (value, path: string) => {
  if (!value) {
    throw new BadRequestException({
      path,
      message: 'Bad Request: missing value for the path ',
    });
  }

  return true;
};

const validateSize = (value, path: string, size: SizeEnum) => {
  switch (size) {
    case SizeEnum.AT_LEAST_ONE:
      if (Array.isArray(value) && value.length > 0) return true; // validation ok
  }

  throw new BadRequestException({
    path,
    message: 'Bad Request: path should have at-least one value',
  });
};

export const checkFieldValidationsByPath = (
  path: string,
  fieldValidation: IFieldValidation,
  piaEntity: PiaIntakeEntity,
) => {
  const value = getNested(path, piaEntity);

  if (fieldValidation?.required) {
    validateRequired(value, path);
  }

  if (fieldValidation?.size) {
    validateSize(value, path, fieldValidation?.size);
  }

  return true;
};

export const validateAllFields = (
  fieldValidations: IFieldValidationsByPath,
  piaEntity: PiaIntakeEntity,
) => {
  if (Object.keys(Object(fieldValidations)).length === 0) return; // nothing to validate

  return Object.keys(fieldValidations).every((path) =>
    checkFieldValidationsByPath(path, fieldValidations[path], piaEntity),
  );
};
