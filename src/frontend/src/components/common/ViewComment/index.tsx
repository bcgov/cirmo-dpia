import CommentsSidebar from '../../public/CommentsSidebar';
import { useContext, useEffect, useState } from 'react';
import { PiaSections } from '../../../types/enums/pia-sections.enum';

import ViewCommentProps from './interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../contexts/PiaFormContext';

const ViewComments = ({ comments, path, count }: ViewCommentProps) => {
  const { piaCollapsibleChangeHandler, piaCommentPathHandler } =
    useContext<IPiaFormContext>(PiaFormContext);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const toggleSidebar = () => {
    if (piaCollapsibleChangeHandler)
      piaCollapsibleChangeHandler(isRightOpen ? false : true);
    if (piaCommentPathHandler) piaCommentPathHandler(path);
    setIsRightOpen(!isRightOpen);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <a href="#" onClick={toggleSidebar}>
        View comments ({count ? +count : 0})
      </a>
    </div>
  );
};
export default ViewComments;
