import { GovMinistriesEnum } from '../../../../types/enums/gov-ministries.enum';
import { ChangeEvent } from 'react';
import { IPiaFormContext } from '../../../../contexts/PiaFormContext';

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

export interface PIAInformationProps {
  isReadOnly: IPiaFormContext['isReadOnly'];
}

export interface IntakeInitiativeDescriptionProps {
  isReadOnly: IPiaFormContext['isReadOnly'];
  selectedSection?: IPiaFormContext['selectedSection'];
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (value: any, key: keyof IPiaFormIntake) => void;
  commentCount?: IPiaFormContext['commentCount'];
  validationMessage: IPiaFormContext['validationMessage'];
}

export interface IntakeInitiativeScopeProps {
  isReadOnly: IPiaFormContext['isReadOnly'];
  selectedSection?: IPiaFormContext['selectedSection'];
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (value: any, key: keyof IPiaFormIntake) => void;
  commentCount?: IPiaFormContext['commentCount'];
}

export interface IntakeInitiativeDetailsProps {
  isReadOnly: IPiaFormContext['isReadOnly'];
  selectedSection?: IPiaFormContext['selectedSection'];
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (value: any, key: keyof IPiaFormIntake) => void;
  commentCount?: IPiaFormContext['commentCount'];
}

export interface IntakePersonalInformationProps {
  isReadOnly: IPiaFormContext['isReadOnly'];
  selectedSection?: IPiaFormContext['selectedSection'];
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (value: any, key: keyof IPiaFormIntake) => void;
  commentCount?: IPiaFormContext['commentCount'];
  pia: IPiaFormContext['pia'];
  handlePIOptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
