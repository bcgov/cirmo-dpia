import { ForbiddenException } from '@nestjs/common';
import { UpdatePiaIntakeDto } from '../dto/update-pia-intake.dto';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';
import { piaStatusMetadata } from '../metadata/pia-status.metadata';

export const handlePiaUpdates = (
  updatedValue: UpdatePiaIntakeDto,
  storedValue: PiaIntakeEntity,
) => {
  // extract updated fields except status from the DTO; Handle Status changes to be done separately as part of handle-pia-status-change.ts
  const { status: updatedStatus, saveId, ...updates } = updatedValue;

  const status = updatedStatus || storedValue.status;

  const statusMetadata = piaStatusMetadata?.[status];

  if (!statusMetadata) return; // TODO: VALIDATIONS TO BE ADDED SOON

  // no field updates requested
  if (Object.keys(updates).length === 0) return;

  if (statusMetadata?.updates?.allow === false) {
    throw new ForbiddenException({
      message: 'Changes not allowed in this status',
    });
  }
};
