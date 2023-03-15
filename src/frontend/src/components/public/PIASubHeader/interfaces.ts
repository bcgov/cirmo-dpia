import { MouseEventHandler } from 'react';
import { ILastSaveAlterInfo, PiaFormOpenMode } from '../../../pages/PIAForm';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';

export interface PIASubHeaderProps {
  pia: IPiaForm;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  mode: PiaFormOpenMode;
  lastSaveAlertInfo?: ILastSaveAlterInfo;
  onSaveChangeClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick?: MouseEventHandler<HTMLButtonElement>;
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
}
