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
            accessControl: true,
            showEditButton: true,
            params: {
              showProgramAreaReview: true,
              showMpoReview: true,
              editProgramAreaReviewers: true,
              editMpoReview: false,
              editCpoReview: false,
            },
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
            showEditButton: true,
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
          {
            status: 'CPO_REVIEW',
            modal: defaultCPOReviewModal,
          },
        ],
      },
      DRAFTER: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: false,
            showEditButton: true,
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
