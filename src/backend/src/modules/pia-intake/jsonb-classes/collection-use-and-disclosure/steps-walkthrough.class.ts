import { IsOptional, IsString } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';

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

export const stepWalkthroughDetails: Array<IFormField<StepWalkthrough>> = [
  {
    key: 'drafterInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: null, // any
  },
  {
    key: 'mpoInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'foippaInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
  {
    key: 'OtherInput',
    type: 'text',
    isRichText: false,
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
];
