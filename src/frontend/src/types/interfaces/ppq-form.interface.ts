import { GovMinistriesEnum } from '../enums/gov-ministries.enum';
import { DelegatedReviewTypesEnum } from '../enums/delegated-review-types.enum';
import { PiaTypesEnum } from '../enums/pia-types.enum';

export interface IPPQForm {
  title: string;
  ministry: GovMinistriesEnum | string;
  piaType: PiaTypesEnum | string;
  delegatedReviewType?: DelegatedReviewTypesEnum | string | null;
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
  proposedStartDate?: string | null;
  description?: string;
}
