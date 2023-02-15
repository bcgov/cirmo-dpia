import { IsArray, IsString, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

class PrivacyRisk {
  @IsString()
  risk: string;

  @IsString()
  impact: string;

  @IsString()
  likelihoodOfUnauthorizedAccess: string;

  @IsString()
  levelOfPrivacyRisk: string;

  @IsString()
  riskResponse: string;

  @IsString()
  outstandingRisk: string;
}

export class DisclosureRisks {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrivacyRisk)
  privacyRisks: Array<PrivacyRisk>;
}
