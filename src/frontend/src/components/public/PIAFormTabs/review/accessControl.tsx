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
  if (Object(statusList(null)[status]).hasOwnProperty('Pages')) {
    const pages = Object(statusList(null)[status]).Pages;
    if (pages.hasOwnProperty('review')) {
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
  const priviliges = Object(statusList(null)[status]).Privileges.hasOwnProperty(role);
  if (priviliges) {
    /* check if Pages is defined for this role */
    if (
      Object(statusList(null)[status]).Privileges[role].hasOwnProperty('Pages')
    ) {
      const pages = Object(statusList(null)[status]).Privileges[role].Pages;
      if (pages.hasOwnProperty('review')) {
        defaultAccessFlag = false;
        return pages.review.accessControl;
      }
    }
  }
  if (defaultAccess) {
    return defaultAccess(status);
  }
};
