import { checkButtonText, checkReviewStatus } from '../utils';
import { SubmitButtonTextEnum } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import {
  defaultCPOReviewModal,
  defaultEditInProgressModal,
  defaultIncompleteModal,
  defaultMPOReviewModal,
  resetReviewEditInPRogressModal,
  resetReviewIncompleteModal,
} from '../modals';

export const mpoReviewStatus = (pia: IPiaForm | null) => {
  return {
    title: 'MPO Review',
    class: 'statusBlock__MPOReview',
    comments: true,
    // in MPO status the button text will different
    buttonText: checkButtonText(pia) || SubmitButtonTextEnum.FINISH_REVIEW,
    modal: defaultMPOReviewModal,
    Pages: {
      review: {
        accessControl: false,
      },
    },
    Privileges: {
      MPO: {
        showSubmitButton: true,
        changeStatus: [
          {
            status: 'INCOMPLETE',
            modal: checkReviewStatus(pia)
              ? resetReviewIncompleteModal
              : defaultIncompleteModal,
          },
          {
            status: 'EDIT_IN_PROGRESS',
            modal: checkReviewStatus(pia)
              ? resetReviewEditInPRogressModal
              : defaultEditInProgressModal,
          },
          {
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
          },
        ],
        Pages: {
          review: {
            accessControl: true,
            params: {
              editProgramAreaReviewers: true,
              editMpoReview: true,
              editCpoReview: false,
            },
          },
        },
      },
      DRAFTER: {
        changeStatus: [
          {
            status: 'EDIT_IN_PROGRESS',
            modal: checkReviewStatus(pia)
              ? resetReviewEditInPRogressModal
              : defaultEditInProgressModal,
          },
          {
            status: 'INCOMPLETE',
            modal: checkReviewStatus(pia)
              ? resetReviewIncompleteModal
              : defaultIncompleteModal,
          },
        ],
      },
      CPO: {
        changeStatus: [
          {
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
          },
          {
            status: 'INCOMPLETE',
            modal: checkReviewStatus(pia)
              ? resetReviewIncompleteModal
              : defaultIncompleteModal,
          },
          {
            status: 'EDIT_IN_PROGRESS',
            modal: checkReviewStatus(pia)
              ? resetReviewEditInPRogressModal
              : defaultEditInProgressModal,
          },
        ],
        Pages: {
          review: {
            accessControl: true,
          },
        },
      },
    },
  };
};
