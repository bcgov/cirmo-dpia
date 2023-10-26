import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { PiaValidationMessage } from '../helpers/interfaces';
import { SetStateAction } from 'react';

export type ValidateFormProps = {
  pia: IPiaForm;
  setValidationMessages: (value: SetStateAction<PiaValidationMessage>) => void;
};

export type ValidationRule = {
  key: keyof IPiaForm;
  validationKey: string;
  msg: string;
};

export type ResetUIProps = {
  setValidationMessages: (value: SetStateAction<PiaValidationMessage>) => void;
  setIsValidationFailed: (value: SetStateAction<boolean>) => void;
  setValidationFailedMessage: (value: SetStateAction<string>) => void;
  doc: Document;
};

export type PiaStateChangeHandlerType = (
  value: any,
  key: keyof IPiaForm,
  isEager?: boolean,
) => any;

export type PiaFormOpenMode = 'edit' | 'view';

export type HandleValidationProps = {
  event?: any;
  status?: string;
};
