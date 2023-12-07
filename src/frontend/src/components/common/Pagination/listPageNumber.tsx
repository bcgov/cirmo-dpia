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
  // Calculate the total number of pages
  const totalPages = Math.ceil(props.totalEntries / props.pageSize);
  // Define the number of page numbers to show at once
  const pageNumbersToShow = 10;

  // Function to get the range of page numbers to display
  const getPaginationRange = () => {
    const halfRange = Math.floor(pageNumbersToShow / 2);
    let start = Math.max(1, props.currentPage - halfRange);
    const end = Math.min(totalPages, start + pageNumbersToShow - 1);

    // Adjust the start and end to ensure the range length is consistent
    if (end - start + 1 < pageNumbersToShow) {
      start = Math.max(1, end - pageNumbersToShow + 1);
    }

    // Create an array from the start to end page numbers
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Handlers for page changes
  const handleLeftPageChange = () => {
    props.changePage(Math.max(1, props.currentPage - 1));
  };

  const handleRightPageChange = () => {
    props.changePage(Math.min(totalPages, props.currentPage + 1));
  };

  const handleFirstPageChange = () => {
    props.changePage(1); // Go to the first page
  };

  const handleLastPageChange = () => {
    props.changePage(totalPages); // Go to the last page
  };

  // Handler for clicking on a specific page number
  const handlePageNumberClick = (pageNumber: number) => {
    props.changePage(pageNumber);
  };

  const paginationRange = getPaginationRange();

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="page__enumeration__container">
        {/* Buttons for navigating to the first and previous pages */}
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
        {/* Page number buttons */}
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
        {/* Buttons for navigating to the next and last pages */}
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
