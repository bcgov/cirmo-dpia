import { GovMinistriesEnum } from '../enums/gov-ministries.enum';
import { PiaTypesEnum } from '../enums/pia-types.enum';

export interface IPPQFrom {
  name: string;
  email: string;
  ministry: GovMinistriesEnum | string;
  branch: string;
  initiativeName: string;
  initiativeDescription: string;
  dataElements: string;
  piaType: PiaTypesEnum | null | string;
  containsPersonalInformation?: boolean;
  hasSensitivePersonalInformation?: boolean;
  hasSharingOfPersonalInformation?: boolean;
  hasProgramAgreement?: boolean;
  hasOthersAccessToPersonalInformation?: boolean;
  hasCloudTechnology?: boolean;
  hasPotentialPublicInterest?: boolean;
  hasDisclosureOutsideOfCanada?: boolean;
  hasBcServicesCardOnboarding?: boolean;
  hasAiOrMl?: boolean;
  hasPartnershipNonMinistry?: boolean;
  proposedStartDate?: Date | null;
}
