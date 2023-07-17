import { ForbiddenException } from '@nestjs/common';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { isDeepStrictEqual } from 'util';
import { UpdatePiaIntakeDto } from '../dto/update-pia-intake.dto';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { piaStatusMetadata } from '../metadata/pia-status.metadata';
import { validateConditionsAny } from './validate-conditions';

export const handlePiaUpdates = (
  updatedValue: UpdatePiaIntakeDto,
  storedValue: PiaIntakeEntity,
  accessType: UserTypesEnum[],
  piaType: PiaTypesEnum,
) => {
  const errorMessage =
    'Operation Restricted: Changes not allowed in this status';

  // extract updated fields except status from the DTO; Handle Status changes to be done separately as part of handle-pia-status-change.ts
  const { status: updatedStatus, saveId, ...updates } = updatedValue;

  const status = updatedStatus || storedValue.status;

  const statusMetadata = piaStatusMetadata?.[status];

  if (!statusMetadata) return; // TODO: VALIDATIONS TO BE ADDED SOON

  // no field updates requested
  if (Object.keys(updates).length === 0) return;

  const hasUpdates = !Object.keys(updates || {}).every((key) =>
    isDeepStrictEqual(updates[key], storedValue?.[key]),
  );

  // when no updates
  if (!hasUpdates) {
    return;
  }

  if (statusMetadata?.updates?.allow === false) {
    throw new ForbiddenException({
      message: errorMessage,
    });
  }

  // check conditions
  const { isSatisfied, errors } = validateConditionsAny(
    statusMetadata?.updates?.conditions,
    accessType,
    piaType,
    { ...storedValue, ...updatedValue },
  );

  if (isSatisfied === false) {
    throw new ForbiddenException({
      status,
      errors,
      message:
        'Operation Forbidden: Updates did not satisfy the required conditions in the current status',
    });
  }
};
