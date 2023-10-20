import { ReviewNoteTextAreaProps } from '../helpers/types';

export const ReviewNoteTextArea = (props: ReviewNoteTextAreaProps) => {
  const {
    reviewNote,
    setReviewNote,
    onClearClick,
    isAcknowledged,
    reviewNoteRequired,
    setEditMode,
    onConfirmClick,
  } = props;
  return (
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
};
