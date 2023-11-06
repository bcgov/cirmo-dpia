import { checkReviewStatus } from '../utils';
import { SubmitButtonTextEnum } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import {
  defaultCPOReviewModal,
  defaultEditInProgressModal,
  defaultDraftingInProgressModal,
  defaultMPOReviewModal,
  resetReviewEditInPRogressModal,
  submitPiaIntakeModal,
} from '../modals';
import { BannerText } from '../../../pages/PIAForm/helpers/messages';
import Tooltip from '../../../components/common/Tooltip/messages';

export const draftingInProgressStatus = (pia: IPiaForm | null) => {
  return {
    title: 'Drafting in Progress',
    class: 'statusBlock__draftingInProgress',
    banner: BannerText.DraftingInProgressStatusCalloutText.Drafter.en,
    buttonText: SubmitButtonTextEnum.FORM,
    modal: defaultDraftingInProgressModal,
    comments: true,
    tooltip: Tooltip.DraftingInProgress.tooltipText,
    Privileges: {
      MPO: {
        banner: BannerText.DraftingInProgressStatusCalloutText.Drafter.en, //DRAFTING_IN_PROGRESS only have one banner for both mpo and drafter
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: false,
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
            status: 'MPO_REVIEW',
            modal: defaultMPOReviewModal,
            submitModal: submitPiaIntakeModal,
          },
          {
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
          },
          {
            // Added for submitModal scenarios; dropdown display is irrelevant.
            status: 'DRAFTING_IN_PROGRESS',
            modal: defaultDraftingInProgressModal,
            submitModal: submitPiaIntakeModal,
          },
        ],
      },
      CPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: false,
          },
          ppq: {
            accessControl: false,
          },
          nextSteps: {
            accessControl: true,
            readOnly: true,
          },
        },
        changeStatus: [
          {
            status: 'MPO_REVIEW',
            modal: defaultMPOReviewModal,
            submitModal: submitPiaIntakeModal,
          },
          {
            status: 'EDIT_IN_PROGRESS',
            modal: defaultEditInProgressModal,
          },
          {
            status: 'DRAFTING_IN_PROGRESS',
            modal: defaultDraftingInProgressModal,
            submitModal: submitPiaIntakeModal,
          },
        ],
      },
      DRAFTER: {
        showSubmitButton: true,
        showDropdownMenu: false, // Hides the dropdown menu for this role's scenario.
        Pages: {
          review: {
            accessControl: false,
          },
          nextSteps: {
            accessControl: true,
            readOnly: true,
          },
          ppq: {
            accessControl: false,
          },
        },
        changeStatus: [
          // Added for submitModal scenarios; dropdown display is irrelevant.
          {
            status: 'DRAFTING_IN_PROGRESS',
            modal: defaultDraftingInProgressModal,
            submitModal: submitPiaIntakeModal,
          },
          {
            status: 'MPO_REVIEW',
            modal: defaultMPOReviewModal,
            submitModal: submitPiaIntakeModal,
          },
        ],
      },
    },
  };
};
