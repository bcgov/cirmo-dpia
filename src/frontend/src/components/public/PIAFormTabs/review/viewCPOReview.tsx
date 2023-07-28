import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import ViewReviewSection from './viewReviewSection';

interface ICPOReviewProps {
  pia: IPiaForm;
  printPreview?: boolean;
  isAcknowledged: boolean;
  index: number;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

const ViewCPOReview = (props: ICPOReviewProps) => {
  const { pia, printPreview, isAcknowledged, index, stateChangeHandler } =
    props;

  return (
    <div className="d-grid gap-3">
      {printPreview ? (
        <div className="review-container px-2">
          {pia?.review?.cpo?.[index].isAcknowledged === false ? (
            <>
              <div> Reviewed by</div>
              <div> Review incomplete</div>
            </>
          ) : (
            <div>
              <ViewReviewSection
                pia={pia}
                reviewSection={pia.review?.mpo}
                printPreview
                isAcknowledged={isAcknowledged}
                section="CPO"
              />
            </div>
          )}
        </div>
      ) : (
        <ViewReviewSection
          isAcknowledged={isAcknowledged}
          pia={pia}
          reviewSection={pia?.review?.mpo}
          stateChangeHandler={stateChangeHandler}
          section="CPO"
        />
      )}
    </div>
  );
};

export default ViewCPOReview;
