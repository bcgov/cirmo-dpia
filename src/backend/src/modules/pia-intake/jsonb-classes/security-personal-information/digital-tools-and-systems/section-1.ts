import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class DigitalToolsAndSystemsSection1 {
  @IsEnum(YesNoInput)
  @IsOptional()
  involveDigitalToolsAndSystems: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  haveSecurityAssessment: YesNoInput;
}
