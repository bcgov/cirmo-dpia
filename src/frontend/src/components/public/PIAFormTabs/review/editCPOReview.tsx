/** This is the editable version of the review cpo part UI */
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';

import { useState } from 'react';
import messages from './messages';
import EditReviewSection from './editReviewSection';

interface IEditCPOReviewProps {
  pia: IPiaForm;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
  cpoId: string;
}

const EditCPOReview = (props: IEditCPOReviewProps) => {
  const { pia, stateChangeHandler, cpoId } = props;

  /**
   * Local state for the checkbox and review note
   */
  const [acknowledged, setAcknowledged] = useState(
    Object(pia.review?.cpo)?.[cpoId]?.isAcknowledged || false,
  );
  const [reviewNote, setReviewNote] = useState(
    Object(pia.review?.cpo)?.[cpoId]?.reviewNote || '',
  );

  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `cpo.${cpoId}`, true);
  };
  const [editReviewNote, setEditReviewNote] = useState(false);
  const handleClear = () => {
    stateChangeHandler(null, `cpo.${cpoId}`, true);
  };

  return (
    <div className="d-grid gap-3">
      <div className="mt-2 pb-2">
        <EditReviewSection
          pia={pia}
          isAcknowledged={acknowledged}
          reviewNote={reviewNote}
          editReviewNote={editReviewNote}
          setEditReviewNote={setEditReviewNote}
          setAcknowledged={setAcknowledged}
          setReviewNote={setReviewNote}
          checkBoxLabel={
            messages.PiaReviewHeader.MinistrySection.CPO.Input
              .AcceptAccountability.en
          }
          reviewNoteRequired
          onClearClick={handleClear}
          onConfirmClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditCPOReview;
