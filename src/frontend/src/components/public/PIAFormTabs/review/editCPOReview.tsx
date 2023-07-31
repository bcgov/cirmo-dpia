/** This is the editable version of the review cpo part UI */
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Checkbox from '../../../common/Checkbox';
import { dateToString } from '../../../../utils/date';
import { useState } from 'react';
import messages from './messages';

interface IEditCPOReviewProps {
  pia: IPiaForm;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
  index: number;
}

const EditCPOReview = (props: IEditCPOReviewProps) => {
  const { pia, stateChangeHandler, index } = props;

  /**
   * Local state for the checkbox and review note
   */
  const [acknowledged, setAcknowledged] = useState(
    pia.review?.cpo?.[index]?.isAcknowledged || false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.cpo?.[index]?.reviewNote || '',
  );

  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `cpo.${index}`, true);
  };
  const handleClear = () => {
    stateChangeHandler(null, `cpo.${index}`, true);
  };
  const reviewedByDisplayName = Object(props.pia?.review?.cpo)?.[index]
    ?.reviewedByDisplayName;

  const reviewedAt = Object(props.pia?.review?.cpo)?.[index]?.reviewedAt;

  return (
    <div className="d-grid gap-3">
      <div className="mt-2 pb-2">
        <div className="row mb-1 p-3 pb-5 border border-2 rounded">
          {reviewedByDisplayName && (
            <div className="col col-md-3">
              <b>Reviewed by</b>
              <div className="mt-2">{reviewedByDisplayName}</div>
            </div>
          )}

          {reviewedAt && (
            <div className="row mt-4 ">
              <div className="col col-md-3">
                <b>Date reviewed</b>
                <div className="mt-2">
                  {reviewedAt
                    ? dateToString(
                        new Date(
                          Object(props.pia?.review?.cpo)?.[index]?.reviewedAt,
                        ),
                      )
                    : 'N/A'}
                </div>
              </div>
            </div>
          )}

          <div className="row mt-1">
            <Checkbox
              value=""
              checked={acknowledged}
              isLink={false}
              label={
                messages.PiaReviewHeader.MinistrySection.CPO.Input
                  .AcceptAccountability.en
              }
              onChange={(e) => setAcknowledged(e.target.checked)}
              readOnly={false}
            />
          </div>
          <div className="row mt-1">
            <b>
              Review note <span className="error-text">(required)</span>
            </b>
            <div className="ps-2 mt-2 pb-5">
              <textarea
                className="w-75 h-100"
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
                  disabled={!acknowledged}
                  className="bcgovbtn bcgovbtn__primary"
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCPOReview;
