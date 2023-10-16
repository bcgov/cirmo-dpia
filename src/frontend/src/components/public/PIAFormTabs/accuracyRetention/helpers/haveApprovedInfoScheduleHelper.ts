import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAccuracyCorrectionAndRetention } from '../accuracy-retention-interface';

export const getHaveApprovedInfoSchedule = (
  accuracyCorrectionAndRetentionForm: IAccuracyCorrectionAndRetention,
  stateChangeHandler: (value: any, path: string) => void,
) => {
  return [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'HaveApprovedInfoSchedule',
      groupLabel:
        'Do you have an approved information schedule in place related to personal information used to make decisions?',
      isDefault:
        accuracyCorrectionAndRetentionForm?.retention
          ?.haveApprovedInfoSchedule === YesNoInput.YES ||
        !accuracyCorrectionAndRetentionForm?.retention
          ?.haveApprovedInfoSchedule,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'retention.haveApprovedInfoSchedule',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'HaveApprovedInfoSchedule',
      groupLabel:
        'Do you have an approved information schedule in place related to personal information used to make decisions?',
      isDefault:
        accuracyCorrectionAndRetentionForm?.retention
          ?.haveApprovedInfoSchedule === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'retention.haveApprovedInfoSchedule',
        ),
    },
  ];
};
