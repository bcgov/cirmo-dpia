import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAgreementsAndInformationBanks } from './IAgreementsInfo-interface';

export const getWillResultPIBRadio = (
  agreementsAndInformationBanksForm: IAgreementsAndInformationBanks,
  stateChangeHandler: (value: any, path: string) => void,
) => {
  return [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'will-resultPIB-radio',
      groupLabel:
        'Will your initiative result in a personal information bank (PIB)?',
      isDefault:
        agreementsAndInformationBanksForm?.personalInformationBanks
          ?.willResultInPIB === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'personalInformationBanks.willResultInPIB',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'will-resultPIB-radio',
      groupLabel:
        'Will your initiative result in a personal information bank (PIB)?',
      isDefault:
        agreementsAndInformationBanksForm?.personalInformationBanks
          ?.willResultInPIB === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'personalInformationBanks.willResultInPIB',
        ),
    },
  ];
};
