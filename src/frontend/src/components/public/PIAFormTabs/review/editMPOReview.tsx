/** This is the editable version of the review cpo part UI */
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { useState } from 'react';
import messages from './messages';
import EditReviewSection from './editReviewSection';

interface IEditMPOReviewProps {
  pia: IPiaForm;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

const EditMPOReview = (props: IEditMPOReviewProps) => {
  const { pia, stateChangeHandler } = props;

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
            messages.PiaReviewHeader.MinistrySection.MPO.Input
              .AcceptAccountability.en
          }
          reviewNoteOption={'required'}
          onClearClick={handleClear}
          onConfirmClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditMPOReview;
