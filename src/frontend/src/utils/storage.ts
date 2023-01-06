export class AppStorage {
  static setItem(key: string, value: any) {
    if (!key || !value) return;

    localStorage.setItem(key, JSON.stringify(value));

    return true;
  }

  static getItem(key: string) {
    if (!key) return;

    const value = localStorage.getItem(key);

    if (!value) return;

    return JSON.parse(value);
  }

  static removeItem(key: string) {
    if (!key) return;

    localStorage.removeItem(key);

    localStorage.getItem('1');

    return true;
  }

  static clear() {
    localStorage.clear();
  }
}
