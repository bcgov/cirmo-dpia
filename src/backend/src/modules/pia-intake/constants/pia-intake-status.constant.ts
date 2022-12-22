import { IConstant } from '../../../common/interfaces/constants.inteface';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';

export const PiaIntakeStatus: IConstant<PiaIntakeStatusEnum> = {
  INCOMPLETE: {
    code: PiaIntakeStatusEnum.INCOMPLETE,
    label: 'Incomplete',
  },
  EDIT_IN_PROGRESS: {
    code: PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
    label: 'Edit in progress',
  },
  MPO_REVIEW: {
    code: PiaIntakeStatusEnum.MPO_REVIEW,
    label: 'MPO review',
  },
  PCT_REVIEW: {
    code: PiaIntakeStatusEnum.PCT_REVIEW,
    label: 'PCT review',
  },
};
