import { MouseEventHandler } from 'react';
import { ILastSaveAlterInfo } from '../../../pages/PIAForm';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';

export interface PIASubHeaderProps {
  pia: IPiaForm;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  lastSaveAlertInfo?: ILastSaveAlterInfo;
  onSaveChangeClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick?: MouseEventHandler<HTMLButtonElement>;
}
