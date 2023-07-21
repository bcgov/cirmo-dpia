import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { UpdatePiaIntakeDto } from 'src/modules/pia-intake/dto/update-pia-intake.dto';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import * as checkUpdatePermissions from 'src/modules/pia-intake/helper/check-update-permissions';
import * as validateConditions from 'src/modules/pia-intake/helper/validate-conditions';
import { handlePiaUpdates } from 'src/modules/pia-intake/helper/handle-pia-updates';

import { piaIntakeEntityMock } from 'test/util/mocks/data/pia-intake.mock';

describe('`handlePiaUpdates` method', () => {
  const checkUpdatePermissionsSpy = jest
    .spyOn(checkUpdatePermissions, 'checkUpdatePermissions')
    .mockReturnValue(false);
  const validateConditionsAnySpy = jest
    .spyOn(validateConditions, 'validateConditionsAny')
    .mockReturnValue({ isSatisfied: false, errors: [] });

  beforeEach(() => {
    checkUpdatePermissionsSpy.mockClear();
    validateConditionsAnySpy.mockClear();
  });

  it('throw error when the status metadata is not available', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      title: 'updated title',
      saveId: 1,
      status: 'RANDOM_FAKE_STATUS' as PiaIntakeStatusEnum,
    };

    const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

    try {
      handlePiaUpdates(
        updatedValue,
        storedValue,
        [UserTypesEnum.DRAFTER],
        PiaTypesEnum.STANDARD,
      );
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }

    expect(checkUpdatePermissionsSpy).not.toBeCalled();
    expect(validateConditionsAnySpy).not.toBeCalled();
  });

  it('passes, but does not validate when there are no update keys provided other than status, and saveId', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      saveId: 1,
      status: PiaIntakeStatusEnum.COMPLETE,
    };

    const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

    const result = handlePiaUpdates(
      updatedValue,
      storedValue,
      [UserTypesEnum.DRAFTER],
      PiaTypesEnum.STANDARD,
    );

    expect(checkUpdatePermissionsSpy).not.toBeCalled();
    expect(validateConditionsAnySpy).not.toBeCalled();

    expect(result).toBeUndefined();
  });

  it('fails and throw Forbidden exception when updates are not allowed in the status', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      saveId: 1,
      status: PiaIntakeStatusEnum.INCOMPLETE,
      title: 'TEST',
    };

    const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

    checkUpdatePermissionsSpy.mockReturnValue(false);

    try {
      handlePiaUpdates(
        updatedValue,
        storedValue,
        [UserTypesEnum.DRAFTER],
        PiaTypesEnum.STANDARD,
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }

    expect(checkUpdatePermissionsSpy).toBeCalledWith({
      status: PiaIntakeStatusEnum.INCOMPLETE,
      updatedPiaKeys: ['title'],
    });
    expect(validateConditionsAnySpy).not.toBeCalled();
  });

  it('fails and throw Forbidden exception when updates are ALLOWED in the status, BUT one of the condition NOT met', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      saveId: 1,
      status: PiaIntakeStatusEnum.INCOMPLETE,
      title: 'TEST',
    };

    const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

    checkUpdatePermissionsSpy.mockReturnValue(true);
    validateConditionsAnySpy.mockReturnValue({
      isSatisfied: false,
      errors: [],
    });

    try {
      handlePiaUpdates(
        updatedValue,
        storedValue,
        [UserTypesEnum.DRAFTER],
        PiaTypesEnum.STANDARD,
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }

    expect(checkUpdatePermissionsSpy).toBeCalledWith({
      status: PiaIntakeStatusEnum.INCOMPLETE,
      updatedPiaKeys: ['title'],
    });
    expect(validateConditionsAnySpy).toBeCalled();
  });

  it('passes and performs validations when changes are allowed and conditions are met', () => {
    const updatedValue: UpdatePiaIntakeDto = {
      status: PiaIntakeStatusEnum.INCOMPLETE,
      title: 'TEST',
      saveId: 1,
    };

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
    };

    checkUpdatePermissionsSpy.mockReturnValue(true);
    validateConditionsAnySpy.mockReturnValue({
      isSatisfied: true,
      errors: [],
    });

    const result = handlePiaUpdates(
      updatedValue,
      storedValue,
      [UserTypesEnum.DRAFTER],
      PiaTypesEnum.STANDARD,
    );

    expect(checkUpdatePermissionsSpy).toBeCalledWith({
      status: PiaIntakeStatusEnum.INCOMPLETE,
      updatedPiaKeys: ['title'],
    });
    expect(validateConditionsAnySpy).toBeCalled();

    expect(result).toBeUndefined(); // no error
  });
});
