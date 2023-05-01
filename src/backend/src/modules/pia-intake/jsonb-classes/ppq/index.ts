import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { DateStringValidator } from 'src/common/validators/date-string.validator';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';

export class Ppq {
  @IsBoolean()
  @IsOptional()
  hasCommonProgram?: boolean; // equivalent to hasProgramAgreement of ppq.entity.ts

  @IsBoolean()
  @IsOptional()
  hasCloudTechnology?: boolean;

  @IsBoolean()
  @IsOptional()
  hasPotentialPublicInterest?: boolean;

  @IsBoolean()
  @IsOptional()
  hasDataLinking?: boolean;

  @IsBoolean()
  @IsOptional()
  hasBcServicesCardOnboarding?: boolean;

  @IsBoolean()
  @IsOptional()
  hasAiOrMl?: boolean;

  @IsBoolean()
  @IsOptional()
  hasContactOrLicenseReview?: boolean;

  @IsBoolean()
  @IsOptional()
  hasInitiativeOther?: boolean;

  @IsString()
  @IsOptional()
  initiativeOtherDetails?: string;

  @IsEnum(YesNoInput)
  @IsOptional()
  proposedDeadlineAvailable?: YesNoInput;

  @IsString()
  @IsOptional()
  @Validate(DateStringValidator)
  proposedDeadline?: string;

  @IsString()
  @IsOptional()
  proposedDeadlineReason?: string;

  @IsString()
  @IsOptional()
  otherCpoConsideration?: string;
}

// only MPO users can edit all these field
export const PpqMetadata: Array<IFormField<Ppq>> = [
  {
    key: 'hasCommonProgram',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'hasCloudTechnology',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'hasPotentialPublicInterest',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'hasDataLinking',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'hasBcServicesCardOnboarding',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'hasAiOrMl',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'hasContactOrLicenseReview',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'hasInitiativeOther',
    type: 'boolean',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'initiativeOtherDetails',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'proposedDeadlineAvailable',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'proposedDeadline',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'proposedDeadlineReason',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'otherCpoConsideration',
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
];

/**
 * @method validateRoleForPPq
 *
 * @description
 * This method validates role access to Ppq values
 */
export const validateRoleForPPq = (
  updatedValue: Ppq,
  storedValue: Ppq,
  userType: UserTypesEnum,
) => {
  if (!updatedValue) return;

  const keys = Object.keys(updatedValue) as Array<keyof Ppq>;

  keys.forEach((key) => {
    const updatedKeyValue = updatedValue?.[key];
    const storedKeyValue = storedValue?.[key];
    const metadata = PpqMetadata.find((m) => m.key === key);

    validateRoleForFormField(
      metadata,
      updatedKeyValue,
      storedKeyValue,
      userType,
      `ppq.${key}`,
    );
  });
};
