import { finalReviewCompleted } from '../utils';
import { SubmitButtonTextEnum } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { defaultFinalReviewModal } from '../modals';
import Tooltip from '../../../components/common/Tooltip/messages';

export const finalReviewStatus = (pia: IPiaForm | null) => {
  return {
    title: 'Final Review',
    comments: true,
    class: 'statusBlock__finalReview',
    buttonText: SubmitButtonTextEnum.COMPLETE_PIA,
    modal: defaultFinalReviewModal,
    submitModalType: 'SubmitForPendingCompletion',
    finalReviewCompleted: finalReviewCompleted(pia),
    readOnly: true, // READ ONLY for entire status.
    tooltip: Tooltip.FinalReview.tooltipText,
    Privileges: {
      MPO: {
        showSubmitButton: true,
        Pages: {
          review: {
            accessControl: true,
            params: {
              showPrintPreview: true,
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
              editProgramAreaReview: true,
            },
          },
          nextSteps: {
            accessControl: true,
          },
        },
        changeStatus: [
          {
            status: 'DRAFTING_IN_PROGRESS',
            modal: {
              title: 'Unlock PIA? Reviews will not be saved.',
              description:
                'Changing status to "Drafting in Progress" will erase all data in the "Review" section and all reviewers will have to complete this section again.',
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
              showPrintPreview: true,
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
              editProgramAreaReview: true,
            },
          },
          ppq: {
            accessControl: true,
          },
          nextSteps: {
            accessControl: true,
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
            status: 'DRAFTING_IN_PROGRESS',
            modal: {
              title: 'Unlock PIA? Reviews will not be saved.',
              description:
                'Changing status to "Drafting in Progress" will erase all data in the "Review" section and all reviewers will have to complete this section again.',
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
              showPrintPreview: true,
              showProgramAreaReview: true,
              showMpoReview: true,
              showCpoReview: true,
              editProgramAreaReview: true,
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
