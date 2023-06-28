import { ForbiddenException } from '@nestjs/common';
import { UpdatePiaIntakeDto } from 'src/modules/pia-intake/dto/update-pia-intake.dto';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import { handlePiaUpdates } from 'src/modules/pia-intake/helper/handle-pia-updates';
import { piaIntakeEntityMock } from 'test/util/mocks/data/pia-intake.mock';

describe('`handlePiaUpdates` method', () => {
  it('does not throw error when the status metadata is not available yet', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      title: 'updated title',
      saveId: 1,
    };

    const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

    const result = handlePiaUpdates(updatedValue, storedValue);
    expect(result).toBeUndefined(); // no error
  });

  it('throws an error when the changes are done in a status which does not allow them', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      title: 'updated title',
      saveId: 1,
    };

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      status: PiaIntakeStatusEnum.COMPLETE,
    };

    try {
      handlePiaUpdates(updatedValue, storedValue);
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('passes the above scenario if we only change the status, which is handled in a different method [handlePiaStatusChange]', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      status: PiaIntakeStatusEnum.CPO_REVIEW,
      saveId: 1,
    };

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      status: PiaIntakeStatusEnum.COMPLETE,
    };

    const result = handlePiaUpdates(updatedValue, storedValue);
    expect(result).toBeUndefined(); // no error
  });

  it('allows changes, and does not throw error when changes are done in an allowed status', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      title: 'updated title',
      saveId: 1,
    };

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      status: PiaIntakeStatusEnum.MPO_REVIEW,
    };

    const result = handlePiaUpdates(updatedValue, storedValue);
    expect(result).toBeUndefined(); // no error
  });
});
