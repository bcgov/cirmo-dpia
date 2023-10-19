import { convertToISODate, deepEqual } from 'src/common/utils/objectComparison';

/**
 * @method convertToISODate
 * Check if object is a date and convert to ISO string.
 */
describe('convertToISODate function', () => {
  it('should convert a Date object to its ISO string representation', () => {
    const date = new Date('2023-10-20T12:00:00Z');
    expect(convertToISODate(date)).toBe('2023-10-20T12:00:00.000Z');
  });

  it('should return the input unchanged if it is not a Date object', () => {
    expect(convertToISODate('string')).toBe('string');
    expect(convertToISODate(null)).toBe(null);
    expect(convertToISODate(undefined)).toBe(undefined);
    expect(convertToISODate(123)).toBe(123);
  });
});

/**
 * @method deepEqual
 * Check if two objects are equal.
 */
describe('deepEqual function', () => {
  it('should return true for two deeply equal objects', () => {
    const obj1 = { key: 'value', nested: { subkey: 'subvalue' } };
    const obj2 = { key: 'value', nested: { subkey: 'subvalue' } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for two different objects', () => {
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it('should return true for two Date objects with the same date value', () => {
    const date1 = new Date('2023-10-20T12:00:00Z');
    const date2 = new Date('2023-10-20T12:00:00Z');
    expect(deepEqual(date1, date2)).toBe(true);
  });

  it('should skip comparison for keys in the skipKeys array', () => {
    const obj1 = { key1: 'value', key2: 'value1' };
    const obj2 = { key1: 'value', key2: 'value2' };
    expect(deepEqual(obj1, obj2, ['key2'])).toBe(true);
  });
});
