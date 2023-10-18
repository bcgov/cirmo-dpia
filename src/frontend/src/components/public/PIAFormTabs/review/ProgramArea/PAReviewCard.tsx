import { getUserPrivileges } from '../../../../../utils/statusList/common';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import messages from '../messages';
import { useState } from 'react';

type PAReviewProps = {
  pia: IPiaForm;
  printPreview?: boolean;
  role: string;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
};

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
