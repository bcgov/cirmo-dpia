/**
 * @method omit
 *
 * @description
 * This method omits the provided keys from the object and returns a new object
 * Check the test for examples
 */
export const omit = (keys: Array<string>, obj: Record<string, any>) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
