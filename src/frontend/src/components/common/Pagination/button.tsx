import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaginationButtonProps } from './interfaces';
import { PaginationDirection } from './enums';
import { useEffect, useState } from 'react';

const PaginationButton = (props: PaginationButtonProps) => {
  const [buttonLabel, setButtonLabel] = useState('');

  useEffect(() => {
    if (props.direction == PaginationDirection.left) {
      setButtonLabel('Pagination Left Button');
    }
    if (props.direction == PaginationDirection.right) {
      setButtonLabel('Pagination Right Button');
    }
  }, [props.direction]);
  let classValue = 'bcgovbtn__primary';
  if (props.direction == PaginationDirection.left && props.currentPage == 1) {
    classValue = 'bcgovbtn__primary--disabled';
  }
  if (
    props.direction == PaginationDirection.right &&
    props.currentPage == Math.ceil(props.totalEntries / props.pageSize)
  ) {
    classValue = 'bcgovbtn__primary--disabled';
  }
  return (
    <button
      className={`bcgovbtn ${classValue}`}
      onClick={() => {
        props.changePage(props.currentPage + props.direction);
      }}
      aria-label={buttonLabel}
    >
      <FontAwesomeIcon className="dropdown-icon" icon={props.icon} />
    </button>
  );
};

export default PaginationButton;
