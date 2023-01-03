import { IConstant } from '../../../common/interfaces/constants.inteface';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';

export const PiaIntakeStatus: IConstant = {
  [PiaIntakeStatusEnum.INCOMPLETE]: {
    label: 'Incomplete',
  },
  [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
    label: 'Edit in progress',
  },
  [PiaIntakeStatusEnum.MPO_REVIEW]: {
    label: 'MPO review',
  },
  [PiaIntakeStatusEnum.PCT_REVIEW]: {
    label: 'PCT review',
  },
};
