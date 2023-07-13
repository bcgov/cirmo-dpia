import { InternalServerErrorException } from '@nestjs/common';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { ICondition } from '../metadata/pia-status.metadata';
import { validateAllFields } from './check-field-validations';

/**
 *
 * @returns
 * null -> when there is no condition to check
 * true -> when at-least one of the condition is met
 * false -> when none of the provided conditions is met
 *
 */
export const validateConditionsAny = (
  conditions: ICondition[],
  accessType: UserTypesEnum[],
  piaType: PiaTypesEnum,
  piaEntity: PiaIntakeEntity,
) => {
  if ((conditions || []).length === 0) return; // no conditions to check

  if (!accessType || !piaType || !piaEntity) {
    throw new InternalServerErrorException({
      message: 'Missing validation arguments',
    });
  }

  const isSatisfied = conditions.some((condition) => {
    const keys = Object.keys(condition);

    return keys.every((key) => {
      console.log(key);
      switch (key) {
        case 'accessType':
          return (
            condition?.accessType?.filter((access) =>
              accessType.includes(access),
            ).length > 0
          );
        case 'piaType':
          return condition?.piaType.includes(piaType);

        case 'fieldValidations':
          return validateAllFields(condition?.fieldValidations, piaEntity);

        default:
          return condition?.[key]?.includes(piaEntity?.[key]);
      }
    });
  });

  return isSatisfied;
};
