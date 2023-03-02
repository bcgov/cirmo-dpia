import { IPiaFormIntake } from '../../components/public/PIAFormTabs/intake/pia-form-intake.interface';
import { IAccuracyCorrectionAndRetention } from '../../components/public/PIAFormTabs/Accuracy_Retention/accuracy-retention-interface';
import { IAdditionalRisks } from '../../components/public/PIAFormTabs/PIAAdditionalRisks/AdditionalRisks';
import { ISecurityPersonalInformation } from '../../components/public/PIAFormTabs/Security_Personal_Information/security-personal-info-interface';
import { ICollectionUseAndDisclosure } from '../../components/public/PIAFormTabs/PIACollectionUseAndDisclosure/CollectionUseAndDisclosure';
import { IAgreementsAndInformationBanks } from '../../components/public/PIAFormTabs/agreementsAndInformationBanks/AgreementsAndInformationBanks';

export interface IPiaForm extends IPiaFormIntake {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  saveId?: number;
  submittedAt?: Date | null;
  accuracyCorrectionAndRetention?: IAccuracyCorrectionAndRetention;
  additionalRisks?: IAdditionalRisks;
  securityPersonalInformation?: ISecurityPersonalInformation;
  agreementsAndInformationBanks?: IAgreementsAndInformationBanks;
  collectionUseAndDisclosure?: ICollectionUseAndDisclosure;
}

export interface IPiaFormResponse {
  data: IPiaForm;
  total: number;
  page: number;
  pageSize: number;
}
