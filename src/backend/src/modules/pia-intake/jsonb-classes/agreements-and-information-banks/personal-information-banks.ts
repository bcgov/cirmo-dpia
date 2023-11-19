import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { RichTextContent } from '../rich-text-content';

export class PersonalInformationBanks {
  @IsEnum(YesNoInput)
  @IsOptional()
  willResultInPIB?: YesNoInput;

  @IsObject()
  @IsOptional()
  description?: RichTextContent;

  @IsString()
  @IsOptional()
  mainMinistryOrAgencyInvolved?: string;

  @IsString()
  @IsOptional()
  otherGroupsInvolved?: string;

  @IsString()
  @IsOptional()
  contactTitle?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;
}
