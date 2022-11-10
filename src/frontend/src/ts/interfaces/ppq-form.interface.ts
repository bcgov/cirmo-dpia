import { GovMinistriesEnum } from '../enums/gov-ministries.enum';
import { PiaReviewTypesEnum } from '../enums/pia-review-types.enum';
import { PiaTypesEnum } from '../enums/pia-types.enum';

export interface IPPQForm {
  name: string;
  ministry: GovMinistriesEnum | string;
  piaType: PiaTypesEnum;
  reviewType?: PiaReviewTypesEnum;
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
  hasAdditionalInfo?: string;
}
