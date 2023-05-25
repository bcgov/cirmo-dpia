import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { RowsPerPageProps } from './interfaces';

const RowsPerPage = (props: RowsPerPageProps) => {
  const PageSizeOptions = [10, 20, 30, 50, 100];
  return (
    <span className="rows-per-page">
      Rows per page
      <div className="dropdown">
        <button
          aria-label="select rows per page button"
          className="dropdown-toggles form-control"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onChange={(e) =>
            props.changePageSize(
              parseInt((e.target as HTMLTextAreaElement).value),
            )
          }
        >
          {props.pageSize}
          <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {PageSizeOptions.map((option) => {
            return (
              <li
                className="dropdown-item"
                key={option}
                onClick={() => {
                  props.changePageSize(option);
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
  );
};

export default RowsPerPage;
