import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import { GovMinistriesEnum } from '../../../../types/enums/gov-ministries.enum';

export interface IPiaFormIntake {
  title?: string;
  ministry?: GovMinistriesEnum | string;
  branch?: string;
  drafterName?: string;
  drafterEmail?: string;
  leadName?: string;
  leadTitle?: string;
  leadEmail?: string;
  mpoName?: string;
  mpoEmail?: string;
  initiativeDescription?: string;
  initiativeScope?: string;
  dataElementsInvolved?: string;
  hasAddedPiToDataElements?: boolean | null;
  riskMitigation?: string | undefined;
}

export interface GeneralInformationProps {
  isReadOnly: boolean;
}

export interface PIAInitiativeDescriptionProps {
  isReadOnly: boolean;
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (value: any, key: keyof IPiaFormIntake) => void;
  validationMessage: any;
  selectedSection?: PiaSections;
  commentCount: any;
}

export interface InitiativeScopeSectionProps {
  isReadOnly: boolean;
  selectedSection?: PiaSections;
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (value: any, key: keyof IPiaFormIntake) => void;
  commentCount: any;
}
