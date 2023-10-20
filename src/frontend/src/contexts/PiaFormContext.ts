import { createContext } from 'react';
import { PiaValidationMessage } from '../pages/PIAForm/helpers/interfaces';
import { PiaStateChangeHandlerType } from '../pages/PIAForm/helpers/types';
import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { CommentCount } from '../components/common/ViewComment/interfaces';
import { PiaSections } from '../types/enums/pia-sections.enum';
export interface IPiaFormContext {
  pia: IPiaForm;
  commentCount?: CommentCount;
  selectedSection?: PiaSections;
  piaStateChangeHandler: PiaStateChangeHandlerType;
  piaCollapsibleChangeHandler?: (isOpen: boolean) => void;
  isReadOnly: boolean;
  accessControl?: () => void;
  piaCommentPathHandler?: (path: PiaSections | undefined) => void;
  validationMessage: PiaValidationMessage;
}

export const PiaFormContext = createContext<IPiaFormContext>({
  pia: {},
  commentCount: {},
  selectedSection: undefined,
  piaCollapsibleChangeHandler: () => null,
  piaStateChangeHandler: () => null,
  piaCommentPathHandler: () => null,
  isReadOnly: true,
  validationMessage: {},
});
