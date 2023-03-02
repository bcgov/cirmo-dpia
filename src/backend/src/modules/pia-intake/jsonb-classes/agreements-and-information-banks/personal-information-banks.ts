import { IsEnum, IsOptional, IsString } from '@nestjs/class-validator';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

export class PersonalInformationBanks {
  @IsEnum(YesNoInput)
  @IsOptional()
  willResultInPIB?: YesNoInput;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  mainMinistryOrAgencyInvolved?: string;

  @IsString()
  @IsOptional()
  otherGroupsInvolved?: string;

  @IsString()
  @IsOptional()
  contactTitle?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;
}
