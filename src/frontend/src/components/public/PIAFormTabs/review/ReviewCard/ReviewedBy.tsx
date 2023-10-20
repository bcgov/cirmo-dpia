import { ReviewedByProps } from '../helpers/types';

export const ReviewedBy = (props: ReviewedByProps) => {
  const { isAcknowledged, reviewedByDisplayName } = props;
  return (
    <div className="col col-md-3">
      <b>Reviewed by</b>
      <div className="mt-2">
        {isAcknowledged ? reviewedByDisplayName : 'N/A'}
      </div>
    </div>
  );
};
