import { SubmitButtonTextEnum } from '../../constant/constant';

export type PageAccessControl = {
  [page: string]: {
    accessControl: boolean;
    params?: any;
    viewProgramAreaReviews?: boolean;
  };
};

export type UserRole = 'MPO' | 'CPO' | 'DRAFTER';

export type Privileges = {
  [role in UserRole]?: {
    changeStatus?: Array<ChangeStatus>;
    banner?: string;
    Pages?: PageAccessControl;
    showSubmitButton?: boolean;
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
