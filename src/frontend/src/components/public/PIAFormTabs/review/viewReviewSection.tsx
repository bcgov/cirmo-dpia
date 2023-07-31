import Checkbox from '../../../common/Checkbox';
import messages from './messages';
import { PiaStatuses } from '../../../../constant/constant';
import { Dispatch, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../../utils/date';
import { getGUID } from '../../../../utils/helper.util';
import { IReviewSection, IReview } from './interfaces';
import { statusList } from '../../../../utils/status';

interface IReviewProps {
  pia: IPiaForm;
  reviewSection?: IReviewSection;
  editReviewNote?: Dispatch<SetStateAction<boolean>>;
  stateChangeHandler?: (value: any, path: string, callApi?: boolean) => void;
  printPreview?: boolean;
  role?: string;
  isAcknowledged: boolean;
}

const ViewReviewSection = (props: IReviewProps) => {
  const {
    pia,
    reviewSection,
    printPreview,
    editReviewNote,
    stateChangeHandler,
    role,
    isAcknowledged,
  } = props;

  const reviewGuid = reviewSection?.reviewedByGuid;

  const canEditReviewNote =
    reviewGuid === getGUID() &&
    !printPreview &&
    statusList?.(pia)?.[pia?.status!]?.Pages?.review?.params?.editReviewNote;

  const [editReview, setEditReview] = useState(false);
  const [reviewNote, setReviewNote] = useState(
    pia.review?.programArea?.reviews?.[
      role as keyof IReview['programArea']['reviews']
    ]?.reviewNote,
  );

  const handleClear = () => {
    stateChangeHandler?.(null, `programArea.reviews.${role}`, true);
  };
  return (
    <div className="row mb-5 p-3 pb-5 border border-2 rounded">
      <h3>{role}</h3>
      <div className="col col-md-3">
        <b>Reviewed by</b>
        <div className="mt-2">{reviewSection?.reviewedByDisplayName}</div>
      </div>

      {canEditReviewNote && (
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
            {reviewSection?.reviewedAt
              ? dateToString(new Date(reviewSection?.reviewedAt))
              : 'N/A'}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <Checkbox
          value=""
          checked={isAcknowledged}
          isLink={false}
          label={
            messages.PiaReviewHeader.MinistrySection.Input.AcceptAccountability
              .en
          }
          readOnly={!editReview}
        />
      </div>
      {(editReview || reviewSection?.reviewNote) && (
        <div className="row mt-4">
          <b>Review note</b>
          {editReview ? (
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
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  disabled={
                    reviewNote ===
                    pia.review?.programArea?.reviews?.[
                      role as keyof IReview['programArea']['reviews']
                    ]?.reviewNote
                  }
                  className="bcgovbtn bcgovbtn__primary"
                  onClick={() => {
                    stateChangeHandler?.(
                      reviewNote,
                      `programArea.reviews.${role}.reviewNote`,
                      true,
                    );
                    setEditReview(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2">{reviewSection?.reviewNote}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewReviewSection;
