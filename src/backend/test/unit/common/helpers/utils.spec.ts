import { omit } from 'src/common/helpers/utils';

/**
 * @Description
 * This file tests the contents of common/helpers/utils.ts
 */
describe('UtilsHelper', () => {
  /**
   * @method omit
   *
   * @description
   * This test suite validates that the omit method works as expected
   */
  describe('`omit` method', () => {
    // Scenario 1: succeeds omitting single key from the provided object
    it('succeeds omitting single key from the provided object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const keys = ['a'];

      const result = { b: 2, c: 3 };

      expect(omit(keys, obj)).toEqual(result);
    });

    // Scenario 2: succeeds omitting multiple keys from the provided object
    it('succeeds omitting multiple keys from the provided object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const keys = ['a', 'c'];

      const result = { b: 2 };

      expect(omit(keys, obj)).toEqual(result);
    });

    // Scenario 3: fails on passing invalid arguments
    it('fails on passing invalid arguments', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const keys = ['a', 'c'];

      try {
        omit(keys, null);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
      }

      try {
        omit(null, obj);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
      }

      try {
        omit(null, null);
      } catch (e) {
        expect(e).toBeInstanceOf(TypeError);
      }
    });
  });
});
