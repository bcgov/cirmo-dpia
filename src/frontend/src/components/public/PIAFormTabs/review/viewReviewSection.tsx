import Checkbox from '../../../common/Checkbox';
import messages from './messages';
import { Dispatch, SetStateAction, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../../utils/date';
import EditReviewSection from './editReviewSection';

interface IReviewProps {
  pia: IPiaForm;
  setEditReviewNote: Dispatch<SetStateAction<boolean>>;
  setAcknowledged: Dispatch<SetStateAction<boolean>>;
  setReviewNote: Dispatch<SetStateAction<string>>;
  editReviewNote: boolean;
  printPreview?: boolean;
  role?: string;
  isAcknowledged: boolean;
  section?: string;
  reviewedAtTime?: string;
  reviewedByDisplayName?: string;
  reviewNote: string;
  checkBoxLabel: string;
  canEditReview?: boolean;
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
  onClearClick: MouseEventHandler<HTMLButtonElement>;
}

const ViewReviewSection = (props: IReviewProps) => {
  const {
    pia,
    printPreview,
    editReviewNote,
    setEditReviewNote,
    setAcknowledged,
    setReviewNote,
    role,
    isAcknowledged,
    reviewedAtTime,
    reviewedByDisplayName,
    reviewNote,
    checkBoxLabel,
    canEditReview,
    onClearClick = () => {},
    onConfirmClick = () => {},
  } = props;


  return editReviewNote ? (
    <EditReviewSection
      pia={pia}
      isAcknowledged={isAcknowledged}
      reviewNote={reviewNote}
      editReviewNote={editReviewNote}
      setEditReviewNote={setEditReviewNote}
      setAcknowledged={setAcknowledged}
      setReviewNote={setReviewNote}
      checkBoxLabel={
        messages.PiaReviewHeader.MinistrySection.MPO.Input.AcceptAccountability
          .en
      }
      reviewNoteRequired
      onClearClick={onClearClick}
      onConfirmClick={onConfirmClick}
    />
  ) : (
    <>
      <div className="row mb-5 p-3 pb-5 border border-2 rounded">
        {role ? <h3>{role}</h3> : null}
        <div className="col col-md-3">
          <b>Reviewed by</b>
          <div className="mt-2">
            {isAcknowledged ? reviewedByDisplayName : 'N/A'}
          </div>
        </div>

        {canEditReview && (
          <div className=" col d-flex justify-content-end">
            <button
              className="bcgovbtn bcgovbtn__tertiary p-3"
              onClick={() => {
                setEditReviewNote(true);
              }}
            >
              <FontAwesomeIcon className="ms-1" icon={faFileEdit} size="lg" />
              Edit review
            </button>
          </div>
        )}

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
        <div className="row mt-4">
          <Checkbox
            value=""
            checked={isAcknowledged}
            isLink={false}
            label={checkBoxLabel}
            readOnly={true}
          />
        </div>

        <div className="row mt-4">
          <b>Review note</b>

          <div className="mt-2">{reviewNote}</div>
        </div>
      </div>
    </>
  );
};

export default ViewReviewSection;
