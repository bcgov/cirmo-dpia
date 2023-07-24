import { InternalServerErrorException } from '@nestjs/common';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import * as checkFieldValidations from 'src/modules/pia-intake/helper/check-field-validations';
import { validateConditionsAny } from 'src/modules/pia-intake/helper/validate-conditions';
import { ICondition } from 'src/modules/pia-intake/metadata/pia-status.metadata';
import { piaIntakeEntityMock } from 'test/util/mocks/data/pia-intake.mock';

describe('`validateConditionsAny` method', () => {
  const validateAllFieldsSpy = jest
    .spyOn(checkFieldValidations, 'validateAllFields')
    .mockReturnValue(false);

  beforeEach(() => {
    validateAllFieldsSpy.mockClear();
  });

  it('returns empty when conditions array is empty or undefined or null', () => {
    const accessType = [UserTypesEnum.DRAFTER];
    const piaType = PiaTypesEnum.STANDARD;
    const pia = { ...piaIntakeEntityMock };

    expect(validateConditionsAny([], accessType, piaType, pia)).toStrictEqual(
      {},
    );

    expect(validateConditionsAny(null, accessType, piaType, pia)).toStrictEqual(
      {},
    );

    expect(
      validateConditionsAny(undefined, accessType, piaType, pia),
    ).toStrictEqual({});
  });

  it('throws error when other arguments are missing', () => {
    const conditions: ICondition[] = [
      {
        accessType: [UserTypesEnum.DRAFTER],
      },
    ];
    const accessType = [UserTypesEnum.DRAFTER];
    const piaType = PiaTypesEnum.STANDARD;
    const pia = { ...piaIntakeEntityMock };

    try {
      validateConditionsAny(conditions, null, piaType, pia);
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerErrorException);
    }

    try {
      validateConditionsAny(conditions, accessType, null, pia);
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerErrorException);
    }

    try {
      validateConditionsAny(conditions, accessType, piaType, null);
    } catch (e) {
      expect(e).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('fails access type validation and provide errors', () => {
    const conditions: ICondition[] = [
      {
        accessType: [UserTypesEnum.MPO],
        piaType: [PiaTypesEnum.STANDARD],
        fieldValidations: {
          'review.mpo.reviewNote': {
            required: true,
          },
        },
      },
    ];
    const accessType = [UserTypesEnum.DRAFTER];
    const piaType = PiaTypesEnum.STANDARD;
    const pia = { ...piaIntakeEntityMock };

    validateAllFieldsSpy.mockReturnValue(true);

    const { isSatisfied, errors } = validateConditionsAny(
      conditions,
      accessType,
      piaType,
      pia,
    );

    expect(isSatisfied).toBeFalsy();
    expect(errors).toEqual(['Unsatisfactory user access type']);
  });

  it('fails pia type validation and provide errors', () => {
    const conditions: ICondition[] = [
      {
        accessType: [UserTypesEnum.DRAFTER],
        piaType: [PiaTypesEnum.DELEGATE_REVIEW],
        fieldValidations: {
          'review.mpo.reviewNote': {
            required: true,
          },
        },
      },
    ];
    const accessType = [UserTypesEnum.DRAFTER];
    const piaType = PiaTypesEnum.STANDARD;
    const pia = { ...piaIntakeEntityMock };

    validateAllFieldsSpy.mockReturnValue(true);

    const { isSatisfied, errors } = validateConditionsAny(
      conditions,
      accessType,
      piaType,
      pia,
    );

    expect(isSatisfied).toBeFalsy();
    expect(errors).toEqual(['Unsatisfactory PIA type']);
  });

  it('fails field validation and provide errors', () => {
    const conditions: ICondition[] = [
      {
        accessType: [UserTypesEnum.DRAFTER],
        piaType: [PiaTypesEnum.STANDARD],
        fieldValidations: {
          'review.mpo.reviewNote': {
            required: true,
          },
        },
      },
    ];
    const accessType = [UserTypesEnum.DRAFTER];
    const piaType = PiaTypesEnum.STANDARD;
    const pia = { ...piaIntakeEntityMock };

    validateAllFieldsSpy.mockReturnValue(false);

    const { isSatisfied, errors } = validateConditionsAny(
      conditions,
      accessType,
      piaType,
      pia,
    );

    expect(isSatisfied).toBeFalsy();
    expect(errors).toEqual([]);
  });

  it('fails all validations and provide errors for only the first condition failure', () => {
    const conditions: ICondition[] = [
      {
        accessType: [UserTypesEnum.MPO],
        piaType: [PiaTypesEnum.DELEGATE_REVIEW],
        fieldValidations: {
          'review.mpo.reviewNote': {
            required: true,
          },
        },
      },
    ];
    const accessType = [UserTypesEnum.DRAFTER];
    const piaType = PiaTypesEnum.STANDARD;
    const pia = { ...piaIntakeEntityMock };

    validateAllFieldsSpy.mockReturnValue(false);

    const { isSatisfied, errors } = validateConditionsAny(
      conditions,
      accessType,
      piaType,
      pia,
    );

    expect(isSatisfied).toBeFalsy();
    expect(errors).toEqual(['Unsatisfactory user access type']);
  });

  it('passes all validations and provide no errors', () => {
    const conditions: ICondition[] = [
      {
        accessType: [UserTypesEnum.DRAFTER],
        piaType: [PiaTypesEnum.STANDARD],
        fieldValidations: {
          'review.mpo.reviewNote': {
            required: true,
          },
        },
      },
    ];
    const accessType = [UserTypesEnum.DRAFTER];
    const piaType = PiaTypesEnum.STANDARD;
    const pia = { ...piaIntakeEntityMock };

    validateAllFieldsSpy.mockReturnValue(true);

    const { isSatisfied, errors } = validateConditionsAny(
      conditions,
      accessType,
      piaType,
      pia,
    );

    expect(isSatisfied).toBeTruthy();
    expect(errors).toEqual([]);
  });
});
