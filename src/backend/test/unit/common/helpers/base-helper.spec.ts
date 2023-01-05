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
   * @input Database Entity record
   * @output partial input omitting the unrequited keys to be passed along
   *
   * @description
   * This test suite validates that the method omits the needed keys from the passed entity record json
   */
  describe('`omitBaseKeys` method', () => {
    it('succeeds omitting the excluded keys', () => {
      const entityRecord = { ...piaIntakeEntityMock };
      const expectedFormattedResult = { ...getPiaIntakeROMock };

      expect(omitBaseKeys(entityRecord)).toEqual(expectedFormattedResult);
    });
  });
});
