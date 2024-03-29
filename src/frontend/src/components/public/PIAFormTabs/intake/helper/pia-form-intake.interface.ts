import { GovMinistriesEnum } from '../../../../../types/enums/gov-ministries.enum';
import { ChangeEvent } from 'react';
import { IPiaFormContext } from '../../../../../contexts/PiaFormContext';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import { RichTextContent } from '../../types';

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
  initiativeDescription?: RichTextContent;
  initiativeScope?: RichTextContent;
  dataElementsInvolved?: RichTextContent;
  hasAddedPiToDataElements?: boolean | null;
  riskMitigation?: RichTextContent;
}

export interface PIAInformationProps {
  isReadOnly: IPiaFormContext['isReadOnly'];
}

export interface IntakeInitiativeScopeProps extends PIAInformationProps {
  selectedSection?: IPiaFormContext['selectedSection'];
  intakeForm: IPiaFormIntake;
  stateChangeHandler: (
    value: any,
    key: keyof IPiaFormIntake,
    nestedKey?: keyof RichTextContent,
  ) => void;
  commentCount?: IPiaFormContext['commentCount'];
  disabled?: boolean;
}

export interface IntakeGeneralInformationProps
  extends IntakeInitiativeScopeProps {
  validationMessage: IPiaFormContext['validationMessage'];
  pia: IPiaFormContext['pia'];
  path?: PiaSections | string;
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
