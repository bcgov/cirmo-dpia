import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { AccessToPersonalInformation } from './access-to-personal-information';
import { DigitalToolsAndSystems } from './digital-tools-and-systems/index';

export class SecurityPersonalInformation {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DigitalToolsAndSystems)
  digitalToolsAndSystems: DigitalToolsAndSystems;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AccessToPersonalInformation)
  accessToPersonalInformation: AccessToPersonalInformation;
}
