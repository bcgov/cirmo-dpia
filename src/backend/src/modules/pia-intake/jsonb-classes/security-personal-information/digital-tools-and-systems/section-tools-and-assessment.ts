import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class DigitalToolsAndSystemsToolsAndAssessment {
  @IsEnum(YesNoInput)
  @IsOptional()
  involveDigitalToolsAndSystems?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  haveSecurityAssessment?: YesNoInput;
}
