import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';

class PrivacyRisk {
  @IsString()
  risk: string;

  @IsString()
  @IsOptional()
  impact: string;

  @IsString()
  @IsOptional()
  likelihoodOfUnauthorizedAccess: string;

  @IsString()
  @IsOptional()
  levelOfPrivacyRisk: string;

  @IsString()
  @IsOptional()
  riskResponse: string;

  @IsString()
  @IsOptional()
  outstandingRisk: string;
}

export class DisclosureRisks {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrivacyRisk)
  privacyRisks: Array<PrivacyRisk>;
}
