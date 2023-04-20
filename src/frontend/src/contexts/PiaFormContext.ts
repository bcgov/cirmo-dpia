import { createContext } from 'react';
import {
  PiaStateChangeHandlerType,
  PiaValidationMessage,
} from '../pages/PIAForm';
import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { Comment } from '../components/public/CommentsSidebar/interfaces';
export interface IPiaFormContext {
  pia: IPiaForm;
  comments?: Comment[];
  piaStateChangeHandler: PiaStateChangeHandlerType;
  piaCollapsibleChangeHandler?: (isOpen: boolean) => void;
  isReadOnly: boolean;
  accessControl?: () => void;
  piaCommentPathHandler?: (path: string) => void;
  validationMessage: PiaValidationMessage;
}

export const PiaFormContext = createContext<IPiaFormContext>({
  pia: {},
  comments: [],
  piaCollapsibleChangeHandler: () => null,
  piaStateChangeHandler: () => null,
  piaCommentPathHandler: () => null,
  isReadOnly: true,
  validationMessage: {},
});
