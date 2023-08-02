import { UserTypesEnum } from 'src/common/enums/users.enum';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import {
  Review,
  validateRoleForReview,
} from 'src/modules/pia-intake/jsonb-classes/review';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';

import * as validateRoleForCpoReview from 'src/modules/pia-intake/jsonb-classes/review/cpo-review';
import * as validateRoleForMpoReview from 'src/modules/pia-intake/jsonb-classes/review/mpo-review';
import * as validateRoleForProgramAreaReview from 'src/modules/pia-intake/jsonb-classes/review/program-area-review';

/**
 * @class Review
 * @file src/modules/pia-intake/jsonb-classes/review/index.ts
 */
describe('`Review` class', () => {
  /**
   * @method validateRoleForReview
   */
  describe('`validateRoleForReview` method', () => {
    let validateRoleForProgramAreaReviewSpy = null;
    let validateRoleForMpoReviewSpy = null;
    let validateRoleForCpoReviewSpy = null;

    beforeEach(() => {
      validateRoleForProgramAreaReviewSpy = jest
        .spyOn(
          validateRoleForProgramAreaReview,
          'validateRoleForProgramAreaReview',
        )
        .mockImplementation(() => null);

      validateRoleForMpoReviewSpy = jest
        .spyOn(validateRoleForMpoReview, 'validateRoleForMpoReview')
        .mockImplementation(() => null);

      validateRoleForCpoReviewSpy = jest
        .spyOn(validateRoleForCpoReview, 'validateRoleForCpoReview')
        .mockImplementation(() => null);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('does not process the method when there are no values', () => {
      const updatedValue: Review = null;
      const storedValue: Review = null;
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };

      validateRoleForReview(updatedValue, storedValue, userType, loggedInUser);

      expect(validateRoleForProgramAreaReviewSpy).not.toHaveBeenCalled();
      expect(validateRoleForMpoReviewSpy).not.toHaveBeenCalled();
      expect(validateRoleForCpoReviewSpy).not.toHaveBeenCalled();
    });

    // Add more tests here
    it('ProgramAreaReview: succeeds when appropriate values are supplied', () => {});
    it('MPO Review test', () => {});
    it('CPO Review tests', () => {});
  });
});
