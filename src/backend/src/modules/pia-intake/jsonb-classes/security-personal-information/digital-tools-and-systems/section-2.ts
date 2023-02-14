import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class DigitalToolsAndSystemsSection2 {
  @IsEnum(YesNoInput)
  @IsOptional()
  onGovServers: YesNoInput;

  @IsString()
  @IsOptional()
  whereDetails: string;
}
