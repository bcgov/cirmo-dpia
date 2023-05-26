import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputText from '../InputText/InputText';
import { SearchBoxProps } from './interfaces';

const SearchBox = ({
  searchText = '',
  onChange = () => {},
  onEnter = () => {},
  onSearchClick = () => {},
  onClearSearchClick = () => {},
}: SearchBoxProps) => {
  return (
    <div className="w-100 d-inline-flex justify-content-lg-end search-container">
      <InputText
        placeholder="Search by title or drafter"
        value={searchText}
        className="search_input"
        required={false}
        onChange={onChange}
        onEnter={onEnter}
      />

      <button
        onClick={onSearchClick}
        className="search-icon-container bcgovbtn bcgovbtn__primary bcgovbtn__primary-search search-icon-container"
        aria-label="Search submit button"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <button
        onClick={onClearSearchClick}
        className="bcgovbtn bcgovbtn__tertiary ps-3 pe-0 fw-bold"
        aria-label="Clear search button"
      >
        Clear search
      </button>
    </div>
  );
};

export default SearchBox;
