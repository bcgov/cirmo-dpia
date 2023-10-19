import { arraysEqual, isMatching } from 'src/common/utils/checkMatching';

/**
 * @method arraysEqual
 * Check if two arrays are of same length and share equal values.
 */
describe('`arraysEqual` function', () => {
  it('should return true for two equal arrays', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3];
    expect(arraysEqual(array1, array2)).toBe(true);
  });

  it('should return false for arrays of different lengths', () => {
    const array1 = [1, 2];
    const array2 = [1, 2, 3];
    expect(arraysEqual(array1, array2)).toBe(false);
  });

  it('should return false for arrays with different values', () => {
    const array1 = [1, 2, 4];
    const array2 = [1, 2, 3];
    expect(arraysEqual(array1, array2)).toBe(false);
  });
});

/**
 * @method isMatching
 * Check if two variables are equal.
 */
describe('`isMatching` function', () => {
  it('should return true for two matching objects', () => {
    const obj1 = { key: 'value' };
    const obj2 = { key: 'value' };
    expect(isMatching(obj1, obj2)).toBe(true);
  });

  it('should return true for two equal arrays', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3];
    expect(isMatching(array1, array2)).toBe(true);
  });

  it('should return true for two matching primitives', () => {
    expect(isMatching(1, 1)).toBe(true);
    expect(isMatching('string', 'string')).toBe(true);
  });

  it('should return false for non-matching object values', () => {
    const obj1 = { key: 'value' };
    const obj2 = { key: 'differentValue' };
    expect(isMatching(obj1, obj2)).toBe(false);
  });

  it('should return false for non-matching array values', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 3, 2];
    expect(isMatching(array1, array2)).toBe(false);
  });

  it('should return false for non-matching primitive values', () => {
    expect(isMatching(1, 2)).toBe(false);
    expect(isMatching('string', 'string2')).toBe(false);
  });
});
