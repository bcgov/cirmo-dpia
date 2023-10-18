import { SubmitButtonTextEnum } from '../../../constant/constant';
import { defaultPendingCompletionModal } from '../modals';

export const pendingCompletionStatus = () => {
  return {
    title: 'Pending completion',
    class: 'statusBlock__pending-completion',
    modal: defaultPendingCompletionModal,
    submitModalType: 'completePIA',
    comments: false,
    buttonText: SubmitButtonTextEnum.COMPLETE_PIA,
    Privileges: {
      MPO: {
        changeStatus: [],
        Pages: {
          review: {
            accessControl: true,
            params: {
              showPrintPreview: true,
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
            },
          },
        },
      },
      CPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: true,
            params: {
              showPrintPreview: true,
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
            },
          },
        },
        changeStatus: [
          {
            status: 'CPO_REVIEW',
            modal: {
              title: 'Unlock PIA?',
              description:
                'The status will be changed to "CPO Review" and this PIA will be unlocked.',
              confirmLabel: 'Yes, unlock',
              cancelLabel: 'Cancel',
            },
          },
          {
            status: 'INCOMPLETE',
            modal: {
              title: 'Unlock PIA? Reviews will not be saved.',
              description:
                'Changing status to Incomplete will erase all data in the "Review" section and all reviewers will have to complete this section again.',
              confirmLabel: 'Yes, unlock',
              cancelLabel: 'Cancel',
            },
          },
          {
            status: 'EDIT_IN_PROGRESS',
            modal: {
              title: 'Unlock PIA? Reviews will not be saved.',
              description:
                'Changing status to Edit in progress will erase all data in the "Review" section and all reviewers will have to complete this section again.',
              confirmLabel: 'Yes, unlock',
              cancelLabel: 'Cancel',
            },
          },
          {
            status: 'MPO_REVIEW',
            modal: {
              title: 'Unlock PIA?',
              description:
                'The status will be changed to "MPO Review" and this PIA will be unlocked.',
              confirmLabel: 'Yes, unlock',
              cancelLabel: 'Cancel',
            },
          },
          {
            status: 'FINAL_REVIEW',
            modal: {
              title: 'Change status to Final Review?',
              description:
                'The status will be changed back to Final Review. Review data will be retained and PIA will remain locked.',
              confirmLabel: 'Yes, change',
              cancelLabel: 'Cancel',
            },
          },
        ],
      },
      DRAFTER: {
        Pages: {
          review: {
            accessControl: true,
            params: {
              showPrintPreview: true,
              showProgramAreaReview: true,
            },
          },
        },
      },
    },
  };
};
