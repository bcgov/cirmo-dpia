import { SubmitButtonTextEnum } from '../../constant/constant';

// Page corresponds with the url route.
export type Page =
  | 'intake'
  | 'nextSteps'
  | 'collectionUseAndDisclosure'
  | 'storingPersonalInformation'
  | 'securityOfPersonalInformation'
  | 'accuracyCorrectionAndRetention'
  | 'agreementsAndInformationBanks'
  | 'additionalRisks'
  | 'review'
  | 'ppq';

export type PageProperties = {
  [page in Page]: {
    accessControl: boolean; // If page can be accessed.
    readOnly?: boolean; // Don't allow editing (except special cases like Review page)
    params?: PageParamProperties<page>;
  };
};

// Add page param interfaces for each page.
export type PageParamProperties<P extends Page> = P extends 'review'
  ? ReviewPageParams
  : undefined;

export type ReviewPageParams = {
  showPrintPreview?: boolean; // Show print preview or show 'Pending Review'.
  showProgramAreaReview?: boolean; // Show Program Area review section.
  showMpoReview?: boolean; // Show MPO review section.
  showCpoReview?: boolean; // Show CPO review section.
  editProgramAreaReviewers?: boolean; // Adding and deleting of program area roles.
  editMpoReview?: boolean; // Edit MPO review card.
  editCpoReview?: boolean; // Edit CPO review card.
  editProgramAreaReview?: boolean; // Edit Program Area review card.
};

export type UserRole = 'MPO' | 'CPO' | 'DRAFTER';

export type Privileges = {
  [role in UserRole]?: {
    changeStatus?: Array<ChangeStatus>;
    banner?: string;
    Pages?: PageProperties;
    showSubmitButton?: boolean;
    showDropdownMenu?: boolean;
  };
};

export interface Modal {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
}

export interface ChangeStatus {
  status: string;
  modal: Modal;
  submitModal?: Modal;
}

export interface StatusList {
  [name: string]: {
    title: string;
    class: string;
    buttonText?: SubmitButtonTextEnum;
    banner?: string;
    modal: Modal;
    submitModalType?: string;
    Privileges: Privileges;
    finalReviewCompleted?: boolean;
    comments: boolean;
    readOnly?: boolean;
  };
}

export interface Status {
  prevState: string;
  nextState: string;
  delegated: boolean;
}
