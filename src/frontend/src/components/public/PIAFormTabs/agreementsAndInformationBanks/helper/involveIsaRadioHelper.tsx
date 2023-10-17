import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { IAgreementsAndInformationBanks } from './IAgreementsInfo-interface';

export const getInvolvesRadioHelper = (
  agreementsAndInformationBanksForm: IAgreementsAndInformationBanks,
  stateChangeHandler: (value: any, path: string) => void,
) => {
  return [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'involve-isa-radio',
      groupLabel:
        'Does your initiative involve an information sharing agreement (ISA)?',
      isDefault:
        agreementsAndInformationBanksForm?.informationSharingAgreement
          ?.doesInvolveISA === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'informationSharingAgreement.doesInvolveISA',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'involve-isa-radio',
      groupLabel:
        'Does your initiative involve an information sharing agreement (ISA)?',
      isDefault:
        agreementsAndInformationBanksForm?.informationSharingAgreement
          ?.doesInvolveISA === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'informationSharingAgreement.doesInvolveISA',
        ),
    },
  ];
};
