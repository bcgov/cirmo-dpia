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
import { piaStatusMetadata } from '../metadata/pia-status.metadata';
import { validateConditionsAny } from './validate-conditions';

const throwStatusChangeError = (errorMessage: string, errors?: string[]) => {
  throw new ForbiddenException({
    message: `Status change denied: ${errorMessage}`,
    errors,
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
  if (!updatedStatus || updatedStatus === storedStatus) return;

  // first status of PIA should be Drafting In Progress
  if (
    storedStatus === null &&
    updatedStatus !== PiaIntakeStatusEnum.DRAFTING_IN_PROGRESS
  ) {
    throwStatusChangeError('Cannot move a fresh PIA to an Incomplete status');
  }

  // handle status change actions
  const storedStatusMetadata = piaStatusMetadata?.[storedStatus];

  if (!storedStatusMetadata) return; // TODO: VALIDATIONS TO BE ADDED SOON

  const statusTransition = storedStatusMetadata?.transition?.[updatedStatus];

  if (!statusTransition?.allow) {
    throwStatusChangeError(
      `Cannot change status of this PIA to ${updatedStatus}`,
    );
  }

  const updatedEntity: PiaIntakeEntity = { ...storedValue, ...updatedValue };

  // check if any condition is fulfilled entirely
  const { isSatisfied, errors } = validateConditionsAny(
    statusTransition?.conditions,
    accessType,
    piaType,
    updatedEntity,
  );

  if (isSatisfied === false) {
    throwStatusChangeError('Failed to satisfy the required conditions', errors);
  }

  if (statusTransition?.actions?.length > 0) {
    statusTransition.actions.forEach((action) => {
      if (action.type === 'update') {
        updatedValue[action.key] = action.value;
      }
    });
  }
};
