import {
  ExcludeBaseSelection,
  omitBaseKeys,
} from '../../../common/helpers/base-helper';
import { PiaIntakeEntity } from '../entities/pia-intake.entity';

export const excludePiaIntakeKeys = { updatedByDisplayName: false };

export type GetPiaIntakeRO = Omit<
  PiaIntakeEntity,
  keyof ExcludeBaseSelection | keyof typeof excludePiaIntakeKeys
>;

export const getFormattedRecords = (piaIntakeForm: PiaIntakeEntity) => {
  return omitBaseKeys<GetPiaIntakeRO>(
    piaIntakeForm,
    Object.keys(excludePiaIntakeKeys),
  );
};
