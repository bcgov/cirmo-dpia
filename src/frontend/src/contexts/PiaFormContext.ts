import { createContext } from 'react';
import {
  PiaStateChangeHandlerType,
  PiaValidationMessage,
} from '../pages/PIAForm';
import { IPiaForm } from '../types/interfaces/pia-form.interface';

export interface IPiaFormContext {
  pia: IPiaForm;
  piaStateChangeHandler: PiaStateChangeHandlerType;
  isReadOnly: boolean;
  accessControl?: () => void;
  validationMessage: PiaValidationMessage;
}

export const PiaFormContext = createContext<IPiaFormContext>({
  pia: {},
  piaStateChangeHandler: () => null,
  isReadOnly: true,
  validationMessage: {},
});
