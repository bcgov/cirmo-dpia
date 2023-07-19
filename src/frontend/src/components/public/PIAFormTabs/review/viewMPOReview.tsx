import { Dispatch, SetStateAction } from 'react';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import ViewReviewSection from './viewReviewSection';
import { IReviewSection } from './interfaces';

interface IMPOReviewProps {
  pia: IPiaForm;
  editReviewNote: Dispatch<SetStateAction<boolean>>;
  printPreview?: boolean;
  isAcknowledged: boolean;
}

const ViewMPOReview = (props: IMPOReviewProps) => {
  const { pia, printPreview, editReviewNote, isAcknowledged } = props;

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
                isAcknowledged={isAcknowledged}
              />
            </div>
          )}
        </div>
      ) : (
        <ViewReviewSection
          isAcknowledged={isAcknowledged}
          pia={pia}
          reviewSection={pia?.review?.mpo}
          editReviewNote={editReviewNote}
        />
      )}
    </div>
  );
};

export default ViewMPOReview;
