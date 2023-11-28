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
  const trimString = (value: any) =>
    typeof value === 'string' ? value.trim() : value;

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

    return trimString(object1) === trimString(object2);
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (skipKeys.includes(key)) continue;

    // recursive check for nested values [objects]
    const val1 = trimString(object1[key]);
    const val2 = trimString(object2[key]);

    if (
      typeof val1 === 'object' &&
      val1 !== null &&
      typeof val2 === 'object' &&
      val2 !== null
    ) {
      if (deepEqual(val1, val2, skipKeys)) continue;
      return false;
    }

    // check for primitive values
    if (val1 !== val2) {
      return false;
    }
  }

  return true;
};
