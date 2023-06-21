/**
 * @method handlePiaStatusChange
 * @description handle transitions of status-metadata
 */

import { ForbiddenException } from '@nestjs/common';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { CreatePiaIntakeDto } from '../dto/create-pia-intake.dto';
import { UpdatePiaIntakeDto } from '../dto/update-pia-intake.dto';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';
import { statusMetadata } from '../metadata/pia-status.metadata';

const throwStatusChangeError = (errorMessage?: string) => {
  const message = errorMessage || 'Cannot change status of the PIA';

  throw new ForbiddenException({
    message: `Status change denied: ${message}`,
  });
};

export const handlePiaStatusChange = (
  updatedValue: CreatePiaIntakeDto | UpdatePiaIntakeDto,
  storedValue: PiaIntakeEntity,
  accessType: UserTypesEnum[],
  piaType: PiaTypesEnum,
) => {
  const storedStatus = storedValue?.status;
  const updatedStatus = updatedValue?.status;

  // No status change // no action
  if (updatedStatus === storedStatus) return;

  // first status of PIA should be INCOMPLETE
  if (
    storedStatus === null &&
    updatedStatus !== PiaIntakeStatusEnum.INCOMPLETE
  ) {
    throwStatusChangeError('Cannot move a fresh PIA to an Incomplete status');
  }

  // handle status change actions
  const storedStatusMetadata = statusMetadata?.[storedStatus];

  if (!storedStatusMetadata) return; // TODO: VALIDATIONS TO BE ADDED SOON

  const statusTransition = storedStatusMetadata?.transition?.[updatedStatus];

  if (!statusTransition?.allow) {
    throwStatusChangeError();
  }

  if (statusTransition?.conditions?.length > 0) {
    const updatedEntity: PiaIntakeEntity = { ...storedValue, ...updatedValue };

    // check for conditions
    const conditions = statusTransition?.conditions;

    // check if any condition is fulfilled entirely
    const isSatisfied = conditions.some((condition) => {
      const keys = Object.keys(condition);

      return keys.every((key) => {
        switch (key) {
          case 'accessType':
            return (
              condition?.accessType?.filter((access) =>
                accessType.includes(access),
              ).length > 0
            );
          case 'piaType':
            return condition?.piaType.includes(piaType);

          default:
            return condition?.[key]?.includes(updatedEntity?.[key]);
        }
      });
    });

    if (!isSatisfied) {
      throwStatusChangeError();
    }
  }

  if (statusTransition?.actions?.length > 0) {
    statusTransition.actions.forEach((action) => {
      if (action.type === 'update') {
        updatedValue[action.key] = action.value;
      }
    });
  }
};
