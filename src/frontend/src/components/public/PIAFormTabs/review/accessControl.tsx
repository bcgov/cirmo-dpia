/*
 * @description: This file defines the access control of the review section tab of the PIA form
 * If you are drafter and the status is in CPO review or MPO review you cannot see this page
 * If the status is in Final review status then you can view this page.
 */

import { UserRole } from '../../../../utils/statusList/types';
import { statusList } from '../../../../utils/statusList/statusList';

export const defaultAccess = (status: string | undefined) => {
  if (!status) {
    return false;
  }
  if ('Pages' in Object(statusList(null)[status])) {
    const pages = Object(statusList(null)[status]).Pages;
    if ('review' in pages) {
      if ('accessControl' in pages.review) {
        return pages.review.accessControl;
      }
    }
  }
  return false;
};

export const reviewAccessControl = (
  status: string | undefined,
  role: UserRole,
) => {
  if (!status) return false;
  if (role === 'DRAFTER') return defaultAccess(status);
  const priviliges = role in Object(statusList(null)[status].Privileges);
  if (priviliges) {
    /* check if Pages is defined for this role */
    if ('Pages' in Object(statusList(null)[status]).Privileges[role]) {
      const pages = Object(statusList(null)[status]).Privileges[role].Pages;
      if ('review' in pages) {
        if ('accessControl' in pages.review) {
          return pages.review.accessControl;
        }
      }
    }
  }
  return defaultAccess(status);
};
