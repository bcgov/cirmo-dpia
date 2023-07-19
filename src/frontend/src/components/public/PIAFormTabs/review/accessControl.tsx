/*
 * @description: This file defines the access control of the review section tab of the PIA form
 * If you are drafter and the status is in CPO review or MPO review you cannot see this page
 * If the status is in Final review status then you can view this page.
 */

import { statusList } from '../../../../utils/status';

export const defaultAccess = (status: string | undefined) => {
  if (!status) {
    return false;
  }
  if ('Pages' in Object(statusList(null)[status])) {
    const pages = Object(statusList(null)[status]).Pages;
    if ('review' in pages) {
      return pages.review.accessControl;
    }
  }
  return false;
};

export const reviewAccessControl = (
  status: string | undefined,
  role: string | null,
) => {
  if (!status) {
    return false;
  }
  if (!role) {
    return defaultAccess(status);
  }
  let defaultAccessFlag = true;
  const priviliges =
    role in Object(statusList(null)[status].Privileges) ? true : false;
  if (priviliges) {
    /* check if Pages is defined for this role */
    if ('Pages' in Object(statusList(null)[status]).Privileges[role]) {
      const pages = Object(statusList(null)[status]).Privileges[role].Pages;
      if ('review' in pages) {
        defaultAccessFlag = false;
        return pages.review.accessControl;
      }
    }
  }
  if (defaultAccessFlag) {
    return defaultAccess(status);
  }
};
