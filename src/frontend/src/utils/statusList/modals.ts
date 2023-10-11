import { Modal } from './types';

export const defaultMPOReviewModal: Modal = {
  title: 'Submit for MPO review?',
  description:
    'Your Ministry Privacy Officer (MPO) will be able to review and edit in order to help you with the PIA process.',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

export const defaultIncompleteModal: Modal = {
  title: 'Change status to “Incomplete”?',
  description:
    'Only the original PIA drafter will be able to view or edit the PIA.',
  confirmLabel: 'Yes, continue',
  cancelLabel: 'Cancel',
};

export const resetReviewIncompleteModal: Modal = {
  title: 'Unlock PIA? Reviews will not be saved.',
  description:
    'Changing status to Incomplete will erase all data in the “Review” section and all reviewers will have to complete this section again.',
  confirmLabel: 'Yes, unlock',
  cancelLabel: 'Cancel',
};

export const defaultEditInProgressModal: Modal = {
  title: 'Change status to “Edit in progress”?',
  description:
    'Make changes yourself or work with your MPO to edit your PIA until it is ready for another review.',
  confirmLabel: 'Yes, continue',
  cancelLabel: 'Cancel',
};

export const resetReviewEditInPRogressModal: Modal = {
  title: 'Unlock PIA? Reviews will not be saved.',
  description:
    'Changing status to Edit in Progress will erase all data in the “Review” section and all reviewers will have to complete this section again.',
  confirmLabel: 'Yes, unlock',
  cancelLabel: 'Cancel',
};

export const defaultCPOReviewModal: Modal = {
  title: 'Submit for CPO review?',
  description:
    'Your status will be changed to CPO review. A CPO analyst will be able to review your PIA.',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

export const defaultFinalReviewModal: Modal = {
  title: 'Finish review and lock PIA?',
  description:
    'The status will be changed to "Final Review" and this PIA will be locked. Program area roles you designated will be required to review the PIA.',
  confirmLabel: 'Yes, finish',
  cancelLabel: 'Cancel',
};

export const defaultPendingCompletionModal: Modal = {
  title: 'Submit for completion?',
  description:
    'Status will change to “Pending Completion”. Once CPO has confirmed all necessary ministry reviews have occurred and data has been uploaded to the PID, PIA will move to “Complete” status.',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

export const defaultCompleteModal: Modal = {
  title: 'Complete PIA?',
  description:
    'Before completing the PIA, make sure all necessary ministry reviews have occurred and confirm that data has been uploaded to the PID. This PIA will move to “Complete” status.',
  confirmLabel: 'Yes, complete',
  cancelLabel: 'Cancel',
};

export const defaultEmptyModal: Modal = {
  title: '',
  description: '',
  confirmLabel: '',
  cancelLabel: '',
};

export const submitPiaIntakeModal: Modal = {
  title: 'Submit for PIA Intake?',
  description: 'Are you sure you want to submit your PIA intake?',
  confirmLabel: 'Yes, submit',
  cancelLabel: 'Cancel',
};

export const autoSaveFailedModal: Modal = {
  title: 'Auto-save failed',
  description:
    'This document was last saved at ${time}. Before you leave the page, ensure you capture any unsaved work you don’t want to lose. Any unsaved changes will be lost.',
  confirmLabel: 'Okay',
  cancelLabel: '',
};

export const conflictModal: Modal = {
  title: '${user} is editing this PIA',
  description:
    'Please reach out to ${user} for further questions. Refresh to view any changes.',
  confirmLabel: 'Back to view',
  cancelLabel: '',
};
