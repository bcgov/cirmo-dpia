import Checkbox from '../../../common/Checkbox';
import messages from './messages';
import { PiaStatuses } from '../../../../constant/constant';
import { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../../utils/date';
import { getGUID } from '../../../../utils/helper.util';

interface IMPOReviewProps {
  pia: IPiaForm;
  editReviewNote: Dispatch<SetStateAction<boolean>>;
}

const ViewMPOReview = (props: IMPOReviewProps) => {
  const { pia, editReviewNote } = props;
  return (
    <div className="d-grid gap-3">
      <div className="row">
        <div className="col col-md-3">
          <b> Reviewed by</b>
          <div className="mt-2"> {pia?.review?.mpo?.reviewedByDisplayName}</div>
        </div>
        {pia.status !== PiaStatuses.FINAL_REVIEW &&
          pia?.review?.mpo?.reviewedByGuid === getGUID() && (
            <div className=" col d-flex justify-content-end">
              <button
                className="bcgovbtn bcgovbtn__tertiary p-3"
                onClick={() => {
                  editReviewNote(true);
                }}
              >
                <FontAwesomeIcon className="ms-1" icon={faFileEdit} size="lg" />
                Edit review
              </button>
            </div>
          )}
        <div className="row mt-4 ">
          <div className="col col-md-3">
            <b> Date received</b>
            <div className="mt-2">
              {pia?.review?.mpo?.reviewedAt
                ? dateToString(new Date(pia.review.mpo.reviewedAt))
                : 'N/A'}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col col-md-3">
            <b> Review note</b>
            <div className="mt-2"> {pia?.review?.mpo?.reviewNote}</div>
          </div>
        </div>
        <div className="row mt-4">
          <Checkbox
            value=""
            checked={true}
            isLink={false}
            label={
              messages.PiaReviewHeader.MinistrySection.Input
                .AcceptAccountability.en
            }
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewMPOReview;
