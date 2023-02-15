import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class Correction {
  @IsEnum(YesNoInput)
  @IsOptional()
  haveProcessInPlace?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  willDocument?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  willConductNotifications?: YesNoInput;
}
