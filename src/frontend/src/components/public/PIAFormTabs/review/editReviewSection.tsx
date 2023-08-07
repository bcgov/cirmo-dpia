import Checkbox from '../../../common/Checkbox';
import messages from './messages';
import { PiaStatuses } from '../../../../constant/constant';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  MouseEventHandler,
  ChangeEventHandler,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../../utils/date';
import { getGUID } from '../../../../utils/helper.util';
import { IReviewSection, IReview } from './interfaces';

interface IReviewProps {
  pia: IPiaForm;
  reviewSection?: IReviewSection;
  editReviewNote: boolean;
  setEditReviewNote: Dispatch<SetStateAction<boolean>>;
  setAcknowledged: Dispatch<SetStateAction<boolean>>;
  setReviewNote: Dispatch<SetStateAction<string>>;
  printPreview?: boolean;
  role?: string;
  isAcknowledged: boolean;
  checkBoxLabel: string;
  reviewNoteOption: 'required' | 'optional';
  onConfirmClick: MouseEventHandler<HTMLButtonElement>;
  onClearClick: MouseEventHandler<HTMLButtonElement>;
  reviewNote: string;
}

const EditReviewSection = (props: IReviewProps) => {
  const {
    pia,
    reviewSection,
    printPreview,
    editReviewNote,
    setEditReviewNote,
    setAcknowledged,
    setReviewNote,
    role,
    isAcknowledged,
    checkBoxLabel,
    reviewNoteOption,
    onClearClick = () => {},
    onConfirmClick = () => {},
    reviewNote,
  } = props;
  const disableConfirmButton = () => {
    if (reviewNote.trim() === '') return true;
    return false;
  };
  return (
    <div className="row mb-5 p-3 pb-5 border border-2 rounded">
      {role ? <h3>{role}</h3> : null}

      <div className="row mt-4">
        <Checkbox
          value=""
          isLink={false}
          checked={isAcknowledged}
          label={checkBoxLabel}
          onChange={(e) => {
            setAcknowledged(e.target.checked);
          }}
        />
      </div>

      <div className="row mt-4">
        <b>
          Review note &nbsp;
          {reviewNoteOption === 'required' ? (
            <span className="error-text">(required)</span>
          ) : (
            `(
            optional
          )`
          )}
        </b>

        <div className="mt-1 pb-5">
          <textarea
            className="w-50 h-100"
            rows={5}
            cols={50}
            value={reviewNote}
            onChange={(e) => setReviewNote(e.target.value)}
          />
          <div className="d-flex gap-3 mt-2">
            <button
              className="bcgovbtn bcgovbtn__secondary"
              onClick={onClearClick}
            >
              Clear
            </button>
            <button
              disabled={disableConfirmButton()}
              className="bcgovbtn bcgovbtn__primary"
              onClick={(e) => {
                setEditReviewNote(false);
                onConfirmClick(e);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewSection;
