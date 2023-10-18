import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { ReviewNoteTextArea } from './ReviewNoteTextArea';

type ReviewNoteProps = {
  editMode: boolean;
  reviewNoteRequired: boolean;
  reviewNote: string;
  setReviewNote: Dispatch<SetStateAction<string>>;
  onClearClick: MouseEventHandler<HTMLButtonElement>;
  isAcknowledged: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
};

export const ReviewNote = (props: ReviewNoteProps) => {
  const {
    editMode,
    reviewNote,
    setReviewNote,
    onClearClick,
    isAcknowledged,
    reviewNoteRequired,
    setEditMode,
    onConfirmClick,
  } = props;

  return (
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
        <ReviewNoteTextArea
          reviewNote={reviewNote}
          setReviewNote={setReviewNote}
          onClearClick={onClearClick}
          isAcknowledged={isAcknowledged}
          reviewNoteRequired={reviewNoteRequired ?? false}
          setEditMode={setEditMode}
          onConfirmClick={onConfirmClick}
        />
      ) : (
        <div className="mt-2">{reviewNote}</div>
      )}
    </div>
  );
};
