import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class ResultingPIB {
  @IsEnum(YesNoInput)
  @IsOptional()
  willResultInPIB?: YesNoInput;

  @IsString()
  @IsOptional()
  descriptionInformationType?: string;

  @IsString()
  @IsOptional()
  mainMinistryInvolved?: string;

  @IsString()
  @IsOptional()
  otherMinistryInvolved?: string;

  @IsString()
  @IsOptional()
  managingPersonName?: string;

  @IsString()
  @IsOptional()
  managingPersonPhone?: string;
}
