import { PiaTypesEnum } from '../enums/pia-types.enum';

export const PiaTypes = {
  [PiaTypesEnum.STANDARD]: {
    label: 'Standard PIA',
  },
  [PiaTypesEnum.INITIATIVE_UPDATE]: {
    label: 'Initiative Update',
  },
  [PiaTypesEnum.DELEGATE_REVIEW]: {
    label: 'Delegated Review',
  },
};
