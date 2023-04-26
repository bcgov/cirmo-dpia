import { useContext, useEffect, useState } from 'react';
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
      <a className="link-primary" onClick={openSidebar}>
        View comments ({count ? +count : 0})
      </a>
    </div>
  );
};
export default ViewComments;
