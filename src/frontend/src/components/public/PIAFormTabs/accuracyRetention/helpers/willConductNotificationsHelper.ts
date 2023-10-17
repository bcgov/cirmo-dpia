import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAccuracyCorrectionAndRetention } from '../accuracy-retention-interface';

export const getWillConductNotifications = (
  accuracyCorrectionAndRetentionForm: IAccuracyCorrectionAndRetention,
  stateChangeHandler: (value: any, path: string) => void,
) => {
  return [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'WillConductNotifications',
      groupLabel:
        "If someone requests a correction and you've shared their data in the past year, FOIPPA mandates notifying the third party; will you ensure compliance?",
      isDefault:
        accuracyCorrectionAndRetentionForm?.correction
          ?.willConductNotifications === YesNoInput.YES ||
        !accuracyCorrectionAndRetentionForm?.correction
          ?.willConductNotifications,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'correction.willConductNotifications',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'WillConductNotifications',
      groupLabel:
        "If someone requests a correction and you've shared their data in the past year, FOIPPA mandates notifying the third party; will you ensure compliance?",
      isDefault:
        accuracyCorrectionAndRetentionForm?.correction
          ?.willConductNotifications === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'correction.willConductNotifications',
        ),
    },
  ];
};
