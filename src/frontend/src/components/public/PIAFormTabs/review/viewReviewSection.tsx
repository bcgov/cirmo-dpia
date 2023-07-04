import Checkbox from '../../../common/Checkbox';
import messages from './messages';
import { PiaStatuses } from '../../../../constant/constant';
import { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../../utils/date';
import { getGUID } from '../../../../utils/helper.util';
import { IReviewSection } from './interfaces';

interface IReviewProps {
  pia: IPiaForm;
  reviewSection?: IReviewSection;
  editReviewNote: Dispatch<SetStateAction<boolean>>;
  printPreview?: boolean;
  role?: string;
}

const ViewReviewSection = (props: IReviewProps) => {
  const { pia, reviewSection, printPreview, editReviewNote, role } = props;

  return (
    <div className="row mb-5 p-3 border border-2 rounded">
      <h3>{role}</h3>
      <div className="col col-md-3">
        <b> Reviewed by</b>
        <div className="mt-2">{reviewSection?.reviewedByDisplayName}</div>
      </div>
      {pia?.status === PiaStatuses.FINAL_REVIEW &&
        pia?.review?.mpo?.reviewedByGuid === getGUID() &&
        !printPreview && (
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
          <b> Date reviewed</b>
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
          checked={true}
          isLink={false}
          label={
            messages.PiaReviewHeader.MinistrySection.Input.AcceptAccountability
              .en
          }
          readOnly={reviewSection?.isAcknowledged}
        />
      </div>
      <div className="row mt-4">
        <div className="col col-md-3">
          <b> Review note</b>
          <div className="mt-2"> {reviewSection?.reviewNote}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewReviewSection;
