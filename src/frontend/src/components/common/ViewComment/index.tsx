import { useContext } from 'react';
import ViewCommentProps from './interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../contexts/PiaFormContext';

const ViewComments = ({ path, count = 0 }: ViewCommentProps) => {
  const { piaCollapsibleChangeHandler, piaCommentPathHandler } =
    useContext<IPiaFormContext>(PiaFormContext);

  const openSidebar = () => {
    if (piaCollapsibleChangeHandler) piaCollapsibleChangeHandler(true);
    if (piaCommentPathHandler) piaCommentPathHandler(path);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <button
        type="button"
        aria-label="View comments"
        className="bcgovbtn bcgovbtn__tertiary bold"
        onClick={openSidebar}
      >
        View comments ({count ? +count : 0})
      </button>
    </div>
  );
};
export default ViewComments;
