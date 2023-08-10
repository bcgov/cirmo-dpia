/**
 * @class RoleReview
 * @file src/modules/pia-intake/jsonb-classes/review/role-review.ts
 */

import { ForbiddenException } from '@nestjs/common';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { RoleReview } from 'src/modules/pia-intake/jsonb-classes/review/role-review';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import {
  piaReviewMetadataMock,
  piaReviewMock,
} from 'test/util/mocks/data/pia-review.mock';
import * as validateRoleForFormField from 'src/common/validators/form-field-role.validator';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { IFormField } from 'src/common/interfaces/form-field.interface';

describe('`Role Review` class', () => {
  /**
   * @method isReviewPristine
   */
  describe('`isReviewPristine` method', () => {
    it('returns true when either updated and stored values are not defined', () => {
      const updatedValue: RoleReview = null;
      const storedValue: RoleReview = null;

      const result = RoleReview.isReviewPristine(updatedValue, storedValue);

      expect(result).toBe(true);
    });

    it('returns false when review is newly added', () => {
      const updatedValue: RoleReview = { ...piaReviewMock };
      const storedValue: RoleReview = null;

      const result = RoleReview.isReviewPristine(updatedValue, storedValue);

      expect(result).toBe(false);
    });

    it('returns false when review is deleted', () => {
      const updatedValue: RoleReview = null;
      const storedValue: RoleReview = { ...piaReviewMock };

      const result = RoleReview.isReviewPristine(updatedValue, storedValue);

      expect(result).toBe(false);
    });

    it('returns false when review is updated', () => {
      const updatedValue: RoleReview = {
        ...piaReviewMock,
        reviewNote: 'Updated',
      };
      const storedValue: RoleReview = { ...piaReviewMock };

      const result = RoleReview.isReviewPristine(updatedValue, storedValue);

      expect(result).toBe(false);
    });
  });

  /**
   * @method validateReviewDelete
   */
  describe('`validateReviewDelete` method', () => {
    it('returns false when review is NOT deleted, but updated', () => {
      const updatedValue: RoleReview = {
        ...piaReviewMock,
        reviewNote: 'Updated',
      };
      const storedValue: RoleReview = { ...piaReviewMock };

      const loggedInUser: KeycloakUser = { ...keycloakUserMock };
      const path = 'review.cpo.id1';

      const result = RoleReview.validateReviewDelete(
        updatedValue,
        storedValue,
        loggedInUser,
        path,
      );

      expect(result).toBe(false);
    });

    it('returns true when review is Deleted by the same user who created it', () => {
      const updatedValue: RoleReview = null;
      const storedValue: RoleReview = {
        ...piaReviewMock,
        reviewedByGuid: 'KNOWN_USER',
      };
      const loggedInUser: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'KNOWN_USER',
      };
      const path = 'review.cpo.id1';

      const result = RoleReview.validateReviewDelete(
        updatedValue,
        storedValue,
        loggedInUser,
        path,
      );

      expect(result).toBe(true);
    });

    it('fails and throws Forbidden error when the review is Deleted by a user other than the one created it', () => {
      const updatedValue: RoleReview = null;
      const storedValue: RoleReview = {
        ...piaReviewMock,
        reviewedByGuid: 'KNOWN_USER',
      };
      const loggedInUser: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'RANDOM_USER',
      };
      const path = 'review.cpo.id1';

      let result = undefined;

      try {
        result = RoleReview.validateReviewDelete(
          updatedValue,
          storedValue,
          loggedInUser,
          path,
        );
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      } finally {
        expect(result).toBeUndefined();
      }
    });
  });

  /**
   * @method validateRoleForReview
   */
  describe('`validateRoleForReview` method', () => {
    let validateRoleForFormFieldSpy = null;
    let isReviewPristineSpy = null;
    let validateReviewDeleteSpy = null;

    beforeEach(() => {
      validateRoleForFormFieldSpy = jest
        .spyOn(validateRoleForFormField, 'validateRoleForFormField')
        .mockImplementation(() => null);

      isReviewPristineSpy = jest
        .spyOn(RoleReview, 'isReviewPristine')
        .mockImplementation(() => null);

      validateReviewDeleteSpy = jest
        .spyOn(RoleReview, 'validateReviewDelete')
        .mockImplementation(() => null);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns without validating when review is untouched', () => {
      const updatedValue: RoleReview = null;
      const storedValue: RoleReview = null;
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };
      const path = 'review.mpo';
      const metadata: Array<IFormField<RoleReview>> = [];

      isReviewPristineSpy.mockImplementation(() => true);

      RoleReview.validateRoleForReview(
        updatedValue,
        storedValue,
        userType,
        path,
        loggedInUser,
        metadata,
      );

      expect(validateReviewDeleteSpy).not.toBeCalled();
      expect(validateRoleForFormFieldSpy).not.toBeCalled();
    });

    it('validates all form fields when review is created', () => {
      const updatedValue: RoleReview = {
        isAcknowledged: true,
        reviewNote: 'Updated',
        reviewedByDisplayName: 'TEST Display Name',
        reviewedByUsername: 'Test_Username',
        reviewedByGuid: 'GUID_1',
      };
      const storedValue: RoleReview = null;
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };
      const path = 'review.mpo';
      const metadata: Array<IFormField<RoleReview>> = [
        ...piaReviewMetadataMock,
      ];

      isReviewPristineSpy.mockImplementation(() => false);
      validateReviewDeleteSpy.mockImplementation(() => false);
      validateRoleForFormFieldSpy.mockImplementation(() => null);

      RoleReview.validateRoleForReview(
        updatedValue,
        storedValue,
        userType,
        path,
        loggedInUser,
        metadata,
      );

      expect(validateReviewDeleteSpy).toBeCalledTimes(1);
      expect(validateRoleForFormFieldSpy).toBeCalledTimes(5);
    });
    it('validates all form fields when review is updated', () => {
      const updatedValue: RoleReview = {
        isAcknowledged: true,
        reviewNote: 'Updated',
        reviewedByDisplayName: 'TEST Display Name',
        reviewedByUsername: 'Test_Username',
        reviewedByGuid: 'GUID_1',
      };
      const storedValue: RoleReview = {
        isAcknowledged: true,
        reviewNote: 'Stored',
        reviewedByDisplayName: 'TEST Display Name',
        reviewedByUsername: 'Test_Username',
        reviewedByGuid: 'GUID_1',
      };
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };
      const path = 'review.mpo';
      const metadata: Array<IFormField<RoleReview>> = [
        ...piaReviewMetadataMock,
      ];

      isReviewPristineSpy.mockImplementation(() => false);
      validateReviewDeleteSpy.mockImplementation(() => false);
      validateRoleForFormFieldSpy.mockImplementation(() => null);

      RoleReview.validateRoleForReview(
        updatedValue,
        storedValue,
        userType,
        path,
        loggedInUser,
        metadata,
      );

      expect(validateReviewDeleteSpy).toBeCalledTimes(1);
      expect(validateRoleForFormFieldSpy).toBeCalledTimes(5);
    });
    it('validates only USER created form fields when review is deleted', () => {
      const updatedValue: RoleReview = null;
      const storedValue: RoleReview = {
        isAcknowledged: true,
        reviewNote: 'Stored',
        reviewedByDisplayName: 'TEST Display Name',
        reviewedByUsername: 'Test_Username',
        reviewedByGuid: 'GUID_1',
      };
      const userType: UserTypesEnum[] = [UserTypesEnum.MPO];
      const loggedInUser: KeycloakUser = { ...keycloakUserMock };
      const path = 'review.mpo';
      const metadata: Array<IFormField<RoleReview>> = [
        {
          key: 'reviewNote',
          allowedUserTypesEdit: [],
          isSystemGeneratedField: true,
        },
        {
          key: 'isAcknowledged',
          allowedUserTypesEdit: [],
          isSystemGeneratedField: true,
        },
        {
          key: 'reviewedByDisplayName',
          allowedUserTypesEdit: [],
          isSystemGeneratedField: false,
        },
        {
          key: 'reviewedByUsername',
          allowedUserTypesEdit: [],
          isSystemGeneratedField: false,
        },
        {
          key: 'reviewedByGuid',
          allowedUserTypesEdit: [],
          isSystemGeneratedField: false,
        },
      ];

      isReviewPristineSpy.mockImplementation(() => false);
      validateReviewDeleteSpy.mockImplementation(() => true);
      validateRoleForFormFieldSpy.mockImplementation(() => null);

      RoleReview.validateRoleForReview(
        updatedValue,
        storedValue,
        userType,
        path,
        loggedInUser,
        metadata,
      );

      expect(validateReviewDeleteSpy).toBeCalledTimes(1);
      expect(validateRoleForFormFieldSpy).toBeCalledTimes(3); // 5 total - 2 system gen
    });
  });
});
