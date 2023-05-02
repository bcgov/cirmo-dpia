import { IPiaFormIntake } from '../../components/public/PIAFormTabs/intake/pia-form-intake.interface';
import { IAccuracyCorrectionAndRetention } from '../../components/public/PIAFormTabs/accuracyRetention/accuracy-retention-interface';
import { IAdditionalRisks } from '../../components/public/PIAFormTabs/additionalRisks/AdditionalRisks';
import { ISecurityPersonalInformation } from '../../components/public/PIAFormTabs/securityPersonalInformation/security-personal-info-interface';
import { ICollectionUseAndDisclosure } from '../../components/public/PIAFormTabs/collectionUseAndDisclosure/CollectionUseAndDisclosure';
import { IAgreementsAndInformationBanks } from '../../components/public/PIAFormTabs/agreementsAndInformationBanks/AgreementsAndInformationBanks';
import { IStoringPersonalInformation } from '../../components/public/PIAFormTabs/storingPersonalInformation/interfaces';
import { IPPQ } from '../../components/public/PIAFormTabs/ppq/interfaces';

export interface IPiaForm extends IPiaFormIntake {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  isActive?: boolean;
  saveId?: number;
  submittedAt?: Date | null;
  accuracyCorrectionAndRetention?: IAccuracyCorrectionAndRetention;
  additionalRisks?: IAdditionalRisks;
  ppq?: IPPQ;
  securityPersonalInformation?: ISecurityPersonalInformation;
  agreementsAndInformationBanks?: IAgreementsAndInformationBanks;
  collectionUseAndDisclosure?: ICollectionUseAndDisclosure;
  storingPersonalInformation?: IStoringPersonalInformation;
  isNextStepsSeenForDelegatedFlow?: boolean;
  isNextStepsSeenForNonDelegatedFlow?: boolean;
}

export interface IPiaFormResponse {
  data: IPiaForm;
  total: number;
  page: number;
  pageSize: number;
}
