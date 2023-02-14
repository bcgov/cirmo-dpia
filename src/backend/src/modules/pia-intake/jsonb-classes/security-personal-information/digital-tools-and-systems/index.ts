import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { DigitalToolsAndSystemsSection1 } from './section-1';
import { DigitalToolsAndSystemsSection2 } from './section-2';

export class DigitalToolsAndSystems {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DigitalToolsAndSystemsSection1)
  section1: DigitalToolsAndSystemsSection1;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DigitalToolsAndSystemsSection2)
  section2: DigitalToolsAndSystemsSection2;
}
