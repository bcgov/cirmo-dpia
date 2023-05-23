import { BannerText } from '../pages/PIAForm/BannerStatus/messages';

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

const defaultEditInProgressModal: Modal = {
  title: 'Change status to “Edit in progress”?',
  description:
    'Make changes yourself or work with your MPO to edit your PIA until it is ready for another review.',
  confirmLabel: 'Yes, continue',
  cancelLabel: 'Cancel',
};

const defaultCPOReviewModal: Modal = {
  title: 'Submit for CPO review?',
  description:
    'An analyst from the Corporate Privacy Office branch will be able to review and edit your PIA.',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

const defaultEmptyModal: Modal = {
  title: '',
  description: '',
  confirmLabel: '',
  cancelLabel: '',
};

export const statusList: StatusList = {
  MPO_REVIEW: {
    title: 'MPO REVIEW',
    class: 'statusBlock__MPOReview',
    banner: BannerText.MPOReviewStatusCalloutText.Drafter.en,
    modal: defaultMPOReviewModal,
    Privileges: {
      MPO: {
        banner: BannerText.MPOReviewStatusCalloutText.MPO.en,
        changeStatus: [
          {
            status: 'INCOMPLETE',
            modal: defaultIncompleteModal,
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
  INCOMPLETE: {
    title: 'INCOMPLETE',
    class: 'statusBlock__incomplete',
    banner: BannerText.InCompleteStatusCalloutText.Drafter.en,
    modal: defaultIncompleteModal,
    Privileges: {
      MPO: {
        changeStatus: [
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
      CPO: {
        changeStatus: [],
      },
    },
  },
  COMPLETED: {
    title: 'COMPLETED',
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
    title: 'EDIT IN PROGRESS',
    class: 'statusBlock__edit',
    banner: 'test drafter',
    modal: {
      title: 'Change status to “Edit in progress”?',
      description:
        'Make changes yourself or work with your MPO to edit your PIA until it is ready for another review.',
      confirmLabel: 'Yes, continue',
      cancelLabel: 'Cancel',
    },
    Privileges: {
      MPO: {
        banner: 'test mpo',
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
    },
  },
  CPO_REVIEW: {
    title: 'CPO REVIEW',
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
        ],
      },
    },
  },
};
