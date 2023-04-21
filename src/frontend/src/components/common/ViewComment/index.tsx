import { useContext, useEffect, useState } from 'react';
import ViewCommentProps from './interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../contexts/PiaFormContext';

const ViewComments = ({ path, count = 0 }: ViewCommentProps) => {
  const { piaCollapsibleChangeHandler, piaCommentPathHandler } =
    useContext<IPiaFormContext>(PiaFormContext);
  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);

  const openSidebar = () => {
    if (piaCollapsibleChangeHandler)
      piaCollapsibleChangeHandler(isRightOpen ? false : true);
    if (piaCommentPathHandler) piaCommentPathHandler(path);
    setIsRightOpen(!isRightOpen);
  };
  useEffect(() => {
    if (isRightOpen === true) {
      setIsRightOpen(isRightOpen);
    }
  }, [isRightOpen, path]);

  return (
    <div className="d-flex justify-content-center mt-4">
      <a href="#" onClick={openSidebar}>
        View comments ({count ? +count : 0})
      </a>
    </div>
  );
};
export default ViewComments;
