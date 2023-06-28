import Checkbox from '../../../common/Checkbox';
import messages from './messages';
import { PiaStatuses } from '../../../../constant/constant';
import { Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../../utils/date';
import { getGUID } from '../../../../utils/helper.util';
import ViewReviewSection from './viewReviewSection';

interface IMPOReviewProps {
  pia?: IPiaForm;
  editReviewNote: Dispatch<SetStateAction<boolean>>;
  printPreview?: boolean;
}

const ViewMPOReview = (props: IMPOReviewProps) => {
  const { pia, printPreview, editReviewNote } = props;

  console.log('test', pia?.review);
  return (
    <div className="d-grid gap-3">
      <div className="mt-2 pb-2">
        <h2> Ministry Privacy Office</h2>
      </div>
      {printPreview ? (
        <div className="review-container ">
          {pia?.review?.mpo?.isAcknowledged === false ? (
            <>
              <div> Reviewed by</div>
              <div> Review incomplete</div>
            </>
          ) : (
            <div>
              <ViewReviewSection
                pia={pia}
                editReviewNote={editReviewNote}
                printPreview
              />
            </div>
          )}
        </div>
      ) : (
        <ViewReviewSection
          pia={pia}
          editReviewNote={editReviewNote}
          printPreview
        />
      )}
    </div>
  );
};

export default ViewMPOReview;
