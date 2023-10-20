import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { IReview } from './interfaces';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';

export type AddHideRolesToggleProps = {
  setShowAddRolesArea: Dispatch<React.SetStateAction<boolean>>;
  showAddRolesArea: boolean;
};

export type AddRoleDropdownProps = {
  reviewForm: IReview;
  rolesSelect: string;
  setRolesSelect: Dispatch<React.SetStateAction<string>>;
  addRole: (role: string) => void;
};

export type AddRoleInputProps = {
  rolesInput: string;
  setRolesInput: Dispatch<React.SetStateAction<string>>;
  addRole: (role: string) => void;
};

export type PAReviewProps = {
  pia: IPiaForm;
  printPreview?: boolean;
  role: string;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
};

export type DateReviewedProps = {
  isAcknowledged: boolean;
  reviewedAtTime: string;
};

export type EditReviewButtonProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

export type IsAcknowledgedCheckboxProps = {
  isAcknowledged: boolean;
  checkBoxLabel: string;
  editMode: boolean;
  setAcknowledged: Dispatch<SetStateAction<boolean>>;
};

export type ReviewedByProps = {
  isAcknowledged: boolean;
  reviewedByDisplayName: string;
};

export type ReviewNoteProps = {
  editMode: boolean;
  reviewNoteRequired: boolean;
  reviewNote: string;
  setReviewNote: Dispatch<SetStateAction<string>>;
  onClearClick: MouseEventHandler<HTMLButtonElement>;
  isAcknowledged: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
};

export type ReviewNoteTextAreaProps = {
  reviewNote: string;
  setReviewNote: Dispatch<SetStateAction<string>>;
  onClearClick: MouseEventHandler<HTMLButtonElement>;
  isAcknowledged: boolean;
  reviewNoteRequired: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
};
