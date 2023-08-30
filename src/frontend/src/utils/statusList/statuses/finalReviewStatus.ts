import { finalReviewCompleted } from '../utils';
import { SubmitButtonTextEnum } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { defaultFinalReviewModal } from '../modals';

export const finalReviewStatus = (pia: IPiaForm | null) => {
  return {
    title: 'Final Review',
    comments: true,
    class: 'statusBlock__finalReview',
    buttonText: SubmitButtonTextEnum.COMPLETE_PIA,
    modal: defaultFinalReviewModal,
    finalReviewCompleted: finalReviewCompleted(pia),
    Pages: {
      review: {
        accessControl: true,
        viewProgramAreaReviews: true,
      },
    },
    Privileges: {
      MPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: true,
            params: {
              editProgramAreaReview: true,
            },
          },
        },
        changeStatus: [
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
        ],
      },
      CPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: true,
            params: {
              editProgramAreaReview: true,
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
        ],
      },
      DRAFTER: {
        Pages: {
          review: {
            accessControl: true,
            params: {
              editProgramAreaReview: true,
            },
          },
        },
      },
    },
  };
};
