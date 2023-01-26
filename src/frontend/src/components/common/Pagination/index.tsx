import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
  const PageSizeOptions = [10, 20, 30, 50, 100];
  return (
    <div className="pagination">
      <div className="pagination__container">
        <div className="pagination__container__left">
          <div className="pagination__container__left__text">
            <span>
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {totalEntries < pageSize * currentPage
                ? totalEntries
                : currentPage * pageSize}{' '}
              of {totalEntries} entries
            </span>
          </div>
        </div>
        <div className="pagination__container__right">
          <div className="pagination__container__right__text">
            <span className="rows-per-page">
              Rows per page
              <div className="dropdown">
                <button
                  className="dropdown-toggles form-control"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onChange={(e) =>
                    changePageSize(
                      parseInt((e.target as HTMLTextAreaElement).value),
                    )
                  }
                >
                  {pageSize}
                  <FontAwesomeIcon
                    className="dropdown-icon"
                    icon={faChevronDown}
                  />
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {PageSizeOptions.map((option) => {
                    return (
                      <li className="dropdown-item" key={option}
                        onClick={() => {
                          changePageSize(option);
                        }}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
                <div className="dropdown__content"></div>
              </div>
            </span>
          </div>
          <div className="pagination__container__right__buttons">
            <button
              className={`bcgovbtn ${
                currentPage == 1
                  ? 'bcgovbtn__primary--disabled'
                  : 'bcgovbtn__primary '
              }`}
              onClick={() => {
                changePage(currentPage - 1);
              }}
            >
              <FontAwesomeIcon className="dropdown-icon" icon={faAngleLeft} />
            </button>
            {totalEntries ? (
              <ul className="page__enumeration__container">
                {totalEntries > pageSize ? (
                  Array.from(
                    Array(Math.ceil(totalEntries / pageSize)),
                    (e, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => {
                            changePage(i + 1);
                          }}
                          className={`page__enumeration ${
                            i + 1 == currentPage ? 'pageActive' : ' '
                          }`}
                        >
                          {i + 1}
                        </li>
                      );
                    },
                  )
                ) : (
                  <li>{currentPage}</li>
                )}
              </ul>
            ) : (
              ''
            )}
            <button
              className={`bcgovbtn ${
                currentPage == Math.ceil(totalEntries / pageSize)
                  ? 'bcgovbtn__primary--disabled'
                  : 'bcgovbtn__primary '
              }`}
              onClick={() => {
                changePage(currentPage + 1);
              }}
            >
              <FontAwesomeIcon className="dropdown-icon" icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
