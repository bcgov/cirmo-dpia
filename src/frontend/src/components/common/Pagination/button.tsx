import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaginationButtonProps, Direction } from './interfaces';

const PaginationButton = (props: PaginationButtonProps) => {
  let classValue = 'bcgovbtn__primary';
  if (props.direction == Direction.left && props.currentPage == 1) {
    classValue = 'bcgovbtn__primary--disabled';
  }
  if (
    props.direction == Direction.right &&
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
    >
      <FontAwesomeIcon className="dropdown-icon" icon={props.icon} />
    </button>
  );
};

export default PaginationButton;
