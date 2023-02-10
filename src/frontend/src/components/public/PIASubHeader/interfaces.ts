import { ChangeEventHandler, MouseEventHandler } from 'react';
import { ILastSaveAlterInfo } from '../../../pages/PIAIntakeForm';
import { IPIAIntake } from '../../../types/interfaces/pia-intake.interface';

export interface PIASubHeaderProps {
  pia: IPIAIntake;
  lastSaveAlertInfo: ILastSaveAlterInfo;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmitClick?: MouseEventHandler<HTMLButtonElement>;
}
