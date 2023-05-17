import { ConfigStorageKeys } from './auth';
import { AppStorage } from './storage';

// a util to return a random number of 'n' digits
export const random = (n = 7) => Math.round(Math.random() * Math.pow(10, n));

// converts "Work email" to "work_email"
export const convertLabelToId = (label = '') => {
  return label.replace(/\s+/g, '_').toLowerCase();
};

export const isMPORole = () => {
  const item = AppStorage.getItem(ConfigStorageKeys.ROLES);
  if (!item) return false;

  return item.some((x: string) => x.includes('MPO-'));
};

export const isCPORole = () => {
  const item = AppStorage.getItem(ConfigStorageKeys.ROLES);
  if (!item) return false;

  return item.some((x: string) => x.includes('CPO'));
};

export const roleCheck = () => {
  const roleOjb: Record<string, Array<string>> = {
    roles: [],
  };

  const item = AppStorage.getItem(ConfigStorageKeys.ROLES);
  if (!item) return {};

  item.forEach((x: string) => {
    roleOjb.roles.push(x.substring(0, 3));
  });

  return roleOjb;
};
