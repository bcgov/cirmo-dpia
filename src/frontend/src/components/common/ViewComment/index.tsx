import CommentsSidebar from '../../public/CommentsSidebar';
import { useContext, useEffect, useState } from 'react';
import { PiaSections } from '../../../types/enums/pia-sections.enum';
import ReactDOM from 'react-dom';
import CommentSidebarProps from '../../public/CommentsSidebar/interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../contexts/PiaFormContext';

const ViewComments = () => {
  const {
    pia,
    comments,
    piaCollapsibleChangeHandler,
    isReadOnly,
    accessControl,
    validationMessage,
  } = useContext<IPiaFormContext>(PiaFormContext);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const toggleSidebar = () => {
    if (piaCollapsibleChangeHandler) piaCollapsibleChangeHandler(!isRightOpen);
    setIsRightOpen(!isRightOpen);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <a href="#" onClick={toggleSidebar}>
        View comments ({comments ? comments.length : 0})
      </a>
    </div>
  );
};
export default ViewComments;
