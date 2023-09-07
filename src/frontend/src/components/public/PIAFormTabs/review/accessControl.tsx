/*
 * @description: This file defines the access control of the review section tab of the PIA form
 * Check src\frontend\src\utils\statusList\statuses Privileges to see who has accessControl.
 */

import { getUserPrivilegesByStatus } from '../../../../utils/statusList/common';
import { PiaStatuses } from '../../../../constant/constant';

export const reviewAccessControl = (status: string | undefined) => {
  if (!status) return false;

  // Check if status is valid PiaStatus
  const validStatus = Object.values(PiaStatuses).includes(
    status as PiaStatuses,
  );
  if (!validStatus) return false;

  const hasAccess =
    getUserPrivilegesByStatus(status as PiaStatuses)?.Pages?.review
      ?.accessControl ?? false;

  return hasAccess;
};
