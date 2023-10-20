import { dateToString } from '../../../../../utils/date';
import { DateReviewedProps } from '../helpers/types';

export const DateReviewed = (props: DateReviewedProps) => {
  const { isAcknowledged, reviewedAtTime } = props;
  return (
    <div className="row mt-4 ">
      <div className="col col-md-3">
        <b>Date reviewed</b>
        <div className="mt-2">
          {isAcknowledged && reviewedAtTime
            ? dateToString(new Date(reviewedAtTime))
            : 'N/A'}
        </div>
      </div>
    </div>
  );
};
