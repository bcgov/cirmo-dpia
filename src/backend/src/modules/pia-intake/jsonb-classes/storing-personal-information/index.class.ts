import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { DisclosuresOutsideCanada } from './disclosures-outside-canda/index.class';
import { PersonalInformation } from './personal-information.class';
import { SensitivePersonalInformation } from './sensitive-personal-information.class';

export class StoringPersonalInformation {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PersonalInformation)
  personalInformation: PersonalInformation;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SensitivePersonalInformation)
  sensitivePersonalInformation: SensitivePersonalInformation;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DisclosuresOutsideCanada)
  disclosuresOutsideCanada: DisclosuresOutsideCanada;
}
