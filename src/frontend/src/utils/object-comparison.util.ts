export const deepEqual = (
  object1: Record<string, any>,
  object2: Record<string, any>,
  skipKeys: Array<string> = [],
) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (skipKeys.includes(key)) continue;

    // recursive check for nested values [objects]
    if (
      typeof object1[key] === typeof object2[key] &&
      typeof object1[key] === 'object' &&
      object1[key] !== null &&
      object1[key] !== undefined
    ) {
      if (deepEqual(object1[key], object2[key])) continue;

      return false;
    }

    // check for primitive values
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};
