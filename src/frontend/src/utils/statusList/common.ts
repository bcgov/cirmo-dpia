import { IPiaForm } from '../../types/interfaces/pia-form.interface';
import { getUserRole } from '../../utils/user';
import { PiaStatuses } from '../../constant/constant';
import {
  completeStatus,
  cpoReviewStatus,
  editInProgressStatus,
  finalReviewStatus,
  incompleteStatus,
  mpoReviewStatus,
  pendingCompletionStatus,
} from './statuses/index';
import { StatusList } from './types';

export const statusList = (pia: IPiaForm | null): StatusList => {
  return {
    INCOMPLETE: incompleteStatus(pia),
    EDIT_IN_PROGRESS: editInProgressStatus(),
    MPO_REVIEW: mpoReviewStatus(pia),
    CPO_REVIEW: cpoReviewStatus(),
    FINAL_REVIEW: finalReviewStatus(pia),
    PENDING_COMPLETION: pendingCompletionStatus(),
    COMPLETE: completeStatus(),
  };
};

export const getUserPrivileges = (pia: IPiaForm) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  return statusList?.(pia)?.[pia?.status!]?.Privileges[getUserRole()];
};

export const getUserPrivilegesByStatus = (
  status: PiaStatuses | string | undefined,
) => {
  if (!status) return {};
  return statusList?.(null)?.[status]?.Privileges[getUserRole()];
};
