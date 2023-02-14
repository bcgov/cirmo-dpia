import { IsOptional, IsString } from '@nestjs/class-validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';

export class CollectionNotice {
  @IsString()
  @IsOptional()
  drafterInput?: string;

  @IsString()
  @IsOptional()
  mpoInput?: string;
}

export const stepWalkthroughDetails: Array<IFormField<CollectionNotice>> = [
  {
    key: 'drafterInput',
    type: 'text',
    isRichText: true,
    allowedUserTypesEdit: null, // any
  },
  {
    key: 'mpoInput',
    type: 'text',
    isRichText: true,
    allowedUserTypesEdit: [UserTypesEnum.MPO],
  },
];
