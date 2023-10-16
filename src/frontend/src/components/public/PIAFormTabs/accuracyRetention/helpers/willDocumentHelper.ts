import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAccuracyCorrectionAndRetention } from '../accuracy-retention-interface';

export const getWillDocument = (
  accuracyCorrectionAndRetentionForm: IAccuracyCorrectionAndRetention,
  stateChangeHandler: (value: any, path: string) => void,
) => {
  return [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'WillDocument',
      groupLabel:
        "If you can't correct personal data, FOIPPA mandates noting the correction request on the record; will you ensure this documentation?",
      isDefault:
        accuracyCorrectionAndRetentionForm?.correction?.willDocument ===
          YesNoInput.YES ||
        !accuracyCorrectionAndRetentionForm?.correction?.willDocument,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'correction.willDocument'),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'WillDocument',
      groupLabel:
        "If you can't correct personal data, FOIPPA mandates noting the correction request on the record; will you ensure this documentation?",
      isDefault:
        accuracyCorrectionAndRetentionForm?.correction?.willDocument ===
        YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'correction.willDocument'),
    },
  ];
};
