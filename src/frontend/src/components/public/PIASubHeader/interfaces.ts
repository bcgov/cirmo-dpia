import { MouseEventHandler } from 'react';
import { PiaFormOpenMode } from '../../../pages/PIAForm/helpers/types';
import { ILastSaveAlterInfo } from '../../../pages/PIAForm/helpers/interfaces';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';

export interface PIASubHeaderProps {
  pia: IPiaForm;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  mode: PiaFormOpenMode;
  lastSaveAlertInfo?: ILastSaveAlterInfo;
  isValidationFailed?: boolean;
  handleStatusChange: (updatedStatus: string) => void;
  onSaveChangeClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick?: MouseEventHandler<HTMLButtonElement>;
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
}
