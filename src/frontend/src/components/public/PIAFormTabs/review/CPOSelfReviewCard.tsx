import { getGUID } from '../../../../utils/user';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { ReviewCard } from './ReviewCard';
import { getUserPrivileges } from '../../../../utils/statusList/common';
import { useState } from 'react';
import messages from './messages';

interface ICPOReviewProps {
  pia: IPiaForm;
  printPreview?: boolean;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

export const CPOSelfReviewCard = (props: ICPOReviewProps) => {
  const { pia, printPreview, stateChangeHandler } = props;

  const userGUID = getGUID();
  const reviewedAt = pia?.review?.cpo?.[userGUID]?.reviewedAt ?? '';
  const reviewedByDisplayName =
    pia?.review?.cpo?.[userGUID]?.reviewedByDisplayName ?? '';

  const privilegedToEdit =
    getUserPrivileges(pia)?.Pages?.review?.params?.editCpoReview ?? false;

  const [acknowledged, setAcknowledged] = useState(
    pia.review?.cpo?.[userGUID]?.isAcknowledged ?? false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.cpo?.[userGUID]?.reviewNote ?? '',
  );
  const [editMode, setEditMode] = useState(
    !printPreview && privilegedToEdit && !acknowledged,
  );

  const canEditReview = !printPreview && privilegedToEdit;

  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `cpo.${userGUID}`, true);
  };
  const handleClear = () => {
    setReviewNote('');
    setAcknowledged(false);
    stateChangeHandler(null, `cpo.${userGUID}`, true);
  };

  return (
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
        messages.PiaReviewHeader.MinistrySection.CPO.Input.AcceptAccountability
          .en
      }
      onConfirmClick={handleSubmit}
      onClearClick={handleClear}
    />
  );
};
