import { IPiaFormIntake } from '../../components/public/PIAFormTabs/intake/pia-form-intake.interface';
import { IAccuracyCorrectionAndRetention } from '../../components/public/PIAFormTabs/Accuracy_Retention/accuracy-retention-interface'; 
import { IAdditionalRisks } from '../../components/public/PIAFormTabs/PIAAdditionalRisks/AdditionalRisks';
import { IPersonalInformationBanks } from '../../components/public/PIAFormTabs/PIAPersonalInformationBanks/PersonalInformationBanks';
import { ICollectionUseAndDisclosure } from '../../components/public/PIAFormTabs/PIACollectionUseAndDisclosure/CollectionUseAndDisclosure';

export interface IPiaForm extends IPiaFormIntake {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  saveId?: number;
  submittedAt?: Date | null;
  accuracyCorrectionAndRetention?: IAccuracyCorrectionAndRetention; 
  additionalRisks?: IAdditionalRisks;
  personalInformationBanks?: IPersonalInformationBanks;
  collectionUseAndDisclosure?: ICollectionUseAndDisclosure;
}

export interface IPiaFormResponse {
  data: IPiaForm;
  total: number;
  page: number;
  pageSize: number;
}
