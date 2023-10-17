import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { ReviewedBy } from './ReviewedBy';
import { DateReviewed } from './DateReviewed';
import { EditReviewButton } from './EditReviewButton';
import { ReviewNote } from './ReviewNote';
import { IsAcknowledgedCheckbox } from './IsAcknowledgedCheckbox';

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

  return (
    <div className="row mb-5 p-3 pb-5 border border-2 rounded">
      {role && <h3>{role}</h3>}
      {!editMode && (
        <ReviewedBy
          isAcknowledged={isAcknowledged}
          reviewedByDisplayName={reviewedByDisplayName ?? ''}
        />
      )}
      {canEditReview && !editMode && (
        <EditReviewButton setEditMode={setEditMode} />
      )}
      {!editMode && (
        <DateReviewed
          isAcknowledged={isAcknowledged}
          reviewedAtTime={reviewedAtTime ?? ''}
        />
      )}
      <IsAcknowledgedCheckbox
        isAcknowledged={isAcknowledged}
        checkBoxLabel={checkBoxLabel}
        editMode={editMode}
        setAcknowledged={setAcknowledged}
      />
      <ReviewNote
        editMode={editMode}
        reviewNoteRequired={reviewNoteRequired ?? false}
        reviewNote={reviewNote}
        setReviewNote={setReviewNote}
        onClearClick={onClearClick}
        isAcknowledged={isAcknowledged}
        setEditMode={setEditMode}
        onConfirmClick={onConfirmClick}
      />
    </div>
  );
};
