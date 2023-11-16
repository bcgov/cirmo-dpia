import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Validate,
} from '@nestjs/class-validator';
import { DateStringValidator } from '../../../../common/validators/date-string.validator';
import { YesNoInput } from '../../../../common/enums/yes-no-input.enum';
import { RichTextContent } from '../rich-text-content';

export class InformationSharingAgreement {
  @IsEnum(YesNoInput)
  @IsOptional()
  doesInvolveISA?: YesNoInput;

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

  @IsString()
  @IsOptional()
  @Validate(DateStringValidator)
  startDate?: string;

  @IsString()
  @IsOptional()
  @Validate(DateStringValidator)
  endDate?: string;
}
