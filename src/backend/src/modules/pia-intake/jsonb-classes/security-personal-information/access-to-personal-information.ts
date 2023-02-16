import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

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

  @IsString()
  @IsOptional()
  additionalStrategies?: string;
}
