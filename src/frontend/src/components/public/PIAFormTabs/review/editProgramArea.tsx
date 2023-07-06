/** This is the editable version of the viewProgramArea UI */
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Checkbox from '../../../common/Checkbox';
import { dateToString } from '../../../../utils/date';
import { useState } from 'react';

interface IEditProgramAreaReviewProps {
  pia: IPiaForm;
  role: string;
  changeHandler: (value: any, path: string) => void;
}

const EditProgramAreaReview = (props: IEditProgramAreaReviewProps) => {
  const { pia, role, changeHandler } = props;

  /**
   * Local state for the checkbox and review note
   */
  const [acknowledged, setAcknowledged] = useState(
    pia.review?.programArea?.reviews?.[role]?.isAcknowledged || false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.programArea?.reviews?.[role]?.reviewNote || '',
  );

  return (
    <div className="d-grid gap-3">
      <div className="mt-2 pb-2">
        <div className="row mb-5 p-3 pb-5 border border-2 rounded">
          <h3>{props.role}</h3>
          <div className="col col-md-3">
            <b> Reviewed by</b>
            <div className="mt-2">
              {
                Object(props.pia?.review?.programArea?.reviews)?.[role]
                  ?.reviewedByDisplayName
              }
            </div>
          </div>
          <div className="row mt-4 ">
            <div className="col col-md-3">
              <b> Date received</b>
              <div className="mt-2">
                {Object(props.pia?.review?.programArea?.reviews)?.[role]
                  ?.reviewedAt
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
          <div className="row mt-4">
            <Checkbox
              value=""
              checked={
                acknowledged
              }
              isLink={false}
              label="Accept accountability"
              onChange={(e) => setAcknowledged(e.target.checked)}
              readOnly={false}
            />
          </div>
          <div className="row mt-4">
            <b> Review note</b>
            <div className="ps-2 mt-2 pb-5">
              <textarea className="w-75 h-100" value={reviewNote} onChange={(e) => setReviewNote(e.target.value)} />
              <div className="d-flex gap-3 mt-2">
                <button className="bcgovbtn bcgovbtn__secondary" onClick={() => {
                    setReviewNote('');
                  }}>Cancel</button>
                <button disabled={!acknowledged} className="bcgovbtn bcgovbtn__primary" onClick={() => changeHandler({ isAcknowledged: acknowledged, reviewNote }, `review.programArea.reviews.${role}`)}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProgramAreaReview;
