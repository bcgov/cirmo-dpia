import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { DigitalToolsAndSystemsToolsAndAssessment } from './section-tools-and-assessment';
import { DigitalToolsAndSystemsStorage } from './section-storage';

export class DigitalToolsAndSystems {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DigitalToolsAndSystemsToolsAndAssessment)
  toolsAndAssessment: DigitalToolsAndSystemsToolsAndAssessment;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DigitalToolsAndSystemsStorage)
  storage: DigitalToolsAndSystemsStorage;
}
