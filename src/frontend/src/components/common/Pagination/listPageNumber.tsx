import { ListPageNumberProps } from './helpers/interfaces';
import { PaginationDirection } from './helpers/enums';
import PaginationButton from './button';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
const ListPageNumber = (props: ListPageNumberProps) => {
  const totalPages = Math.ceil(props.totalEntries / props.pageSize);
  const pageNumbersToShow = 10;

  const getPaginationRange = () => {
    const halfRange = Math.floor(pageNumbersToShow / 2);
    let start = Math.max(1, props.currentPage - halfRange);
    const end = Math.min(totalPages, start + pageNumbersToShow - 1);

    if (end - start + 1 < pageNumbersToShow) {
      start = Math.max(1, end - pageNumbersToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleLeftPageChange = () => {
    props.changePage(Math.max(1, props.currentPage - 1));
  };

  const handleRightPageChange = () => {
    props.changePage(Math.min(totalPages, props.currentPage + 1));
  };

  const handleFirstPageChange = () => {
    props.changePage(1);
  };

  const handleLastPageChange = () => {
    props.changePage(totalPages);
  };

  const handlePageNumberClick = (pageNumber: number) => {
    props.changePage(pageNumber);
  };

  const paginationRange = getPaginationRange();

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="page__enumeration__container">
        <PaginationButton
          currentPage={props.currentPage}
          totalEntries={props.totalEntries}
          pageSize={props.pageSize}
          changePage={handleFirstPageChange}
          icon={faAnglesLeft}
          direction={PaginationDirection.left}
        />
        <PaginationButton
          currentPage={props.currentPage}
          totalEntries={props.totalEntries}
          pageSize={props.pageSize}
          changePage={handleLeftPageChange}
          icon={faAngleLeft}
          direction={PaginationDirection.left}
        />
        {paginationRange.map((pageNumber) => (
          <li
            tabIndex={0}
            aria-label={'Go to Page ' + pageNumber}
            key={pageNumber}
            onClick={() => handlePageNumberClick(pageNumber)}
            aria-current={pageNumber === props.currentPage}
            className={`page__enumeration ${
              pageNumber === props.currentPage ? 'pageActive' : ''
            }`}
          >
            {pageNumber}
          </li>
        ))}
        <PaginationButton
          currentPage={props.currentPage}
          totalEntries={props.totalEntries}
          pageSize={props.pageSize}
          changePage={handleRightPageChange}
          icon={faAngleRight}
          direction={PaginationDirection.right}
        />
        <PaginationButton
          currentPage={props.currentPage}
          totalEntries={props.totalEntries}
          pageSize={props.pageSize}
          changePage={handleLastPageChange}
          icon={faAnglesRight}
          direction={PaginationDirection.right}
        />
      </ul>
    </nav>
  );
};

export default ListPageNumber;
