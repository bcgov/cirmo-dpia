import { check } from 'prettier';

// a util to return a random number of 'n' digits
export const random = (n = 7) => Math.round(Math.random() * Math.pow(10, n));

// converts "Work email" to "work_email"
export const convertLabelToId = (label = '') => {
  return label.replace(/\s+/g, '_').toLowerCase();
};

export const authHeader = () => {
  const userStr = window.localStorage.getItem('userName');
  let accessToken = null;
  if (userStr) accessToken = localStorage.getItem('access_token');

  if (userStr && accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
  } else {
    return { Authorization: '' };
  }
};

export const getItemFromStorage = (key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItemInStorage = (name: string, data: any) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export const removeItemFromStorage = (name: string) => {
  window.localStorage.removeItem(name);
};
