interface StatusList {
  [name: string]: {
    title: string;
    class: string;
    modal: {
      title: string;
      description: string;
      confirmLabel: string;
      cancelLabel: string;
    };
    Priviliges: {
      MPO: {
        changeStatus: Array<string>;
      };
      CPO?: {
        changeStatus: Array<string>;
      };
    };
  };
}

export const statusList: StatusList = {
  MPO_REVIEW: {
    title: 'MPO REVIEW',
    class: 'statusBlock__MPOReview',
    modal: {
      title: 'Submit for MPO review?',
      description:
        'Your Ministry Privacy Officer (MPO) will be able to review and edit in order to help you with the PIA process.',
      confirmLabel: 'Yes, submit',
      cancelLabel: 'Cancel',
    },
    Priviliges: {
      MPO: {
        changeStatus: ['INCOMPLETE', 'EDIT_IN_PROGRESS'],
      },
    },
  },
  INCOMPLETE: {
    title: 'INCOMPLETE',
    class: 'statusBlock__incomplete',
    modal: {
      title: 'Change status to “Incomplete”?',
      description:
        'Only the original PIA drafter will be able to view or edit the PIA.',
      confirmLabel: 'Yes, continue',
      cancelLabel: 'Cancel',
    },
    Priviliges: {
      MPO: {
        changeStatus: ['MPO_REVIEW'],
      },
    },
  },
  COMPLETED: {
    title: 'COMPLETED',
    class: 'statusBlock__success',
    modal: {
      title: '',
      description: '',
      confirmLabel: '',
      cancelLabel: '',
    },
    Priviliges: {
      MPO: {
        changeStatus: ['INCOMPLETE', 'EDIT_IN_PROGRESS'],
      },
    },
  },
  EDIT_IN_PROGRESS: {
    title: 'EDIT IN PROGRESS',
    class: 'statusBlock__edit',
    modal: {
      title: 'Change status to “Edit in progress”?',
      description:
        'Make changes yourself or work with your MPO to edit your PIA until it is ready for another review.',
      confirmLabel: 'Yes, continue',
      cancelLabel: 'Cancel',
    },
    Priviliges: {
      MPO: {
        changeStatus: ['INCOMPLETE', 'MPO_REVIEW'],
      },
    },
  },
  PCT_REVIEW: {
    title: 'PCT REVIEW',
    class: 'statusBlock__PCTReview',
    modal: {
      title: 'Submit for PCT review?',
      description:
        'An analyst from the Privacy, Compliance and Training branch will be able to review and edit your PIA.',
      confirmLabel: 'Yes, submit',
      cancelLabel: 'Cancel',
    },
    Priviliges: {
      MPO: {
        changeStatus: [],
      },
      CPO: {
        changeStatus: ['MPO_REVIEW'],
      },
    },
  },
};
