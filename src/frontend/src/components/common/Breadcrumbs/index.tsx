import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbProps } from './interfaces';
const Breadcrumbs = ({
  firstItem,
  secondItem,
  thirdItem,
}: BreadcrumbProps): React.ReactElement => {
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
          {firstItem}
        </Link>
        <FontAwesomeIcon
          className="icon breadcrumb-arrow"
          icon={faAngleRight}
        />
        <b>{secondItem} </b>
      </p>
    </nav>
  );
};

export default Breadcrumbs;
