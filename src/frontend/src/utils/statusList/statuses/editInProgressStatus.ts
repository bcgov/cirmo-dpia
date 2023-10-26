import { SubmitButtonTextEnum } from '../../../constant/constant';
import {
  defaultCPOReviewModal,
  defaultIncompleteModal,
  defaultMPOReviewModal,
  submitPiaIntakeModal,
} from '../modals';

export const editInProgressStatus = () => {
  return {
    title: 'Edit in progress',
    buttonText: SubmitButtonTextEnum.FORM,
    comments: true,
    class: 'statusBlock__edit',
    modal: {
      title: 'Change status to “Edit in progress”?',
      description:
        'Make changes yourself or work with your MPO to edit your PIA until it is ready for another review.',
      confirmLabel: 'Yes, continue',
      cancelLabel: 'Cancel',
    },
    Privileges: {
      MPO: {
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
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
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
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
          },
        ],
      },
      DRAFTER: {
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
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
          },
        ],
      },
    },
  };
};
