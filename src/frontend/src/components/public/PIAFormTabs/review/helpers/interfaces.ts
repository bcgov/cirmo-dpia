import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

export interface IReview {
  programArea: {
    selectedRoles: string[];
    reviews?: {
      [role: string]: IReviewSection;
    };
  };
  mpo: IReviewSection;
  cpo?: {
    [guid: string]: IReviewSection;
  };
}

export interface IReviewSection {
  isAcknowledged: boolean;
  reviewNote: string;
  reviewedByDisplayName?: string;
  reviewedByGuid?: string;
  reviewedAt?: string;
}

export interface ICPOReviewProps {
  pia: IPiaForm;
  printPreview?: boolean;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

export interface IDisplayProgramAreaProps {
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
  pia: IPiaForm;
  reviewForm: IReview;
  mandatoryADM: boolean;
  printPreview: boolean;
}

export interface IReviewProps {
  editMode: boolean;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
  isAcknowledged: boolean;
  setAcknowledged?: Dispatch<SetStateAction<boolean>>;
  reviewNote: string;
  setReviewNote?: Dispatch<SetStateAction<string>>;
  role?: string;
  reviewedAtTime?: string;
  reviewedByDisplayName?: string;
  checkBoxLabel: string;
  canEditReview?: boolean;
  reviewNoteRequired?: boolean;
  onConfirmClick?: MouseEventHandler<HTMLButtonElement>;
  onClearClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface IPIAReviewProps {
  printPreview?: boolean;
}

export interface IMPOReviewProps {
  pia: IPiaForm;
  printPreview?: boolean;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

export interface IPAReviewProps {
  pia: IPiaForm;
  printPreview?: boolean;
  addRole: (role: string) => void;
  reviewForm: IReview;
  mandatoryADM: boolean;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}
