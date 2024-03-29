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
import { piaReviewMock } from 'test/util/mocks/data/pia-review.mock';

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

    it('ProgramAreaReview, MpoReview: succeeds when appropriate values are supplied', () => {
      const updatedValue: Review = {
        programArea: {
          selectedRoles: ['Director'],
          reviews: {
            Director: {
              isAcknowledged: true,
              reviewNote: 'Test Note 1',
            },
          },
        },
        mpo: {
          isAcknowledged: true,
          reviewNote: 'Test Note 2',
        },
      };
      const storedValue: Review = null;
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };

      validateRoleForReview(updatedValue, storedValue, userType, loggedInUser);

      expect(validateRoleForProgramAreaReviewSpy).toHaveBeenCalledWith(
        updatedValue.programArea,
        storedValue?.programArea,
        userType,
        loggedInUser,
      );

      expect(validateRoleForMpoReviewSpy).toHaveBeenCalledWith(
        updatedValue?.mpo,
        storedValue?.mpo,
        userType,
        `review.mpo`,
        loggedInUser,
      );

      expect(validateRoleForCpoReviewSpy).not.toHaveBeenCalled();
    });

    it('Cpo Review: succeeds when appropriate values are supplied', () => {
      const updatedValue: Review = {
        programArea: {
          selectedRoles: ['Director'],
          reviews: {
            Director: {
              ...piaReviewMock,
              isAcknowledged: true,
              reviewNote: 'Test Note 1',
            },
          },
        },
        mpo: {
          ...piaReviewMock,
          isAcknowledged: true,
          reviewNote: 'Test Note 2',
        },
        cpo: {
          USER_ID_1: {
            ...piaReviewMock,
            isAcknowledged: true,
            reviewNote: 'Test Note 3',
          },
        },
      };
      const storedValue: Review = {
        programArea: {
          selectedRoles: ['Director'],
          reviews: {
            Director: {
              ...piaReviewMock,
              isAcknowledged: true,
              reviewNote: 'Test Note 1',
            },
          },
        },
        mpo: {
          ...piaReviewMock,
          isAcknowledged: true,
          reviewNote: 'Test Note 2',
        },
      };
      const userType: UserTypesEnum[] = [UserTypesEnum.CPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };

      validateRoleForReview(updatedValue, storedValue, userType, loggedInUser);

      expect(validateRoleForProgramAreaReviewSpy).toHaveBeenCalledWith(
        updatedValue.programArea,
        storedValue?.programArea,
        userType,
        loggedInUser,
      );

      expect(validateRoleForMpoReviewSpy).toHaveBeenCalledWith(
        updatedValue?.mpo,
        storedValue?.mpo,
        userType,
        `review.mpo`,
        loggedInUser,
      );

      expect(validateRoleForCpoReviewSpy).toHaveBeenCalledTimes(1);
      expect(validateRoleForCpoReviewSpy).toHaveBeenCalledWith(
        updatedValue?.cpo?.USER_ID_1,
        storedValue?.cpo?.USER_ID_1,
        userType,
        `review.cpo.USER_ID_1`,
        loggedInUser,
      );
    });

    it('succeeds when CPO Review is deleted', () => {
      const updatedValue: Review = {
        programArea: {
          selectedRoles: ['Director'],
          reviews: {
            Director: { ...piaReviewMock },
          },
        },
        mpo: { ...piaReviewMock },
        cpo: {
          USER_ID_1: null,
          USER_ID_2: { ...piaReviewMock },
        },
      };
      const storedValue: Review = {
        programArea: {
          selectedRoles: ['Director'],
          reviews: {
            Director: { ...piaReviewMock },
          },
        },
        mpo: { ...piaReviewMock },
        cpo: {
          USER_ID_1: {
            ...piaReviewMock,
            reviewedByGuid: 'KNOWN_USER',
          },
          USER_ID_2: { ...piaReviewMock },
        },
      };
      const userType: UserTypesEnum[] = [UserTypesEnum.CPO];
      const loggedInUser: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'KNOWN_USER',
      };

      validateRoleForReview(updatedValue, storedValue, userType, loggedInUser);

      expect(validateRoleForProgramAreaReviewSpy).toHaveBeenCalledWith(
        updatedValue.programArea,
        storedValue?.programArea,
        userType,
        loggedInUser,
      );

      expect(validateRoleForMpoReviewSpy).toHaveBeenCalledWith(
        updatedValue?.mpo,
        storedValue?.mpo,
        userType,
        `review.mpo`,
        loggedInUser,
      );

      expect(validateRoleForCpoReviewSpy).toHaveBeenCalledTimes(2);
    });
  });
});
