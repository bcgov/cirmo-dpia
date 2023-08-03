import { ForbiddenException } from '@nestjs/common';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import { updateReviewSubmissionFields } from 'src/modules/pia-intake/helper/update-review-submission-fields';
import { ProgramAreaSelectedRolesReview } from 'src/modules/pia-intake/jsonb-classes/review/programArea/programAreaSelectedRoleReviews';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';

/**
 * @method updateReviewSubmissionFields
 * @description This method updates the dto with the submission related fields, which needs to be filled in by the server based on the user logged in
 * @fieldsUpdated reviewedAt, reviewedByGuid, reviewedByUsername, reviewedByDisplayName, reviewLastUpdatedAt
 * @input
 *  updatedValue: Review | Record<string, ProgramAreaSelectedRolesReview>
 *  storedValue: Review | Record<string, ProgramAreaSelectedRolesReview>
 *  user: KeycloakUser
 *  key: 'mpo' | string
 *  allowedInSpecificStatus?: PiaIntakeStatusEnum[] | null
 *  updatedStatus?: PiaIntakeStatusEnum
 */
describe('`updateReviewSubmissionFields` method', () => {
  it('does not update anything if updatedValue is not provided', () => {
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = null;
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Test Note' },
    };
    const user = { ...keycloakUserMock };

    updateReviewSubmissionFields(updatedValue, storedValue, user, 'mpo');

    expect(updatedValue?.mpo?.reviewLastUpdatedAt).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedAt).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByGuid).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByUsername).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByDisplayName).toBeUndefined();
  });

  it('does not update anything if updatedValue key is different than expected', () => {
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Updated Note' },
    };
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Test Note' },
    };
    const user = { ...keycloakUserMock };

    updateReviewSubmissionFields(updatedValue, storedValue, user, 'RANDOM_KEY');

    expect(updatedValue?.mpo?.reviewLastUpdatedAt).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedAt).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByGuid).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByUsername).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByDisplayName).toBeUndefined();
  });

  it('does not update anything if updatedValue has NO updated data', () => {
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Test Note' }, // same as before
    };
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Test Note' },
    };
    const user = { ...keycloakUserMock };

    updateReviewSubmissionFields(updatedValue, storedValue, user, 'mpo');

    expect(updatedValue?.mpo?.reviewLastUpdatedAt).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedAt).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByGuid).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByUsername).toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByDisplayName).toBeUndefined();
  });

  it('update fields if updatedValue HAS updated data', () => {
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Updated Note' },
    };
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Test Note' },
    };
    const user = { ...keycloakUserMock };

    updateReviewSubmissionFields(updatedValue, storedValue, user, 'mpo');

    expect(updatedValue?.mpo?.reviewLastUpdatedAt).not.toBeUndefined();
    expect(updatedValue?.mpo?.reviewedAt).not.toBeUndefined();
    expect(updatedValue?.mpo?.reviewedByGuid).toBe(user.idir_user_guid);
    expect(updatedValue?.mpo?.reviewedByUsername).toBe(user.idir_username);
    expect(updatedValue?.mpo?.reviewedByDisplayName).toBe(user.display_name);
  });

  it('fails and throws error if updatedValue has updated data, but a different reviewer', () => {
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Updated Note' },
    };
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: {
        isAcknowledged: true,
        reviewNote: 'Test Note',
        reviewedAt: new Date(),
        reviewedByDisplayName: 'ABCD',
        reviewedByGuid: 'OTHER_USER', // OTHER USER REVIEWED
        reviewLastUpdatedAt: new Date(),
        reviewedByUsername: 'RANDOM_USER',
      },
    };

    const user = { ...keycloakUserMock };

    try {
      updateReviewSubmissionFields(updatedValue, storedValue, user, 'mpo');
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('succeeds and updates reviewLastUpdatedAt when updated data is provided by the same user', () => {
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Updated Note' },
    };
    const user = { ...keycloakUserMock };
    const reviewedAt = new Date();
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: {
        isAcknowledged: true,
        reviewNote: 'Test Note',
        reviewedAt: reviewedAt,
        reviewedByDisplayName: user?.display_name,
        reviewedByGuid: user?.idir_user_guid,
        reviewLastUpdatedAt: reviewedAt,
        reviewedByUsername: user?.idir_username,
      },
    };

    updateReviewSubmissionFields(updatedValue, storedValue, user, 'mpo');

    expect(updatedValue.mpo.reviewLastUpdatedAt).not.toBe(
      storedValue.mpo.reviewLastUpdatedAt,
    );
    expect(updatedValue.mpo.reviewedAt).toBe(storedValue.mpo.reviewedAt);
    expect(updatedValue.mpo.reviewedByDisplayName).toBe(
      storedValue.mpo.reviewedByDisplayName,
    );
    expect(updatedValue.mpo.reviewedByGuid).toBe(
      storedValue.mpo.reviewedByGuid,
    );
    expect(updatedValue.mpo.reviewedByUsername).toBe(
      storedValue.mpo.reviewedByUsername,
    );
  });

  it('fails and throw error if updated are made in a NOT allowed status', () => {
    const user = { ...keycloakUserMock };
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Updated Note' }, // same as before
    };
    const reviewedAt = new Date();
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: {
        isAcknowledged: true,
        reviewNote: 'Test Note',
        reviewedAt: reviewedAt,
        reviewedByDisplayName: user?.display_name,
        reviewedByGuid: user?.idir_user_guid,
        reviewLastUpdatedAt: reviewedAt,
        reviewedByUsername: user?.idir_username,
      },
    };
    const key = 'mpo';
    const allowedInSpecificStatus: PiaIntakeStatusEnum[] = [
      PiaIntakeStatusEnum.COMPLETE,
      PiaIntakeStatusEnum.MPO_REVIEW,
    ];
    const updatedStatus: PiaIntakeStatusEnum = PiaIntakeStatusEnum.CPO_REVIEW;

    try {
      updateReviewSubmissionFields(
        updatedValue,
        storedValue,
        user,
        key,
        allowedInSpecificStatus,
        updatedStatus,
      );
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('succeeds and updates if updated are made in an allowed status', () => {
    const user = { ...keycloakUserMock };
    const updatedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: { isAcknowledged: true, reviewNote: 'Updated Note' }, // same as before
    };
    const reviewedAt = new Date();
    const storedValue: Record<string, ProgramAreaSelectedRolesReview> = {
      mpo: {
        isAcknowledged: true,
        reviewNote: 'Test Note',
        reviewedAt: reviewedAt,
        reviewedByDisplayName: user?.display_name,
        reviewedByGuid: user?.idir_user_guid,
        reviewLastUpdatedAt: reviewedAt,
        reviewedByUsername: user?.idir_username,
      },
    };
    const key = 'mpo';
    const allowedInSpecificStatus: PiaIntakeStatusEnum[] = [
      PiaIntakeStatusEnum.COMPLETE,
      PiaIntakeStatusEnum.MPO_REVIEW,
    ];
    const updatedStatus: PiaIntakeStatusEnum = PiaIntakeStatusEnum.MPO_REVIEW; // This status is allowed

    try {
      updateReviewSubmissionFields(
        updatedValue,
        storedValue,
        user,
        key,
        allowedInSpecificStatus,
        updatedStatus,
      );
    } catch (e) {
      expect(e).not.toBeInstanceOf(ForbiddenException);
    }
  });
});
