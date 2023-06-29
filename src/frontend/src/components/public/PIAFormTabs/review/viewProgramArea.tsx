import { Dispatch, SetStateAction } from 'react';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import ViewReviewSection from './viewReviewSection';

interface IProgramAreaReviewProps {
  pia: IPiaForm;
  editReviewNote: Dispatch<SetStateAction<boolean>>;
  printPreview?: boolean;
  role: string;
}

const ViewProgramAreaReview = (props: IProgramAreaReviewProps) => {
  const { pia, printPreview, editReviewNote, role } = props;

  return (
    <div className="d-grid gap-3">
      {printPreview ? (
        <div className="review-container px-2 ">
          <div className="mt-2 pb-2">
            <h3>
              <b> {role} </b>
            </h3>
          </div>
          {!pia?.review?.programArea?.review?.isAcknowledged ? (
            <>
              <div> Reviewed by</div>
              <div> Review incomplete</div>
            </>
          ) : (
            <div>
              <ViewReviewSection
                pia={pia}
                reviewSection={pia?.review?.programArea?.review}
                editReviewNote={editReviewNote}
                printPreview
              />
            </div>
          )}
        </div>
      ) : (
        <ViewReviewSection
          pia={pia}
          reviewSection={pia?.review?.programArea?.review}
          editReviewNote={editReviewNote}
        />
      )}
    </div>
  );
};

export default ViewProgramAreaReview;
