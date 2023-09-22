import { useState } from 'react';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import ViewReviewSection from './viewReviewSection';
import { getGUID } from '../../../../utils/user';
import messages from './messages';
import { getUserPrivileges } from '../../../../utils/statusList/common';

interface IMPOReviewProps {
  pia: IPiaForm;
  printPreview?: boolean;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

const ViewMPOReview = (props: IMPOReviewProps) => {
  const { pia, printPreview, stateChangeHandler } = props;
  const reviewedByDisplayName = Object(props.pia?.review?.mpo)
    ?.reviewedByDisplayName;

  const reviewedAt = Object(props.pia?.review?.mpo)?.reviewedAt;
  const reviewGuid = Object(props.pia?.review?.mpo)?.reviewedByGuid;

  /**
   * Local state for the checkbox and review note
   */
  const [acknowledged, setAcknowledged] = useState(
    pia.review?.mpo?.isAcknowledged || false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.mpo?.reviewNote || '',
  );

  const [editReviewNote, setEditReviewNote] = useState(false);

  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `mpo`, true);
  };

  const handleClear = () => {
    stateChangeHandler(null, `mpo`, true);
  };

  const privilegedToEdit =
    getUserPrivileges(pia)?.Pages?.review?.params?.editMpoReview ?? false;

  const canEditReview =
    reviewGuid === getGUID() && !printPreview && privilegedToEdit;

  return (
    <div className="d-grid gap-3">
      {printPreview ? (
        <div>
          {pia?.review?.mpo?.isAcknowledged === false ||
          pia?.review?.mpo?.isAcknowledged === undefined ? (
            <div className="row mb-5 p-3 pb-5 border border-2 rounded">
              <div> Reviewed by</div>
              <div> Review incomplete</div>
            </div>
          ) : (
            <div>
              <ViewReviewSection
                pia={pia}
                printPreview
                editReviewNote={editReviewNote}
                setEditReviewNote={setEditReviewNote}
                isAcknowledged={acknowledged}
                setAcknowledged={setAcknowledged}
                setReviewNote={setReviewNote}
                reviewedByDisplayName={reviewedByDisplayName}
                reviewNote={reviewNote}
                reviewedAtTime={reviewedAt}
                checkBoxLabel={
                  messages.PiaReviewHeader.MinistrySection.MPO.Input
                    .AcceptAccountability.en
                }
                canEditReview={canEditReview}
                onClearClick={handleClear}
                onConfirmClick={handleSubmit}
              />
            </div>
          )}
        </div>
      ) : (
        <ViewReviewSection
          pia={pia}
          printPreview
          editReviewNote={editReviewNote}
          setEditReviewNote={setEditReviewNote}
          isAcknowledged={acknowledged}
          setAcknowledged={setAcknowledged}
          setReviewNote={setReviewNote}
          reviewedByDisplayName={reviewedByDisplayName}
          reviewNote={reviewNote}
          reviewedAtTime={reviewedAt}
          checkBoxLabel={
            messages.PiaReviewHeader.MinistrySection.MPO.Input
              .AcceptAccountability.en
          }
          canEditReview={canEditReview}
          onClearClick={handleClear}
          onConfirmClick={handleSubmit}
        />
      )}
    </div>
  );
};

export default ViewMPOReview;
