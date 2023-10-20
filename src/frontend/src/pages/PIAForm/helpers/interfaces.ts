import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { SupportedAlertTypes } from '../../../components/common/Alert/interfaces';

export interface IBannerStatusProps {
  pia: IPiaForm;
}

export interface PiaValidationMessage {
  piaTitle?: string | null;
  piaMinistry?: string | null;
  piaBranch?: string | null;
  piaInitialDescription?: string | null;
  ppqProposeDeadline?: string | null;
  ppqProposeDeadlineReason?: string | null;
}

export interface ILastSaveAlterInfo {
  message: string;
  type: SupportedAlertTypes;
  show: boolean;
}
