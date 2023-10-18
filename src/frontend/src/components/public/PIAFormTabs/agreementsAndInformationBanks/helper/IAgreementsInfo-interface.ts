import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IPiaFormContext } from '../../../../../contexts/PiaFormContext';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';

export interface IAgreementsAndInformationBanks {
  personalInformationBanks: {
    willResultInPIB: string;
    description: string;
    mainMinistryOrAgencyInvolved: string;
    otherGroupsInvolved?: string;
    contactTitle: string;
    contactPhone: string;
  };
  informationSharingAgreement: {
    doesInvolveISA: string;
    description: string;
    mainMinistryOrAgencyInvolved?: string;
    otherGroupsInvolved: string;
    contactTitle: string;
    contactPhone: string;
    startDate: string | null;
    endDate: string | null;
  };
}
export interface ITextInputProps {
  pia: IPiaForm;
}

export interface PIAAgreementsAndInformationBanksProps {
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

// Define a type for an array of radio items
type RadioArray = IRadioItem[];

// Define props for the Information Sharing Agreement section
export interface InformationSharingAgreementProps {
  agreementsAndInformationBanksForm: IAgreementsAndInformationBanks;
  pia: IPiaForm;
  selectedSection?: IPiaFormContext['selectedSection'];
  isReadOnly: boolean;
  stateChangeHandler: (value: any, path: string) => void;
  showComments: boolean;
  commentCount?: IPiaFormContext['commentCount'];
  InvolvesRadioHelper: RadioArray;
}

// Define props for the Personal Information Banks section
export interface PersonalInformationBanksProps {
  agreementsAndInformationBanksForm: IAgreementsAndInformationBanks;
  pia: IPiaForm;
  selectedSection?: IPiaFormContext['selectedSection'];
  isReadOnly: boolean;
  stateChangeHandler: (value: any, path: string) => void;
  showComments: boolean;
  commentCount?: IPiaFormContext['commentCount'];
  WillResultPIBRadio: RadioArray;
}
