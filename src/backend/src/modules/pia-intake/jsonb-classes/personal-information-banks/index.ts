import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { ResultingPIB } from './resulting-pib';

export class PersonalInformationBanks {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ResultingPIB)
  resultingPIB: ResultingPIB;
}
