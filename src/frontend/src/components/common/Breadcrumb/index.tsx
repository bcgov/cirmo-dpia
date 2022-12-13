import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
const Breadcrumb = (): React.ReactElement => {
  return (
    <div className="mt-0">
      <p>
        <a href="/pia-list"> List of PIAs </a>
        <FontAwesomeIcon className="icon" icon={faAngleRight} /> Create New
      </p>
    </div>
  );
};

export default Breadcrumb;
