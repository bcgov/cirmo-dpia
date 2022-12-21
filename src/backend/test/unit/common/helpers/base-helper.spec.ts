import { omitBaseKeys } from 'src/common/helpers/base-helper';
import {
  getPiaIntakeROMock,
  piaIntakeEntityMock,
} from 'test/util/mocks/data/pia-intake.mock';

/**
 * @Description
 * This file tests the contents of common/helpers/base-helper.ts
 */
describe('BaseHelper', () => {
  /**
   * @method omitBaseKeys
   *
   * @description
   * This test suite validates that the method works as expected
   */
  describe('`omitBaseKeys` method', () => {
    it('succeeds omitting the excluded keys', () => {
      const entityRecord = { ...piaIntakeEntityMock };
      const expectedFormattedResult = { ...getPiaIntakeROMock };

      expect(omitBaseKeys(entityRecord)).toEqual(expectedFormattedResult);
    });
  });
});
