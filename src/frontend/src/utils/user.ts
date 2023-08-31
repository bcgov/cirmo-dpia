import { ConfigStorageKeys } from './auth';
import { UserRole } from './statusList/types';
import { AppStorage } from './storage';

// Returns DRAFTER, MPO, or CPO.
export const getUserRole = (): UserRole => {
  const storageItem = AppStorage.getItem(ConfigStorageKeys.ROLES);
  if (!storageItem || storageItem.length === 0) return 'DRAFTER';

  return storageItem[0].substring(0, 3);
};

export const isMPORole = () => getUserRole() === 'MPO';
export const isCPORole = () => getUserRole() === 'CPO';
export const isDrafterRole = () => getUserRole() === 'DRAFTER';

export const getGUID = () => AppStorage.getItem(ConfigStorageKeys.GUID);
