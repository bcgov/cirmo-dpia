import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAccuracyCorrectionAndRetention } from '../accuracy-retention-interface';

export const getWillProvideInformation = (
  accuracyCorrectionAndRetentionForm: IAccuracyCorrectionAndRetention,
  stateChangeHandler: (value: any, path: string) => void,
) => {
  return [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'WillProvideInformation',
      groupLabel:
        'Does your initiative use personal information to make decisions that directly affect an individual?',
      isDefault:
        accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ===
          YesNoInput.YES ||
        !accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'retention.usePIForDecision'),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'WillProvideInformation',
      groupLabel:
        'Does your initiative use personal information to make decisions that directly affect an individual?',
      isDefault:
        accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ===
        YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'retention.usePIForDecision'),
    },
  ];
};
