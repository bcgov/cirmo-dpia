import { IsArray, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { AdditionalRisk } from './additionalRisk';

export class AdditionalRisks {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalRisk)
  risks: Array<AdditionalRisk>;
}
