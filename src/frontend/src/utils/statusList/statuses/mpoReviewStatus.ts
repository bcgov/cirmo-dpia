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
  submitPiaIntakeModal,
} from '../modals';

export const mpoReviewStatus = (pia: IPiaForm | null) => {
  return {
    title: 'MPO Review',
    class: 'statusBlock__MPOReview',
    comments: true,
    // in MPO status the button text will different
    buttonText: checkButtonText(pia) || SubmitButtonTextEnum.FINISH_REVIEW,
    modal: defaultMPOReviewModal,
    submitModalType:
      pia?.hasAddedPiToDataElements === false
        ? 'SubmitForFinalReview'
        : 'SubmitForCPOReview',
    Privileges: {
      MPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: true,
            readOnly: true,
            params: {
              showProgramAreaReview: true,
              showMpoReview: true,
              editProgramAreaReviewers: true,
              editMpoReview: true,
              editCpoReview: false,
            },
          },
          nextSteps: {
            accessControl: true,
            readOnly: true,
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
            // Added for submitModal scenarios; dropdown display is irrelevant.
            status: 'MPO_REVIEW',
            modal: defaultMPOReviewModal,
            submitModal: submitPiaIntakeModal,
          },
          {
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
            submitModal: submitPiaIntakeModal,
          },
        ],
      },
      CPO: {
        Pages: {
          review: {
            accessControl: true,
            readOnly: true,
            params: {
              showProgramAreaReview: true,
              showMpoReview: true,
            },
          },
          nextSteps: {
            accessControl: true,
            readOnly: true,
          },
          ppq: {
            accessControl: true,
            readOnly: true,
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
            readOnly: true,
          },
          nextSteps: {
            accessControl: true,
            readOnly: true,
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
