import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
const Breadcrumbs = (): React.ReactElement => {
  const location = useLocation();

  return (
    <nav className="breadcrumbs__nav">
      <Link
        className={
          location.pathname === '/ppq'
            ? 'breadcrumb-not-active'
            : 'breadcrumb-active'
        }
        to="/pia/list"
      >
        List of PIAs
      </Link>
      <FontAwesomeIcon className="icon breadcrumb-arrow" icon={faAngleRight} />
      <b>Create New PIA</b>
    </nav>
  );
};

export default Breadcrumbs;
