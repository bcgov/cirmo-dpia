import { GovMinistriesEnum } from '../enums/gov-ministries.enum';

export interface IPPQForm {
  name: string;
  ministry: GovMinistriesEnum | string;
  isStandardPia?: boolean;
  isInitiativeUpdate?: boolean;
  isDelegateReview?: boolean;
  isOther?: boolean;
  isNonPI?: boolean;
  isChecklist?: boolean;
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
