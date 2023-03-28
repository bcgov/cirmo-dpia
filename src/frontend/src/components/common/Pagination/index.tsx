import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import PaginationButton from './button';
import { direction } from './interfaces';
import ListPageNumber from './listPageNumber';
import ShowingText from './showingText';
import RowsPerPage from './rowsPerPage';

type PaginationProps = {
  currentPage: number;
  totalEntries: number;
  pageSize: number;
  changePage: (page: number) => void;
  changePageSize: (pageSize: number) => void;
};

const Pagination = ({
  currentPage,
  totalEntries,
  pageSize,
  changePage,
  changePageSize,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <div className="pagination__container">
        <div className="pagination__container__left">
          <div className="pagination__container__left__text">
            <ShowingText
              currentPage={currentPage}
              totalEntries={totalEntries}
              pageSize={pageSize}
              changePage={changePage}
            />
          </div>
          <div className="d-lg-none">
            <RowsPerPage pageSize={pageSize} changePageSize={changePageSize} />
          </div>
        </div>
        <div className="pagination__container__right">
          <div className="pagination__container__right__text d-none d-lg-block ">
            <RowsPerPage pageSize={pageSize} changePageSize={changePageSize} />
          </div>
          <div className="pagination__container__right__buttons">
            {totalEntries && (
              <ListPageNumber
                currentPage={currentPage}
                totalEntries={totalEntries}
                pageSize={pageSize}
                changePage={changePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
