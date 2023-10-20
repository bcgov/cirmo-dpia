import { defaultCompleteModal } from '../modals';

export const completeStatus = () => {
  return {
    title: 'Complete',
    class: 'statusBlock__completed',
    modal: defaultCompleteModal,
    comments: false,
    readOnly: true, // READ ONLY for entire status.
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
          nextSteps: {
            accessControl: true,
          },
        },
      },
      CPO: {
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
          nextSteps: {
            accessControl: true,
          },
        },
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
          nextSteps: {
            accessControl: true,
          },
        },
      },
    },
  };
};
