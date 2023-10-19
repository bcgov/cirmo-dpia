import ListPageNumber from './listPageNumber';
import ShowingText from './showingText';
import RowsPerPage from './rowsPerPage';
import { PaginationProps } from './helpers/types';

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
