import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class Retention {
  @IsEnum(YesNoInput)
  @IsOptional()
  usePIForDecision?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  haveApprovedInfoSchedule?: YesNoInput;

  @IsString()
  @IsOptional()
  describeRetention?: string;
}
