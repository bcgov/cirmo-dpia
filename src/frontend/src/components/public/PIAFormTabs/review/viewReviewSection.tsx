import Checkbox from '../../../common/Checkbox';
import messages from './messages';
import { PiaStatuses } from '../../../../constant/constant';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../../utils/date';
import { getGUID } from '../../../../utils/helper.util';
import { IReviewSection, IReview } from './interfaces';
import { statusList } from '../../../../utils/status';
import EditReviewSection from './editReviewSection';

interface IReviewProps {
  pia: IPiaForm;
  editReviewNote: Dispatch<SetStateAction<boolean>>;
  setAcknowledged: Dispatch<SetStateAction<boolean>>;
  setReviewNote: Dispatch<SetStateAction<string>>;
  stateChangeHandler?: (value: any, path: string, callApi?: boolean) => void;
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
    setAcknowledged,
    setReviewNote,
    stateChangeHandler,
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

  const [editReview, setEditReview] = useState(false);

  return editReview ? (
    <EditReviewSection
      pia={pia}
      isAcknowledged={isAcknowledged}
      reviewNote={reviewNote}
      editReviewNote={editReviewNote}
      setAcknowledged={setAcknowledged}
      setReviewNote={setReviewNote}
      checkBoxLabel={
        messages.PiaReviewHeader.MinistrySection.MPO.Input.AcceptAccountability
          .en
      }
      reviewNoteOption={'required'}
      onClearClick={onClearClick}
      onConfirmClick={onConfirmClick}
    />
  ) : (
    <>
      <div className="row mb-5 p-3 pb-5 border border-2 rounded">
        {role ? <h3>{role}</h3> : null}
        <div className="col col-md-3">
          <b>Reviewed by</b>
          <div className="mt-2">{reviewedByDisplayName}</div>
        </div>

        {canEditReview && (
          <div className=" col d-flex justify-content-end">
            <button
              className="bcgovbtn bcgovbtn__tertiary p-3"
              onClick={() => {
                if (editReviewNote) editReviewNote(true);
                else if (stateChangeHandler) setEditReview(true);
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
              {reviewedAtTime ? dateToString(new Date(reviewedAtTime)) : 'N/A'}
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
