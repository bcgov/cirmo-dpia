import { defaultCompleteModal } from '../modals';

export const completeStatus = () => {
  return {
    title: 'Complete',
    class: 'statusBlock__completed',
    modal: defaultCompleteModal,
    comments: false,
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
