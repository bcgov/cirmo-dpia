import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { BannerText } from '../pages/PIAForm/BannerStatus/messages';
import { PiaStatuses, SubmitButtonTextEnum } from '../constant/constant';
import { IReviewSection } from '../components/public/PIAFormTabs/review/interfaces';

export type PageAccessControl = {
  [page: string]: {
    accessControl: boolean;
    params?: any;
    viewProgramAreaReviews?: boolean;
  };
};

export type Privileges = {
  MPO?: {
    changeStatus: Array<ChangeStatus>;
    banner?: string;
    Pages?: PageAccessControl;
  };
  CPO?: {
    changeStatus: Array<ChangeStatus>;
    banner?: string;
    Pages?: PageAccessControl;
  };
  DRAFTER?: {
    changeStatus: Array<ChangeStatus>;
    banner?: string;
    Pages?: PageAccessControl;
  };
};

interface Modal {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
}

export interface ChangeStatus {
  status: string;
  modal: Modal;
}

interface StatusList {
  [name: string]: {
    title: string;
    class: string;
    buttonText?: SubmitButtonTextEnum;
    banner?: string;
    modal: Modal;
    Privileges: Privileges;
    Pages?: PageAccessControl;
    finalReviewCompleted?: boolean;
    comments: boolean;
    showCPOReview?: boolean;
    showMPOReview?: boolean;
  };
}

