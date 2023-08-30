import { checkReviewStatus } from '../utils';
import { SubmitButtonTextEnum } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import {
  defaultCPOReviewModal,
  defaultEditInProgressModal,
  defaultIncompleteModal,
  defaultMPOReviewModal,
  resetReviewEditInPRogressModal,
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
    Pages: {
      review: {
        accessControl: false,
      },
    },
    Privileges: {
      MPO: {
        banner: BannerText.InCompleteStatusCalloutText.Drafter.en, //incomplete only have one banner for both mpo and drafter
        showSubmitButton: true,
        changeStatus: [
          {
            status: 'EDIT_IN_PROGRESS',
            modal: checkReviewStatus(pia)
              ? resetReviewEditInPRogressModal
              : defaultEditInProgressModal,
          },
          {
            status: 'MPO_REVIEW',
            modal: defaultMPOReviewModal,
          },
          {
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
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
        ],
      },
      DRAFTER: {
        showSubmitButton: true,
        changeStatus: [],
      },
    },
  };
};
