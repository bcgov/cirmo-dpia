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
    Privileges: {
      MPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: true,
            params: {
              showProgramAreaReview: true,
              showMpoReview: true,
              editProgramAreaReviewers: true,
              editMpoReview: true,
              editCpoReview: false,
            },
          },
        },
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
      },
      CPO: {
        Pages: {
          review: {
            accessControl: true,
            params: {
              showProgramAreaReview: true,
              showMpoReview: true,
            },
          },
        },
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
      },
      DRAFTER: {
        Pages: {
          review: {
            accessControl: false,
          },
        },
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
    },
  };
};
