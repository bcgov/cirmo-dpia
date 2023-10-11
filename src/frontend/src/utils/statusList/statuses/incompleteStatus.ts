import { checkReviewStatus } from '../utils';
import { SubmitButtonTextEnum } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import {
  defaultCPOReviewModal,
  defaultEditInProgressModal,
  defaultIncompleteModal,
  defaultMPOReviewModal,
  resetReviewEditInPRogressModal,
  submitPiaIntakeModal,
} from '../modals';
import { BannerText } from '../../../pages/PIAForm/BannerStatus/messages';

export const incompleteStatus = (pia: IPiaForm | null) => {
  return {
    title: 'Incomplete',
    class: 'statusBlock__incomplete',
    banner: BannerText.InCompleteStatusCalloutText.Drafter.en,
    buttonText: SubmitButtonTextEnum.FORM,
    modal: defaultIncompleteModal,
    comments: true,
    Privileges: {
      MPO: {
        banner: BannerText.InCompleteStatusCalloutText.Drafter.en, //incomplete only have one banner for both mpo and drafter
        showSubmitButton: true,
        changeStatus: [
          {
            status: 'EDIT_IN_PROGRESS', // change to EDIT_IN_PROGRESS
            modal: checkReviewStatus(pia)
              ? resetReviewEditInPRogressModal
              : defaultEditInProgressModal,
          },
          {
            status: 'MPO_REVIEW', // change to MPO_REVIEW
            modal: defaultMPOReviewModal,
          },
          {
            status: 'CPO_REVIEW', // change to CPO_REVIEW
            modal: defaultCPOReviewModal,
          },
          {
            status: 'INCOMPLETE', // change to INCOMPLETE
            modal:
              pia?.hasAddedPiToDataElements === false
                ? defaultIncompleteModal
                : submitPiaIntakeModal,
          },
        ],
      },
      CPO: {
        showSubmitButton: true,
        changeStatus: [
          {
            status: 'MPO_REVIEW',
            modal: defaultMPOReviewModal,
          },
          {
            status: 'EDIT_IN_PROGRESS',
            modal: defaultEditInProgressModal,
          },
          {
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
          },
          {
            status: 'INCOMPLETE',
            modal:
              pia?.hasAddedPiToDataElements === false
                ? defaultIncompleteModal
                : submitPiaIntakeModal,
          },
        ],
      },
      DRAFTER: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: false,
          },
        },
        changeStatus: [],
      },
    },
  };
};
