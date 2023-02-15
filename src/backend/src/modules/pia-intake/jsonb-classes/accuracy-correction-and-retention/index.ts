import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { Accuracy } from './accuracy';
import { Correction } from './correction';
import { Retention } from './retention';

export class AccuracyCorrectionAndRetention {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Accuracy)
  accuracy: Accuracy;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Correction)
  correction: Correction;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Retention)
  retention: Retention;
}
