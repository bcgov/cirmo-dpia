import { shortDate } from 'src/common/helpers/date-helper';

/**
 * @Description
 * This file tests the contents of common/helpers/data-helper.ts
 */
describe('DateHelper', () => {
  /**
   * @method shortDate
   *
   * @input - @optional Date object [current date is taken by @default if no input is provided]
   * @output - date returned in mm/dd/yy format for the pacific timezone
   *
   * @description
   * This test suite validates that the method returns the formatted date
   */
  describe('`shortDate` method', () => {
    it('succeeds when correct input is provided', () => {
      const date = new Date(
        'Wed Dec 21 2022 15:16:42 GMT-0800 (Pacific Standard Time)',
      );

      expect(shortDate(date)).toBe('2022/12/21');
    });
  });
});
