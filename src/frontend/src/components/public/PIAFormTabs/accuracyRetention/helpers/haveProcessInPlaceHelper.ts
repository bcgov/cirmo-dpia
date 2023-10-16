import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAccuracyCorrectionAndRetention } from '../accuracy-retention-interface';

export const getHaveProcessInPlace = (
  accuracyCorrectionAndRetentionForm: IAccuracyCorrectionAndRetention,
  stateChangeHandler: (value: any, path: string) => void,
) => {
  return [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'haveProcessinPlace',
      groupLabel:
        'Do you have a process in place to correct personal information?',
      isDefault:
        accuracyCorrectionAndRetentionForm?.correction?.haveProcessInPlace ===
          YesNoInput.YES ||
        !accuracyCorrectionAndRetentionForm?.correction?.haveProcessInPlace,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'correction.haveProcessInPlace'),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'haveProcessinPlace',
      groupLabel:
        'Do you have a process in place to correct personal information?',
      isDefault:
        accuracyCorrectionAndRetentionForm?.correction?.haveProcessInPlace ===
        YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'correction.haveProcessInPlace'),
    },
  ];
};
