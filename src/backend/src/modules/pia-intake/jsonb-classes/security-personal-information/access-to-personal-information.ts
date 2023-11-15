import { IsEnum, IsObject, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { RichTextContent } from '../rich-text-content';

export class AccessToPersonalInformation {
  @IsEnum(YesNoInput)
  @IsOptional()
  onlyCertainRolesAccessInformation?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  accessApproved?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  useAuditLogs?: YesNoInput;

  @IsObject()
  @IsOptional()
  additionalStrategies?: RichTextContent;
}
