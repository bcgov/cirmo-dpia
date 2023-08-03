import { ForbiddenException } from '@nestjs/common';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';
import { Review } from '../jsonb-classes/review';
import { CpoReview } from '../jsonb-classes/review/cpo-review';
import { ProgramAreaSelectedRolesReview } from '../jsonb-classes/review/programArea/programAreaSelectedRoleReviews';

/**
 * @method updateReviewSubmissionFields
 * @description
 * This method updates the dto with the submission related fields, which needs to be filled in by the server based on the user logged in
 */
export const updateReviewSubmissionFields = (
  updatedValue:
    | Review
    | Record<string, ProgramAreaSelectedRolesReview>
    | Record<string, CpoReview>, // add more types here
  storedValue:
    | Review
    | Record<string, ProgramAreaSelectedRolesReview>
    | Record<string, CpoReview>,
  user: KeycloakUser,
  key: 'mpo' | string,
  allowedInSpecificStatus?: PiaIntakeStatusEnum[] | null,
  updatedStatus?: PiaIntakeStatusEnum,
) => {
  if (!updatedValue?.[key]) return;

  // overwrite the updated values to include the stored fields that may not be passed by the client
  if (updatedValue?.[key]) {
    updatedValue[key] = {
      ...(storedValue?.[key] || {}),
      ...updatedValue?.[key],
    };
  }

  // Scenario 1: User is saving review information for the first time [First time save]
  // Scenario 2: User is saving review information for the subsequent times [Editing]

  // Either ways, if the value is changed from the stored one, update the submission fields
  if (
    storedValue?.[key]?.isAcknowledged !==
      updatedValue?.[key]?.isAcknowledged ||
    storedValue?.[key]?.reviewNote !== updatedValue?.[key]?.reviewNote
  ) {
    // if it is not the same person updating the fields, throw forbidden error
    if (
      storedValue?.[key]?.reviewedByGuid &&
      storedValue?.[key]?.reviewedByGuid !== user.idir_user_guid
    ) {
      throw new ForbiddenException({
        message: `You do not have permissions to edit this review.`,
      });
    }

    if (
      allowedInSpecificStatus &&
      updatedStatus &&
      !allowedInSpecificStatus.includes(updatedStatus)
    ) {
      throw new ForbiddenException({
        message: 'You do not permissions to update review in this status',
      });
    }

    // if first time reviewed
    if (!storedValue?.[key]?.reviewedByGuid) {
      updatedValue[key].reviewedAt = new Date();
      updatedValue[key].reviewedByGuid = user.idir_user_guid;
      updatedValue[key].reviewedByUsername = user.idir_username;
      updatedValue[key].reviewedByDisplayName = user.display_name;
    }

    // update last review updated at
    updatedValue[key].reviewLastUpdatedAt = new Date();
  }
};
