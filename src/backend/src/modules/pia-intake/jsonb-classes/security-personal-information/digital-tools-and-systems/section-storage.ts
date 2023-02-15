import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class DigitalToolsAndSystemsStorage {
  @IsEnum(YesNoInput)
  @IsOptional()
  onGovServers?: YesNoInput;

  @IsString()
  @IsOptional()
  whereDetails?: string;
}
