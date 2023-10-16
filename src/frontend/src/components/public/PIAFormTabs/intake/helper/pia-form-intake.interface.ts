import { GovMinistriesEnum } from '../../../../../types/enums/gov-ministries.enum';
import { ChangeEvent } from 'react';
import { IPiaFormContext } from '../../../../../contexts/PiaFormContext';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

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
  riskMitigation?: string;
}

export interface PIAInformationProps {
  isReadOnly: IPiaFormContext['isReadOnly'];
}

export interface IntakeInitiativeScopeProps extends PIAInformationProps {
  selectedSection?: IPiaFormContext['selectedSection'];
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (value: any, key: keyof IPiaFormIntake) => void;
  commentCount?: IPiaFormContext['commentCount'];
}

export interface IntakeGeneralInformationProps
  extends IntakeInitiativeScopeProps {
  validationMessage: IPiaFormContext['validationMessage'];
  pia: IPiaFormContext['pia'];
  path?: PiaSections;
}

export interface IntakeInitiativeDescriptionProps
  extends IntakeInitiativeScopeProps {
  validationMessage: IPiaFormContext['validationMessage'];
}

export type IntakeInitiativeDetailsProps = IntakeInitiativeScopeProps;

export interface IntakePersonalInformationProps
  extends IntakeInitiativeScopeProps {
  pia: IPiaFormContext['pia'];
  handlePIOptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
