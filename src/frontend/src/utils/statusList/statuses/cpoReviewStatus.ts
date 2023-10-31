import { SubmitButtonTextEnum } from '../../../constant/constant';
import {
  defaultCPOReviewModal,
  defaultEditInProgressModal,
  defaultDraftingInProgressModal,
} from '../modals';
import { BannerText } from '../../../pages/PIAForm/helpers/messages';

export const cpoReviewStatus = () => {
  return {
    title: 'CPO Review',
    banner: BannerText.CPOReviewStatusCalloutText.Drafter.en,
    class: 'statusBlock__CPOReview',
    comments: true,
    buttonText: SubmitButtonTextEnum.FINISH_REVIEW,
    modal: defaultCPOReviewModal,
    submitModalType: 'SubmitForFinalReview',
    readOnly: true, // READ ONLY for entire status.
    Privileges: {
      MPO: {
        banner: BannerText.CPOReviewStatusCalloutText.MPO.en,
        changeStatus: [],
        Pages: {
          review: {
            accessControl: true,
            params: {
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
            },
          },
          nextSteps: {
            accessControl: true,
          },
        },
      },
      CPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: true,
            params: {
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
              editProgramAreaReviewers: true,
              editMpoReview: false,
              editCpoReview: true,
            },
          },
          ppq: {
            accessControl: true,
          },
          nextSteps: {
            accessControl: true,
          },
        },
        changeStatus: [
          {
            status: 'MPO_REVIEW',
            modal: {
              title: 'Change status to MPO Review?',
              description:
                'This PIA will be removed from your list and you will no longer be able to view it.',
              confirmLabel: 'Yes, continue',
              cancelLabel: 'Cancel',
            },
          },
          {
            status: 'DRAFTING_IN_PROGRESS',
            modal: defaultDraftingInProgressModal,
          },
          {
            status: 'EDIT_IN_PROGRESS',
            modal: defaultEditInProgressModal,
          },
        ],
      },
      DRAFTER: {
        Pages: {
          review: {
            accessControl: false,
          },
          nextSteps: {
            accessControl: true,
          },
          ppq: {
            accessControl: true,
            readOnly: true,
          },
        },
      },
    },
  };
};
