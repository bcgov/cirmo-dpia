import { IsOptional, IsString } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';
import { validateRoleForFormField } from 'src/common/validators/form-field-role.validator';

export class StepWalkthrough {
  @IsString()
  @IsOptional()
  drafterInput?: string;

  @IsString()
  @IsOptional()
  mpoInput?: string;

  @IsString()
  @IsOptional()
  foippaInput?: string;

  @IsString()
  @IsOptional()
  OtherInput?: string;
}

export const StepWalkthroughMetadata: Array<IFormField<StepWalkthrough>> = [
  {
    key: 'drafterInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: null, // any user can edit this field
  },
  {
    key: 'mpoInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: [UserTypesEnum.MPO], // only MPO users can edit this field
  },
  {
    key: 'foippaInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: [UserTypesEnum.MPO], // only MPO users can edit this field
  },
  {
    key: 'OtherInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: [UserTypesEnum.MPO], // only MPO users can edit this field
  },
];

/**
 * @method validateRoleForStepWalkthrough
 *
 * @description
 * This method validates role access to StepWalkthrough values
 */
export const validateRoleForStepWalkthrough = (
  step: StepWalkthrough,
  userType: UserTypesEnum,
) => {
  if (!step) return;

  const keys = Object.keys(step) as Array<keyof StepWalkthrough>;

  keys.forEach((key) => {
    const value = step?.[key];
    const metadata = StepWalkthroughMetadata.find((m) => m.key === key);

    validateRoleForFormField(metadata, value, userType, `steps.${key}`);
  });
};
