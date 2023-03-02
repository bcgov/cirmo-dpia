import {
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { InformationSharingAgreement } from './information-sharing-agreement';
import { PersonalInformationBanks } from './personal-information-banks';

export class AgreementsAndInformationBanks {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InformationSharingAgreement)
  informationSharingAgreement: InformationSharingAgreement;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PersonalInformationBanks)
  personalInformationBanks: PersonalInformationBanks;
}
