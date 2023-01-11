import { AppStorage } from './storage';

// a util to return a random number of 'n' digits
export const random = (n = 7) => Math.round(Math.random() * Math.pow(10, n));

// converts "Work email" to "work_email"
export const convertLabelToId = (label = '') => {
  return label.replace(/\s+/g, '_').toLowerCase();
};

export const isMPORole = (itemName: string) => {
  const item = AppStorage.getItem(itemName);
  if (!item) return false;

  const content = JSON.parse(item);
  return content.filter((x: string) => x.includes('MPO'));
};
