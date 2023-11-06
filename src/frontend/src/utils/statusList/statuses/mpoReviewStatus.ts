import { checkButtonText, checkReviewStatus } from '../utils';
import { SubmitButtonTextEnum } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import {
  defaultCPOReviewModal,
  defaultEditInProgressModal,
  defaultDraftingInProgressModal,
  defaultMPOReviewModal,
  resetReviewEditInPRogressModal,
  resetReviewDraftingInProgressModal,
  submitPiaIntakeModal,
} from '../modals';
import Tooltip from '../../../components/common/Tooltip/messages';

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
    tooltip: Tooltip.MPOReview.tooltipText,
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
            status: 'DRAFTING_IN_PROGRESS',
            modal: checkReviewStatus(pia)
              ? resetReviewDraftingInProgressModal
              : defaultDraftingInProgressModal,
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
            status: 'DRAFTING_IN_PROGRESS',
            modal: checkReviewStatus(pia)
              ? resetReviewDraftingInProgressModal
              : defaultDraftingInProgressModal,
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
          ppq: {
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
            status: 'DRAFTING_IN_PROGRESS',
            modal: checkReviewStatus(pia)
              ? resetReviewDraftingInProgressModal
              : defaultDraftingInProgressModal,
          },
        ],
      },
    },
  };
};
