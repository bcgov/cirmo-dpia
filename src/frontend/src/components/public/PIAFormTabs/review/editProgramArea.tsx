/** This is the editable version of the viewProgramArea UI */
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Checkbox from '../../../common/Checkbox';
import { dateToString } from '../../../../utils/date';
import { useState } from 'react';
import messages from './messages';

interface IEditProgramAreaReviewProps {
  pia: IPiaForm;
  role: string;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

const EditProgramAreaReview = (props: IEditProgramAreaReviewProps) => {
  const { pia, role, stateChangeHandler } = props;

  /**
   * Local state for the checkbox and review note
   */
  const [acknowledged, setAcknowledged] = useState(
    pia.review?.programArea?.reviews?.[role]?.isAcknowledged || false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.programArea?.reviews?.[role]?.reviewNote || '',
  );

  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `programArea.reviews.${role}`, true);
  };
  const handleClear = () => {
    stateChangeHandler(null, `programArea.reviews.${role}`, true);
  };
  const reviewedByDisplayName = Object(
    props.pia?.review?.programArea?.reviews,
  )?.[role]?.reviewedByDisplayName;

  const reviewedAt = Object(props.pia?.review?.programArea?.reviews)?.[role]
    ?.reviewedAt;

  return (
    <div className="d-grid gap-3">
      <div className="mt-2 pb-2">
        <div className="row mb-5 p-3 pb-5 border border-2 rounded">
          {props.role && <h3>{props.role}</h3>}
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
                          Object(props.pia?.review?.programArea?.reviews)?.[
                            role
                          ]?.reviewedAt,
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
                messages.PiaReviewHeader.ProgramAreaSection.Input
                  .AcceptAccountability.en
              }
              onChange={(e) => setAcknowledged(e.target.checked)}
              readOnly={false}
            />
          </div>
          <div className="row mt-1">
            <b>Review note (optional)</b>
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

export default EditProgramAreaReview;
