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
import { BannerText } from '../../../pages/PIAForm/helpers/messages';

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
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
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
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
          },
          {
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
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
        },
        changeStatus: [
          // Added for submitModal scenarios; dropdown display is irrelevant.
          {
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
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
