import { IPiaForm } from '../../types/interfaces/pia-form.interface';
import {
  completeStatus,
  cpoReviewStatus,
  editInProgressStatus,
  finalReviewStatus,
  draftingInProgressStatus,
  mpoReviewStatus,
  pendingCompletionStatus,
} from './statuses/index';
import { StatusList } from './types';

export const statusList = (pia: IPiaForm | null): StatusList => {
  return {
    DRAFTING_IN_PROGRESS: draftingInProgressStatus(pia),
    EDIT_IN_PROGRESS: editInProgressStatus(),
    MPO_REVIEW: mpoReviewStatus(pia),
    CPO_REVIEW: cpoReviewStatus(),
    FINAL_REVIEW: finalReviewStatus(pia),
    PENDING_COMPLETION: pendingCompletionStatus(),
    COMPLETE: completeStatus(),
  };
};