const defaultMPOReviewModal: Modal = {
  title: 'Submit for MPO review?',
  description:
    'Your Ministry Privacy Officer (MPO) will be able to review and edit in order to help you with the PIA process.',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

const defaultIncompleteModal: Modal = {
  title: 'Change status to “Incomplete”?',
  description:
    'Only the original PIA drafter will be able to view or edit the PIA.',
  confirmLabel: 'Yes, continue',
  cancelLabel: 'Cancel',
};

const resetReviewIncompleteModal: Modal = {
  title: 'Unlock PIA? Reviews will not be saved.',
  description:
    'Changing status to Incomplete will erase all data in the “Review” section and all reviewers will have to complete this section again.',
  confirmLabel: 'Yes, unlock',
  cancelLabel: 'Cancel',
};

const defaultEditInProgressModal: Modal = {
  title: 'Change status to “Edit in progress”?',
  description:
    'Make changes yourself or work with your MPO to edit your PIA until it is ready for another review.',
  confirmLabel: 'Yes, continue',
  cancelLabel: 'Cancel',
};

const resetReviewEditInPRogressModal: Modal = {
  title: 'Unlock PIA? Reviews will not be saved.',
  description:
    'Changing status to Edit in Progress will erase all data in the “Review” section and all reviewers will have to complete this section again.',
  confirmLabel: 'Yes, unlock',
  cancelLabel: 'Cancel',
};

const defaultCPOReviewModal: Modal = {
  title: 'Submit for CPO review?',
  description:
    'An analyst from the Corporate Privacy Office branch will be able to review and edit your PIA.',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

const defaultFinalReviewModal: Modal = {
  title: 'Finish review and lock PIA?',
  description:
    'The status will be changed to "Final Review" and this PIA will be locked. Program area roles you designated will be required to review the PIA.',
  confirmLabel: 'Yes, finish',
  cancelLabel: 'Cancel',
};

const defaultPendingCompletionModal: Modal = {
  title: 'Submit for completion?',
  description:
    'Status will change to “Pending Completion”. Once CPO has confirmed all necessary ministry reviews have occurred and data has been uploaded to the PID, PIA will move to “Complete” status.',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

const defaultCompleteModal: Modal = {
  title: 'Complete PIA?',
  description:
    'Before completing the PIA, make sure all necessary ministry reviews have occurred and confirm that data has been uploaded to the PID. This PIA will move to “Complete” status.',
  confirmLabel: 'Yes, complete',
  cancelLabel: 'Cancel',
};

const checkButtonText = (pia: IPiaForm | null) => {
  // in MPO status the button text will different
  // for delegate PIA, the button text finish review
  // for standard PIA, the button text still as submit
  // reminder: for CPO review status, it should only for standard PIA, however
  // the delegate PIA can also in CPO_review status due to the requirement
  // the cpo_review status button text should be finish review unless special requirement
  if (pia === null) return;
  if (
    pia.status === PiaStatuses.MPO_REVIEW &&
    pia.hasAddedPiToDataElements === false
  )
    return SubmitButtonTextEnum.FINISH_REVIEW;

  if (
    pia.status === PiaStatuses.MPO_REVIEW &&
    pia.hasAddedPiToDataElements !== false
  )
    return SubmitButtonTextEnum.FORM;

  return SubmitButtonTextEnum.FORM;
};
const checkReviewStatus = (pia: IPiaForm | null): boolean => {
  // this function use to check if the review tab has any data, if so, show warning modal, otherwise
  // display default modal
  if (
    (pia &&
      (pia?.status === PiaStatuses.MPO_REVIEW ||
        pia?.status === PiaStatuses.FINAL_REVIEW ||
        pia?.status === PiaStatuses.CPO_REVIEW) &&
      ((pia?.review?.programArea?.selectedRoles &&
        pia?.review?.programArea?.selectedRoles?.length > 0) ||
        pia?.review?.mpo?.isAcknowledged === true)) ||
    (pia?.review?.cpo &&
      Object(pia?.review?.cpo)?.length > 0 &&
      Object(pia?.review?.cpo)?.some(
        (review: IReviewSection) => review.isAcknowledged === true,
      ))
  ) {
    return true;
  }
  return false;
};

const defaultEmptyModal: Modal = {
  title: '',
  description: '',
  confirmLabel: '',
  cancelLabel: '',
};

interface Status {
  prevState: string;
  nextState: string;
  delegated: boolean;
}

const finalReviewCompleted = (pia: IPiaForm | null): boolean => {
  let reviewProgramAreaDone = false;
  const selectedRoles = pia?.review?.programArea?.selectedRoles || [];
  reviewProgramAreaDone = selectedRoles.every(
    (role) =>
      pia?.review?.programArea?.reviews?.[role]?.isAcknowledged === true,
  );
  if (reviewProgramAreaDone && pia?.review?.mpo?.isAcknowledged === true) {
    return true;
  }
  return false;
};

export const statusList = (pia: IPiaForm | null): StatusList => {
  return {
    MPO_REVIEW: {
      title: 'MPO Review',
      class: 'statusBlock__MPOReview',
      comments: true,
      // in MPO status the button text will different
      buttonText: checkButtonText(pia) || SubmitButtonTextEnum.FINISH_REVIEW,
      modal: defaultMPOReviewModal,
      Pages: {
        review: {
          accessControl: false,
          params: {
            editReviewNote: true,
            editProgramArea: true,
          },
        },
      },
      Privileges: {
        MPO: {
          changeStatus: [
            {
              status: 'INCOMPLETE',
              modal: checkReviewStatus(pia)
                ? resetReviewIncompleteModal
                : defaultIncompleteModal,
            },
            {
              status: 'EDIT_IN_PROGRESS',
              modal: checkReviewStatus(pia)
                ? resetReviewEditInPRogressModal
                : defaultEditInProgressModal,
            },
            {
              status: 'CPO_REVIEW',
              modal: defaultCPOReviewModal,
            },
          ],
          Pages: {
            review: {
              accessControl: true,
            },
          },
        },
        DRAFTER: {
          changeStatus: [
            {
              status: 'EDIT_IN_PROGRESS',
              modal: checkReviewStatus(pia)
                ? resetReviewEditInPRogressModal
                : defaultEditInProgressModal,
            },
          ],
        },
        CPO: {
          changeStatus: [
            {
              status: 'CPO_REVIEW',
              modal: defaultCPOReviewModal,
            },
            {
              status: 'INCOMPLETE',
              modal: checkReviewStatus(pia)
                ? resetReviewIncompleteModal
                : defaultIncompleteModal,
            },
            {
              status: 'EDIT_IN_PROGRESS',
              modal: checkReviewStatus(pia)
                ? resetReviewEditInPRogressModal
                : defaultEditInProgressModal,
            },
          ],
          Pages: {
            review: {
              accessControl: true,
            },
          },
        },
      },
    },
    INCOMPLETE: {
      title: 'Incomplete',
      class: 'statusBlock__incomplete',
      banner: BannerText.InCompleteStatusCalloutText.Drafter.en,
      buttonText: SubmitButtonTextEnum.FORM,
      modal: defaultIncompleteModal,
      comments: true,
      Pages: {
        review: {
          accessControl: false,
        },
      },
      Privileges: {
        MPO: {
          banner: BannerText.InCompleteStatusCalloutText.Drafter.en, //incomplete only have one banner for both mpo and drafter
          changeStatus: [
            {
              status: 'EDIT_IN_PROGRESS',
              modal: checkReviewStatus(pia)
                ? resetReviewEditInPRogressModal
                : defaultEditInProgressModal,
            },
            {
              status: 'CPO_REVIEW',
              modal: defaultCPOReviewModal,
            },
          ],
        },
        CPO: {
          changeStatus: [
            {
              status: 'MPO_REVIEW',
              modal: defaultMPOReviewModal,
            },
            {
              status: 'EDIT_IN_PROGRESS',
              modal: defaultEditInProgressModal,
            },
            {
              status: 'CPO_REVIEW',
              modal: defaultCPOReviewModal,
            },
          ],
        },
      },
    },
    COMPLETE: {
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
        },
      },
    },
    PENDING_COMPLETION: {
      title: 'Pending completion',
      class: 'statusBlock__pending-completion',
      modal: defaultPendingCompletionModal,
      comments: false,
      buttonText: SubmitButtonTextEnum.COMPLETE_PIA,
      Pages: {
        review: {
          accessControl: true,
          viewProgramAreaReviews: true,
        },
      },
      Privileges: {
        MPO: {
          changeStatus: [],
        },
        CPO: {
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
      },
    },
    EDIT_IN_PROGRESS: {
      title: 'Edit in progress',
      buttonText: SubmitButtonTextEnum.FORM,
      comments: true,
      class: 'statusBlock__edit',
      Pages: {
        review: {
          accessControl: false,
        },
      },
      modal: {
        title: 'Change status to “Edit in progress”?',
        description:
          'Make changes yourself or work with your MPO to edit your PIA until it is ready for another review.',
        confirmLabel: 'Yes, continue',
        cancelLabel: 'Cancel',
      },
      Privileges: {
        MPO: {
          changeStatus: [
            {
              status: 'INCOMPLETE',
              modal: defaultIncompleteModal,
            },
            {
              status: 'MPO_REVIEW',
              modal: defaultMPOReviewModal,
            },
            {
              status: 'CPO_REVIEW',
              modal: defaultCPOReviewModal,
            },
          ],
        },
        CPO: {
          changeStatus: [
            {
              status: 'MPO_REVIEW',
              modal: defaultMPOReviewModal,
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
      },
    },
    CPO_REVIEW: {
      title: 'CPO Review',
      banner: BannerText.CPOReviewStatusCalloutText.Drafter.en,
      class: 'statusBlock__CPOReview',
      comments: true,
      buttonText: SubmitButtonTextEnum.FINISH_REVIEW,
      modal: defaultCPOReviewModal,
      Pages: {
        review: {
          accessControl: false,
          params: {
            editReviewNote: true,
            editProgramArea: true,
          },
        },
      },
      Privileges: {
        MPO: {
          banner: BannerText.CPOReviewStatusCalloutText.MPO.en,
          changeStatus: [],
          Pages: {
            review: {
              accessControl: true,
            },
          },
        },
        CPO: {
          changeStatus: [
            {
              status: 'MPO_REVIEW',
              modal: {
                title: 'Change status to MPO Review?',
                description:
                  'This PIA will be removed from your list and you will no longer be able to view it.',
                confirmLabel: 'Yes, continue',
                cancelLabel: 'Cancel',
              },
            },
            {
              status: 'INCOMPLETE',
              modal: defaultIncompleteModal,
            },
            {
              status: 'EDIT_IN_PROGRESS',
              modal: defaultEditInProgressModal,
            },
          ],
          Pages: {
            review: {
              accessControl: true,
            },
          },
        },
      },
    },
    FINAL_REVIEW: {
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
          params: {
            editReviewNote: true,
          },
        },
      },
      Privileges: {
        MPO: {
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
      },
    },
  };
};
