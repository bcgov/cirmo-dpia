/** This is the editable version of the viewProgramArea UI */
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Checkbox from '../../../common/Checkbox';
import { dateToString } from '../../../../utils/date';

interface IEditProgramAreaReviewProps {
  pia: IPiaForm;
  role: string;
  changeHandler: (value: any, path: string) => void;
}

const EditProgramAreaReview = (props: IEditProgramAreaReviewProps) => {
  const { pia, role, changeHandler } = props;

  return (
    <div className="d-grid gap-3">
      <div className="mt-2 pb-2">
        <div className="row mb-5 p-3 border border-2 rounded">
          <h3>{props.role}</h3>
          <div className="col col-md-3">
            <b> Reviewed by</b>
            <div className="mt-2">
              {props.pia?.review?.programArea?.reviews?.[role]?.reviewedByDisplayName}
            </div>
          </div>
          <div className="row mt-4 ">
            <div className="col col-md-3">
              <b> Date received</b>
              <div className="mt-2">
                {props.pia?.review?.programArea?.reviews?.[role]?.reviewedAt
                  ? dateToString(
                      new Date(
                        props.pia?.review?.programArea?.reviews?.[role]?.reviewedAt,
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
                pia.review?.programArea.reviews?.[role]?.isAcknowledged === true
                  ? true
                  : false
              }
              isLink={false}
              label="Accept accountability"
              onChange={(e) => {
                changeHandler(
                  e.target.checked,
                  `review.programArea.reviews.${role}.isAcknowledged`,
                );
              }}
              readOnly={false}
            />
          </div>
          <div className="row mt-4">
            <div className="col col-md-3">
              <b> Review note</b>
              <div className="ps-2 mt-2">
                {props.pia?.review?.programArea?.reviews?.[role]?.reviewNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProgramAreaReview;
