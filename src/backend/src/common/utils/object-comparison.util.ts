const convertToISODate = (object: any) => {
  if (object instanceof Date) {
    return object.toISOString();
  }

  return object;
};

export const deepEqual = (
  object1: any,
  object2: any,
  skipKeys: Array<string> = [],
) => {
  if (
    typeof object1 !== 'object' ||
    typeof object2 !== 'object' ||
    object1 === null ||
    object1 === undefined ||
    object2 === null ||
    object2 === undefined
  ) {
    if (object1 instanceof Date || object2 instanceof Date) {
      object1 = convertToISODate(object1);
      object2 = convertToISODate(object2);
    }

    return object1 === object2;
  }

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
      object1[key] !== undefined &&
      object2[key] !== null &&
      object2[key] !== undefined
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
