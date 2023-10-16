import { SubmitButtonTextEnum } from '../../constant/constant';

export type PageAccessControl = {
  [page: string]: {
    accessControl: boolean;
    params?: PageParamProperties;
  };
};

// Add page param interfaces for each page.
export type PageParamProperties = ReviewPageParams;

export interface ReviewPageParams {
  showProgramAreaReview?: boolean;
  showMpoReview?: boolean;
  showCpoReview?: boolean;
  editProgramAreaReviewers?: boolean;
  editMpoReview?: boolean;
  editCpoReview?: boolean;
  editProgramAreaReview?: boolean;
}

export type UserRole = 'MPO' | 'CPO' | 'DRAFTER';

export type Privileges = {
  [role in UserRole]?: {
    changeStatus?: Array<ChangeStatus>;
    banner?: string;
    Pages?: PageAccessControl;
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
    Privileges: Privileges;
    Pages?: PageAccessControl;
    finalReviewCompleted?: boolean;
    comments: boolean;
    showCPOReview?: boolean;
    showMPOReview?: boolean;
  };
}

export interface Status {
  prevState: string;
  nextState: string;
  delegated: boolean;
}
