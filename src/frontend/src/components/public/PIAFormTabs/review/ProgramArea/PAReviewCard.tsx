import { getUserPrivileges } from '../../../../../utils/statusList/common';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import messages from '../helpers/messages';
import { useState } from 'react';
import { PAReviewProps } from '../helpers/types';

export const ProgramAreaReviewCard = (props: PAReviewProps) => {
  const { pia, printPreview, role, stateChangeHandler } = props;

  const reviewedAt =
    pia?.review?.programArea?.reviews?.[role]?.reviewedAt ?? '';
  const reviewedByDisplayName =
    pia?.review?.programArea?.reviews?.[role]?.reviewedByDisplayName ?? '';

  const privilegedToEdit =
    getUserPrivileges(pia)?.Pages?.review?.params?.editProgramAreaReview ??
    false;

  const [acknowledged, setAcknowledged] = useState(
    pia.review?.programArea?.reviews?.[role]?.isAcknowledged ?? false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.programArea?.reviews?.[role]?.reviewNote ?? '',
  );
  const [editMode, setEditMode] = useState(
    !printPreview && privilegedToEdit && !acknowledged,
  );

  // Make read-only when canEditReview is false.
  const canEditReview = !printPreview && privilegedToEdit;

  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `programArea.reviews.${role}`, true);
  };
  const handleClear = () => {
    setReviewNote('');
    setAcknowledged(false);
    stateChangeHandler(null, `programArea.reviews.${role}`, true);
  };

  return (
    <ReviewCard
      role={role}
      editMode={editMode}
      setEditMode={setEditMode}
      reviewedAtTime={reviewedAt}
      reviewedByDisplayName={reviewedByDisplayName}
      canEditReview={canEditReview}
      reviewNoteRequired={true}
      isAcknowledged={acknowledged}
      setAcknowledged={setAcknowledged}
      reviewNote={reviewNote}
      setReviewNote={setReviewNote}
      checkBoxLabel={
        messages.PiaReviewHeader.ProgramAreaSection.Input.AcceptAccountability
          .en
      }
      onConfirmClick={handleSubmit}
      onClearClick={handleClear}
    />
  );
};
