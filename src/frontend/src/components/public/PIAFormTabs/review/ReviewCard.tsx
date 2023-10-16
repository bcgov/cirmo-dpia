import { faFileEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '../../../../components/common/Checkbox';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { dateToString } from '../../../../utils/date';

interface IReviewProps {
  editMode: boolean;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
  isAcknowledged: boolean;
  setAcknowledged?: Dispatch<SetStateAction<boolean>>;
  reviewNote: string;
  setReviewNote?: Dispatch<SetStateAction<string>>;
  role?: string;
  reviewedAtTime?: string;
  reviewedByDisplayName?: string;
  checkBoxLabel: string;
  canEditReview?: boolean;
  reviewNoteRequired?: boolean;
  onConfirmClick?: MouseEventHandler<HTMLButtonElement>;
  onClearClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ReviewCard = (props: IReviewProps) => {
  const {
    editMode,
    setEditMode = () => {},
    isAcknowledged,
    setAcknowledged = () => {},
    reviewNote,
    setReviewNote = () => {},
    role,
    reviewedAtTime,
    reviewedByDisplayName,
    checkBoxLabel,
    canEditReview,
    reviewNoteRequired,
    onConfirmClick = () => {},
    onClearClick = () => {},
  } = props;

  // Mode: ReadOnly
  const ReviewedBy = () => (
    <div className="col col-md-3">
      <b>Reviewed by</b>
      <div className="mt-2">
        {isAcknowledged ? reviewedByDisplayName : 'N/A'}
      </div>
    </div>
  );

  // Mode: ReadOnly
  const DateReviewed = () => (
    <div className="row mt-4 ">
      <div className="col col-md-3">
        <b>Date reviewed</b>
        <div className="mt-2">
          {isAcknowledged && reviewedAtTime
            ? dateToString(new Date(reviewedAtTime))
            : 'N/A'}
        </div>
      </div>
    </div>
  );

  // Mode: ReadOnly when canEditReview
  const EditReviewButton = () => (
    <div className=" col d-flex justify-content-end">
      <button
        className="bcgovbtn bcgovbtn__tertiary p-3"
        onClick={() => {
          setEditMode(true);
        }}
      >
        <FontAwesomeIcon className="ms-1" icon={faFileEdit} size="lg" />
        Edit review
      </button>
    </div>
  );

  // Mode: Edit and ReadOnly
  const IsAcknowledgedCheckbox = () => (
    <div className="row mt-4">
      <Checkbox
        value=""
        checked={isAcknowledged}
        isLink={false}
        label={checkBoxLabel}
        readOnly={!editMode}
        onChange={(e) => {
          setAcknowledged(e.target.checked);
        }}
      />
    </div>
  );

  // Mode: Edit
  const ReviewNoteTextArea = () => (
    <div className="mt-1 pb-5">
      <textarea
        className="w-50 h-100"
        rows={5}
        cols={50}
        value={reviewNote}
        onChange={(e) => setReviewNote(e.target.value)}
      />
      <div className="d-flex gap-3 mt-2">
        <button className="bcgovbtn bcgovbtn__secondary" onClick={onClearClick}>
          Clear
        </button>
        <button
          disabled={
            !isAcknowledged || (reviewNoteRequired && reviewNote.trim() === '')
          }
          className="bcgovbtn bcgovbtn__primary"
          onClick={(e) => {
            setEditMode(false);
            onConfirmClick(e);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );

  // Mode: Edit and ReadOnly
  const ReviewNote = () => (
    <div className="row mt-4">
      {editMode ? (
        <b>
          Review note &nbsp;
          {reviewNoteRequired ? (
            <span className="error-text">(required)</span>
          ) : (
            `(
            optional
          )`
          )}
        </b>
      ) : (
        <b>Review note</b>
      )}
      {editMode ? (
        <ReviewNoteTextArea />
      ) : (
        <div className="mt-2">{reviewNote}</div>
      )}
    </div>
  );

  return (
    <div className="row mb-5 p-3 pb-5 border border-2 rounded">
      {role && <h3>{role}</h3>}
      {!editMode && <ReviewedBy />}
      {canEditReview && !editMode && <EditReviewButton />}
      {!editMode && <DateReviewed />}
      <IsAcknowledgedCheckbox />
      <ReviewNote />
    </div>
  );
};
