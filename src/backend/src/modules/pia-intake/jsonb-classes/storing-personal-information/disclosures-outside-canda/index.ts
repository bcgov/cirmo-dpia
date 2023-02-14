import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { DisclosureSection1 } from './section-1';
import { DisclosureSection2 } from './section-2';
import { DisclosureSection3 } from './section-3';
import { DisclosureSection4 } from './section-4';
import { DisclosureSection5 } from './section-5';

export class DisclosuresOutsideCanada {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureSection1)
  section1: DisclosureSection1;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureSection2)
  section2: DisclosureSection2;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureSection3)
  section3: DisclosureSection3;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureSection4)
  section4: DisclosureSection4;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosureSection5)
  section5: DisclosureSection5;
}
