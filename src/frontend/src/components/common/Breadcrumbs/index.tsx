import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbProps } from './interfaces';
const Breadcrumbs = ({ items }: BreadcrumbProps): React.ReactElement => {
  const location = useLocation();
  return (
    <nav className="breadcrumb-wrapper ">
      <p>
        <Link
          className={
            location.pathname === '/ppq'
              ? 'breadcrumb-active'
              : 'breadcrumb-not-active'
          }
          to="/pia-list"
        >
          {items[0]}
        </Link>
        <FontAwesomeIcon
          className="icon breadcrumb-arrow"
          icon={faAngleRight}
        />
        <b>{items[items.length - 1]} </b>
      </p>
    </nav>
  );
};

export default Breadcrumbs;
