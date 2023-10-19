import { deepEqual } from './objectComparison';

// Check if two arrays are of same length and share equal values.
export const arraysEqual = (a, b) => {
  return a.length === b.length && a.every((value, index) => value === b[index]);
};

// Check if two variables are equal.
export const isMatching = (value1, value2) => {
  // Check object matching.
  if (
    value1 instanceof Object &&
    value2 instanceof Object &&
    deepEqual(value1, value2)
  )
    return true;

  // Check array matching.
  if (
    Array.isArray(value1) &&
    Array.isArray(value2) &&
    arraysEqual(value1, value2)
  )
    return true;

  // Check primitives matching.
  if (value1 === value2) return true;

  return false;
};
