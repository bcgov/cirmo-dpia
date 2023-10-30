import { IConstant } from '../../../common/interfaces/constants.inteface';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';

export const PiaIntakeStatus: IConstant = {
  [PiaIntakeStatusEnum.DRAFTING_IN_PROGRESS]: {
    label: 'Drafting in Progress',
  },
  [PiaIntakeStatusEnum.EDIT_IN_PROGRESS]: {
    label: 'Edit in progress',
  },
  [PiaIntakeStatusEnum.MPO_REVIEW]: {
    label: 'MPO review',
  },
  [PiaIntakeStatusEnum.CPO_REVIEW]: {
    label: 'PCT review',
  },
};
