import { useState } from 'react';
import { ReviewCard } from './ReviewCard/ReviewCard';
import { getUserPrivileges } from '../../../../utils/statusList/common';
import { getGUID } from '../../../../utils/user';
import { IMPOReviewProps } from './helpers/interfaces';
import messages from './helpers/messages';

export const MPOReviewSection = (props: IMPOReviewProps) => {
  const { pia, printPreview, stateChangeHandler } = props;

  const userGUID = getGUID();
  const reviewedAt = pia?.review?.mpo?.reviewedAt;
  const reviewGuid = pia?.review?.mpo?.reviewedByGuid;
  const reviewedByDisplayName = pia?.review?.mpo?.reviewedByDisplayName;

  const privilegedToEdit =
    getUserPrivileges(pia)?.Pages?.review?.params?.editMpoReview ?? false;

  const [acknowledged, setAcknowledged] = useState(
    pia.review?.mpo?.isAcknowledged ?? false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.mpo?.reviewNote ?? '',
  );
  const [editMode, setEditMode] = useState(
    !printPreview && privilegedToEdit && !acknowledged,
  );

  // Make read-only when canEditReview is false.
  const canEditReview =
    reviewGuid === userGUID && !printPreview && privilegedToEdit;

  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `mpo`, true);
  };
  const handleClear = () => {
    setReviewNote('');
    setAcknowledged(false);
    stateChangeHandler(null, `mpo`, true);
  };

  return (
    <section className="mt-5 ">
      <h3>{messages.PiaReviewHeader.MinistrySection.MPO.Title.en}</h3>
      <p className="pb-4">
        {messages.PiaReviewHeader.MinistrySection.MPO.Description.en}
      </p>
      <div className="drop-shadow card p-4 p-md-5">
        <div className="data-table__container">
          <ReviewCard
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
              messages.PiaReviewHeader.MinistrySection.MPO.Input
                .AcceptAccountability.en
            }
            onConfirmClick={handleSubmit}
            onClearClick={handleClear}
          />
        </div>
      </div>
    </section>
  );
};
