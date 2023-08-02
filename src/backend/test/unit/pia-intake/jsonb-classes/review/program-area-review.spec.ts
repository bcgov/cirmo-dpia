/**
 * @file program-area-review.ts
 */

import { UserTypesEnum } from 'src/common/enums/users.enum';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import {
  ProgramAreaReview,
  validateRoleForProgramAreaReview,
} from 'src/modules/pia-intake/jsonb-classes/review/program-area-review';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import * as validateRoleForFormField from 'src/common/validators/form-field-role.validator';
import * as validateRoleForSelectedRoleReviews from 'src/modules/pia-intake/jsonb-classes/review/programArea/programAreaSelectedRoleReviews';
import { piaReviewMock } from 'test/util/mocks/data/pia-review.mock';
import { ForbiddenException } from '@nestjs/common';

describe('`ProgramAreaReview` class', () => {
  let validateRoleForFormFieldSpy = null;
  let validateRoleForSelectedRoleReviewsSpy = null;

  beforeEach(() => {
    validateRoleForFormFieldSpy = jest
      .spyOn(validateRoleForFormField, 'validateRoleForFormField')
      .mockImplementation(() => null);
    validateRoleForSelectedRoleReviewsSpy = jest
      .spyOn(
        validateRoleForSelectedRoleReviews,
        'validateRoleForSelectedRoleReviews',
      )
      .mockImplementation(() => null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  /**
   * @method validateRoleForProgramAreaReview
   */
  describe('`validateRoleForProgramAreaReview` method', () => {
    it('does not process the method when there are no supplied values', () => {
      const updatedValue: ProgramAreaReview = null;
      const storedValue: ProgramAreaReview = null;
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };

      validateRoleForProgramAreaReview(
        updatedValue,
        storedValue,
        userType,
        loggedInUser,
      );

      expect(validateRoleForFormFieldSpy).not.toHaveBeenCalled();
    });

    it('successfully validates selectedRoles and does not process mpo or cpo reviews', () => {
      const updatedValue: ProgramAreaReview = {
        selectedRoles: ['ROLE_1', 'ROLE_2'],
      };
      const storedValue: ProgramAreaReview = null;
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };

      validateRoleForProgramAreaReview(
        updatedValue,
        storedValue,
        userType,
        loggedInUser,
      );

      expect(validateRoleForFormFieldSpy).toHaveBeenCalledTimes(2);
      expect(validateRoleForSelectedRoleReviewsSpy).not.toHaveBeenCalled();
    });

    it('successfully validates newly added reviews', () => {
      const updatedValue: ProgramAreaReview = {
        selectedRoles: ['ROLE_1', 'ROLE_2'],
        reviews: {
          ROLE_1: {
            isAcknowledged: true,
            reviewNote: 'TEST',
          },
        },
      };
      const storedValue: ProgramAreaReview = {
        selectedRoles: ['ROLE_1', 'ROLE_2'],
      };
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };

      validateRoleForProgramAreaReview(
        updatedValue,
        storedValue,
        userType,
        loggedInUser,
      );

      expect(validateRoleForFormFieldSpy).toHaveBeenCalledTimes(2);
      expect(validateRoleForSelectedRoleReviewsSpy).toHaveBeenCalledWith(
        updatedValue.reviews.ROLE_1,
        undefined,
        userType,
        `review.programArea.reviews.ROLE_1`,
      );
    });

    it('fails and throws error if the review was deleted NOT by the user who created it', () => {
      const updatedValue: ProgramAreaReview = {
        selectedRoles: ['ROLE_1', 'ROLE_2'],
        reviews: {
          ROLE_1: {
            isAcknowledged: true,
            reviewNote: 'TEST',
          },
          ROLE_2: null, // deleted review
        },
      };
      const storedValue: ProgramAreaReview = {
        selectedRoles: ['ROLE_1', 'ROLE_2'],
        reviews: {
          ROLE_2: { ...piaReviewMock },
        },
      };
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'RANDOM_USER',
      };

      try {
        validateRoleForProgramAreaReview(
          updatedValue,
          storedValue,
          userType,
          loggedInUser,
        );
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
        expect(validateRoleForFormFieldSpy).toHaveBeenCalledTimes(2);
        expect(validateRoleForSelectedRoleReviewsSpy).not.toHaveBeenCalled();
      }
    });

    it('succeeds if a review was deleted by the SAME user who created it', () => {
      const updatedValue: ProgramAreaReview = {
        selectedRoles: ['ROLE_1', 'ROLE_2'],
        reviews: {
          ROLE_1: {
            isAcknowledged: true,
            reviewNote: 'TEST',
          },
          ROLE_2: null, // deleted review
        },
      };
      const storedValue: ProgramAreaReview = {
        selectedRoles: ['ROLE_1', 'ROLE_2'],
        reviews: {
          ROLE_2: { ...piaReviewMock, reviewedByGuid: 'KNOWN_USER' },
        },
      };
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'KNOWN_USER',
      };

      validateRoleForProgramAreaReview(
        updatedValue,
        storedValue,
        userType,
        loggedInUser,
      );

      expect(validateRoleForFormFieldSpy).toHaveBeenCalledTimes(2);
      expect(validateRoleForSelectedRoleReviewsSpy).toHaveBeenCalledTimes(2); // one for deleted and one for addition
    });
  });
});
