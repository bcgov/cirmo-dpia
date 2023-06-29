import { Dispatch, SetStateAction } from 'react';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import ViewReviewSection from './viewReviewSection';

interface IMPOReviewProps {
  pia: IPiaForm;
  editReviewNote: Dispatch<SetStateAction<boolean>>;
  printPreview?: boolean;
}

const ViewMPOReview = (props: IMPOReviewProps) => {
  const { pia, printPreview, editReviewNote } = props;

  return (
    <div className="d-grid gap-3">
      {printPreview ? (
        <div className="review-container px-2">
          {pia?.review?.mpo?.isAcknowledged === false ? (
            <>
              <div> Reviewed by</div>
              <div> Review incomplete</div>
            </>
          ) : (
            <div>
              <ViewReviewSection
                pia={pia}
                reviewSection={pia.review?.mpo}
                editReviewNote={editReviewNote}
                printPreview
              />
            </div>
          )}
        </div>
      ) : (
        <ViewReviewSection
          pia={pia}
          reviewSection={pia?.review?.mpo}
          editReviewNote={editReviewNote}
        />
      )}
    </div>
  );
};

export default ViewMPOReview;
