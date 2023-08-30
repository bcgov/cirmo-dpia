import { defaultCompleteModal } from '../modals';

export const completeStatus = () => {
  return {
    title: 'Complete',
    class: 'statusBlock__completed',
    modal: defaultCompleteModal,
    comments: false,
    Pages: {
      review: {
        accessControl: true,
        viewProgramAreaReviews: true,
      },
    },
    Privileges: {
      MPO: {
        changeStatus: [],
        Pages: {
          review: {
            accessControl: true,
            params: {
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
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
            },
          },
        },
      },
    },
  };
};
