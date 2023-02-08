import { DateStringValidator } from 'src/common/validators/date-string.validator';

/**
 * @Description
 * This file tests the contents of common/validators/data-string.validator.ts
 */
describe('DateStringValidator', () => {
  /**
   * @method validate
   *
   * @input -  Date string
   * @output - boolean
   *
   * @description
   * This test suite validates if the provided date string matches the YYYY/MM/DD format
   */
  describe('`validate` method', () => {
    it('succeeds when expected input is provided', () => {
      const validator = new DateStringValidator();

      expect(validator.validate('2022/12/21')).toBe(true); // correct date
      expect(validator.validate('2020/01/01')).toBe(true); // correct date
      expect(validator.validate('2020/02/29')).toBe(true); // leap year
      expect(validator.validate('2021/02/29')).toBe(false); // not a leap year
      expect(validator.validate('1900/02/29')).toBe(false); // not a leap year
      expect(validator.validate('1970/01/32')).toBe(false); // invalid date
      expect(validator.validate('1970/01/00')).toBe(false); // invalid date
      expect(validator.validate('1970/10/1')).toBe(false); // not a two digit date
      expect(validator.validate('1970/13/01')).toBe(false); // invalid month
      expect(validator.validate('2018/14/29')).toBe(false); // invalid month
      expect(validator.validate('2018/00/29')).toBe(false); // invalid month
      expect(validator.validate('2018/4/29')).toBe(false); // not a two digit month
      expect(validator.validate('0999/14/29')).toBe(false); // invalid year
      expect(validator.validate('3001/14/29')).toBe(false); // invalid year
      expect(validator.validate('12/14/29')).toBe(false); // neither valid nor a four digit valid year
      expect(validator.validate('3ccc/1a/2b')).toBe(false); // invalid characters
      expect(validator.validate('1234567890')).toBe(false); // invalid format
      expect(validator.validate('cccc/aa/bb')).toBe(false); // invalid characters
      expect(validator.validate(null)).toBe(false); // null check
      expect(validator.validate('')).toBe(false); // empty check
    });
  });
});
