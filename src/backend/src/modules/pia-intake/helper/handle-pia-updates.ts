import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { deepEqual } from 'src/common/utils/objectComparison';
import { UpdatePiaIntakeDto } from '../dto/update-pia-intake.dto';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { piaStatusMetadata } from '../metadata/pia-status.metadata';
import { checkUpdatePermissions } from './check-update-permissions';
import { validateConditionsAny } from './validate-conditions';

/**
 * This method validates all PIA changes, except status movements; which is taken care by `handlePiaStatusChange`
 */
export const handlePiaUpdates = (
  updatedValue: UpdatePiaIntakeDto,
  storedValue: PiaIntakeEntity,
  accessType: UserTypesEnum[],
  piaType: PiaTypesEnum,
) => {
  // extract updated fields except status from the DTO; Handle Status changes to be done separately as part of handle-pia-status-change.ts
  const {
    status: updatedStatus,
    saveId,
    ...updates // this contains the type of IUpdateOverrides.pia
  }: UpdatePiaIntakeDto = updatedValue;

  const status = updatedStatus || storedValue.status;

  const statusMetadata = piaStatusMetadata?.[status];

  if (!statusMetadata) {
    throw new BadRequestException({
      status,
      message: 'Bad Request: Invalid status',
    });
  }

  const updatedKeys: Array<keyof typeof updates> = [];

  Object.keys(updates || {}).forEach((key: keyof typeof updates) => {
    const isEqual = deepEqual(updates[key], storedValue?.[key]);

    if (!isEqual) {
      updatedKeys.push(key);
    }
  });

  // when no updates
  if (updatedKeys.length === 0) {
    return;
  }

  const allowUpdates = checkUpdatePermissions({
    status,
    updatedPiaKeys: updatedKeys,
  });

  if (!allowUpdates) {
    throw new ForbiddenException({
      message: 'Operation Restricted: Changes not allowed in this status',
    });
  }

  // check conditions
  const { isSatisfied, errors } = validateConditionsAny(
    statusMetadata?.updates?.conditions,
    accessType,
    piaType,
    { ...storedValue, ...updatedValue },
  );

  // explicitly checking for false [when at-least one condition is not met]
  if (isSatisfied === false) {
    throw new ForbiddenException({
      status,
      errors,
      message:
        'Operation Forbidden: Updates did not satisfy the required conditions in the current status',
    });
  }
};
