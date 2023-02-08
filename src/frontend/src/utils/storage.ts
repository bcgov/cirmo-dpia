import { clearStorage } from './auth';

export class AppStorage {
  static setItem(key: string, value: any) {
    if (!key || value === null || value === undefined) return;

    localStorage.setItem(key, JSON.stringify(value));

    return true;
  }

  static getItem<T = any>(key: string) {
    if (!key) return;

    const value = localStorage.getItem(key);

    if (!value) return;

    try {
      const parsedValue = JSON.parse(value) as T;
      return parsedValue;
    } catch (e) {
      // if the storage is compromised, log the user out
      // This change is temporary and is due to the recent migration from storing localStorage directly vs using the newly created Storage class
      // This can be reverted in the future as it can only happen for roles, and username keys [other field keys are changed]
      console.error(
        'Something went wrong. Redirecting user to the landing screen',
        e,
      );
      clearStorage();
      (window as Window).location = '/';
    }
  }

  static removeItem(key: string) {
    if (!key) return;

    localStorage.removeItem(key);

    return true;
  }

  static clear() {
    localStorage.clear();
  }

  static addStorageListener(listener: (event: StorageEvent) => void) {
    window.addEventListener('storage', listener);
  }

  static removeStorageListener(listener: (event: StorageEvent) => void) {
    window.removeEventListener('storage', listener);
  }
}
