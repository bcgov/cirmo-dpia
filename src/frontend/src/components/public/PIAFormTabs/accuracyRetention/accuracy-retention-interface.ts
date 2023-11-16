import { IPiaFormContext } from '../../../../contexts/PiaFormContext';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { RichTextContent } from '../types';

export interface IAccuracyCorrectionAndRetention {
  accuracy: {
    description: RichTextContent;
  };
  correction: {
    haveProcessInPlace: string;
    willDocument: string;
    willConductNotifications: string;
  };
  retention: {
    usePIForDecision: string;
    haveApprovedInfoSchedule: string;
    describeRetention: RichTextContent;
  };
}

export interface AccuracyCorrectionAndRetentionProps {
  showComments?: boolean;
}

interface IRadioItem {
  index: number;
  value: YesNoInput;
  groupName: string;
  groupLabel: string;
  isDefault: boolean;
  changeHandler: (e: any) => void;
}

type RadioArray = IRadioItem[];

export interface AccuracySectionProps {
  accuracyCorrectionAndRetentionForm: IAccuracyCorrectionAndRetention;
  showComments: boolean;
  commentCount?: IPiaFormContext['commentCount'];
  isReadOnly: IPiaFormContext['isReadOnly'];
  selectedSection?: IPiaFormContext['selectedSection'];
  stateChangeHandler: (value: any, path: string) => void;
}

export interface CorrectionSectionProps {
  accuracyCorrectionAndRetentionForm: IAccuracyCorrectionAndRetention;
  showComments: boolean;
  commentCount?: IPiaFormContext['commentCount'];
  isReadOnly: IPiaFormContext['isReadOnly'];
  selectedSection?: IPiaFormContext['selectedSection'];
  haveProcessinPlace: RadioArray;
  willDocument: RadioArray;
  willConductNotifications: RadioArray;
}

export interface PersonalInformationSectionProps extends AccuracySectionProps {
  willProvideInformation: RadioArray;
  haveApprovedInfoSchedule: RadioArray;
}
