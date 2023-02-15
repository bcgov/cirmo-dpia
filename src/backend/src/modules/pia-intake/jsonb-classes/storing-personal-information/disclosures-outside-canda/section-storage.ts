import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';

class ServiceProviderDetails {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  cloudInfraName: string;

  @IsString()
  @IsOptional()
  details: string;
}

export class DisclosureStorage {
  @IsEnum(YesNoInput)
  @IsOptional()
  sensitiveInfoStoredByServiceProvider?: YesNoInput;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceProviderDetails)
  serviceProviderList: Array<ServiceProviderDetails>;

  @IsString()
  @IsOptional()
  disclosureDetails?: string;

  @IsString()
  @IsOptional()
  contractualTerms?: string;
}
