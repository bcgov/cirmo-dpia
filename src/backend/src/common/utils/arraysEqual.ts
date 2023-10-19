// Check if two arrays are of same length and share equal values.
export const arraysEqual = (a, b) => {
  return a.length === b.length && a.every((value, index) => value === b[index]);
};
