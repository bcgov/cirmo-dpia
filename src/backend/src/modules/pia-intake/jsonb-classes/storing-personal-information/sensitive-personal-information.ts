import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class SensitivePersonalInformation {
  @IsEnum(YesNoInput)
  @IsOptional()
  doesInvolve?: YesNoInput;

  @IsEnum(YesNoInput)
  @IsOptional()
  disclosedOutsideCanada?: YesNoInput;
}
