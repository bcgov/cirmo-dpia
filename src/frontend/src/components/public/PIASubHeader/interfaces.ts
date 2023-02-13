import { MouseEventHandler } from 'react';
import { ILastSaveAlterInfo } from '../../../pages/PIAIntakeForm';
import { IPIAIntake } from '../../../types/interfaces/pia-intake.interface';

export interface PIASubHeaderProps {
  pia: IPIAIntake;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  lastSaveAlertInfo?: ILastSaveAlterInfo;
  onSaveChangeClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick?: MouseEventHandler<HTMLButtonElement>;
}
