import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAgreementsAndInformationBanks } from './IAgreementsInfo-interface';

// Helper function to generate an array of radio options for determining if the initiative will result in a Personal Information Bank (PIB)
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
