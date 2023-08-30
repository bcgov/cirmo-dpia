import { SubmitButtonTextEnum } from '../../../constant/constant';
import {
  defaultCPOReviewModal,
  defaultEditInProgressModal,
  defaultIncompleteModal,
} from '../modals';
import { BannerText } from '../../../pages/PIAForm/BannerStatus/messages';

export const cpoReviewStatus = () => {
  return {
    title: 'CPO Review',
    banner: BannerText.CPOReviewStatusCalloutText.Drafter.en,
    class: 'statusBlock__CPOReview',
    comments: true,
    buttonText: SubmitButtonTextEnum.FINISH_REVIEW,
    modal: defaultCPOReviewModal,
    Pages: {
      review: {
        accessControl: false,
      },
    },
    Privileges: {
      MPO: {
        banner: BannerText.CPOReviewStatusCalloutText.MPO.en,
        changeStatus: [],
        Pages: {
          review: {
            accessControl: true,
            params: {
              editProgramAreaReviewers: false,
              editMpoReview: false,
              editCpoReview: false,
            },
          },
        },
      },
      CPO: {
        showSubmitButton: true,
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
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
          },
          {
            status: 'EDIT_IN_PROGRESS',
            modal: defaultEditInProgressModal,
          },
        ],
        Pages: {
          review: {
            accessControl: true,
            params: {
              editProgramAreaReviewers: true,
              editMpoReview: false,
              editCpoReview: true,
            },
          },
        },
      },
    },
  };
};
