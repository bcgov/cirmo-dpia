import { ForbiddenException } from '@nestjs/common';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { UpdatePiaIntakeDto } from 'src/modules/pia-intake/dto/update-pia-intake.dto';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import { handlePiaStatusChange } from 'src/modules/pia-intake/helper/handle-pia-status-change';
import { piaIntakeEntityMock } from 'test/util/mocks/data/pia-intake.mock';

describe(`handlePiaStatusChange method`, () => {
  it('succeeds to delete review section of a Delegate PIA if MPO changes status from FINAL_REVIEW to INCOMPLETE', async () => {
    const userType: Array<UserTypesEnum> = [UserTypesEnum.MPO];

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      review: {
        // random review to be deleted
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD',
        },
        programArea: {
          selectedRoles: ['Manager'],
        },
      },
      saveId: 10,
      status: PiaIntakeStatusEnum.FINAL_REVIEW,
    };

    const updatedValue: UpdatePiaIntakeDto = {
      status: PiaIntakeStatusEnum.INCOMPLETE,
      saveId: 10,
      review: {
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD2',
        },
        programArea: {
          selectedRoles: ['Manager2'],
        },
      },
    };

    handlePiaStatusChange(
      updatedValue,
      storedValue,
      userType,
      PiaTypesEnum.DELEGATE_REVIEW,
    );

    expect(updatedValue.review).toBe(null); // explicitly updating review field to null
  });

  it('succeeds to delete review section of a DELEGATE PIA if MPO changes status from FINAL_REVIEW to EDIT_IN_PROGRESS', async () => {
    const userType: Array<UserTypesEnum> = [UserTypesEnum.MPO];

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      review: {
        // random review to be deleted
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD',
        },
        programArea: {
          selectedRoles: ['Manager'],
        },
      },
      saveId: 10,
      status: PiaIntakeStatusEnum.FINAL_REVIEW,
    };

    const updatedValue: UpdatePiaIntakeDto = {
      status: PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
      saveId: 10,
      review: {
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD2',
        },
        programArea: {
          selectedRoles: ['Manager2'],
        },
      },
    };

    handlePiaStatusChange(
      updatedValue,
      storedValue,
      userType,
      PiaTypesEnum.DELEGATE_REVIEW,
    );

    expect(updatedValue.review).toBe(null);
  });

  it('succeeds, but DOES NOT delete review section of a DELEGATE PIA if MPO changes status from FINAL_REVIEW to MPO_REVIEW', async () => {
    const userType: Array<UserTypesEnum> = [UserTypesEnum.MPO];

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      review: {
        // random review to be deleted
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD',
        },
        programArea: {
          selectedRoles: ['Manager'],
        },
      },
      saveId: 10,
      status: PiaIntakeStatusEnum.FINAL_REVIEW,
    };

    const updatedValue: UpdatePiaIntakeDto = {
      status: PiaIntakeStatusEnum.MPO_REVIEW,
      saveId: 10,
      review: {
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD2',
        },
        programArea: {
          selectedRoles: ['Manager2'],
        },
      },
    };

    handlePiaStatusChange(
      updatedValue,
      storedValue,
      userType,
      PiaTypesEnum.DELEGATE_REVIEW,
    );

    expect(updatedValue.review).not.toBe(null);
  });

  it('fails and DOES NOT delete review section of a delegate PIA if user OTHER THAN MPO changes status from FINAL_REVIEW to INCOMPLETE', async () => {
    const userType: Array<UserTypesEnum> = [UserTypesEnum.CPO];

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      review: {
        // random review to be deleted
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD',
        },
        programArea: {
          selectedRoles: ['Manager'],
        },
      },
      saveId: 10,
      status: PiaIntakeStatusEnum.FINAL_REVIEW,
    };

    const updatedValue: UpdatePiaIntakeDto = {
      status: PiaIntakeStatusEnum.INCOMPLETE,
      saveId: 10,
      review: {
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD2',
        },
        programArea: {
          selectedRoles: ['Manager2'],
        },
      },
    };

    try {
      handlePiaStatusChange(
        updatedValue,
        storedValue,
        userType,
        PiaTypesEnum.DELEGATE_REVIEW,
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('succeeds and DOES NOT delete review section of a delegate PIA if user OTHER THAN MPO changes status from FINAL_REVIEW to EDIT_IN_PROGRESS', async () => {
    const userType: Array<UserTypesEnum> = [UserTypesEnum.DRAFTER];

    const storedValue: PiaIntakeEntity = {
      ...piaIntakeEntityMock,
      review: {
        // random review to be deleted
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD',
        },
        programArea: {
          selectedRoles: ['Manager'],
        },
      },
      saveId: 10,
      status: PiaIntakeStatusEnum.FINAL_REVIEW,
    };

    const updatedValue: UpdatePiaIntakeDto = {
      status: PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
      saveId: 10,
      review: {
        mpo: {
          isAcknowledged: true,
          reviewNote: 'ABCD2023',
        },
        programArea: {
          selectedRoles: ['Manager2'],
        },
      },
    };

    try {
      handlePiaStatusChange(
        updatedValue,
        storedValue,
        userType,
        PiaTypesEnum.DELEGATE_REVIEW,
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });
});
