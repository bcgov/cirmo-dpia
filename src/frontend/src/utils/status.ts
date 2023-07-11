import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { BannerText } from '../pages/PIAForm/BannerStatus/messages';
import { PiaStatuses } from '../constant/constant';

export type Privileges = {
  MPO?: {
    changeStatus: Array<ChangeStatus>;
    banner?: string;
  };
  CPO?: {
    changeStatus: Array<ChangeStatus>;
    banner?: string;
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
    banner?: string;
    modal: Modal;
    Privileges: Privileges;
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

const checkReviewStatus = (pia: IPiaForm | null): boolean => {
  // this function use to check if the review tab has any data, if so, show warning modal, otherwise
  // display default modal
  if (
    pia &&
    (pia?.status === PiaStatuses.MPO_REVIEW ||
      pia?.status === PiaStatuses.FINAL_REVIEW ||
      pia?.status === PiaStatuses.CPO_REVIEW) &&
    ((pia?.review?.programArea?.selectedRoles &&
      pia?.review?.programArea?.selectedRoles?.length > 0) ||
      pia?.review?.mpo?.isAcknowledged === true)
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

export const statusList = (pia: IPiaForm | null): StatusList => {
  return {
    MPO_REVIEW: {
      title: 'MPO Review',
      class: 'statusBlock__MPOReview',
      modal: defaultMPOReviewModal,
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
        },
      },
    },
    INCOMPLETE: {
      title: 'Incomplete',
      class: 'statusBlock__incomplete',
      banner: BannerText.InCompleteStatusCalloutText.Drafter.en,
      modal: defaultIncompleteModal,
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
    COMPLETED: {
      title: 'Completed',
      class: 'statusBlock__success',
      modal: defaultEmptyModal,
      Privileges: {
        MPO: {
          changeStatus: [
            {
              status: 'INCOMPLETE',
              modal: defaultEmptyModal,
            },
            {
              status: 'EDIT_IN_PROGRESS',
              modal: defaultEmptyModal,
            },
            {
              status: 'CPO_REVIEW',
              modal: defaultEmptyModal,
            },
          ],
        },
      },
    },
    EDIT_IN_PROGRESS: {
      title: 'Edit in progress',
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
      modal: defaultCPOReviewModal,
      Privileges: {
        MPO: {
          banner: BannerText.CPOReviewStatusCalloutText.MPO.en,
          changeStatus: [],
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
        },
      },
    },
    FINAL_REVIEW: {
      title: 'Final Review',
      class: 'statusBlock__finalReview',
      modal: defaultFinalReviewModal,
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
