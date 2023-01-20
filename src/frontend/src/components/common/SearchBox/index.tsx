import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import InputText from '../InputText/InputText';
import { SearchBoxProps } from './interfaces';

const SearchBox = ({
  searchText = '',
  onChange = () => {},
  onSearchClick = () => {},
  onClearSearchClick = () => {},
}: SearchBoxProps) => {
  return (
    <div className="d-flex pt-3 ms-auto ">
      <div className="col col-md-7 p-0">
        <InputText
          placeholder="Search by title or drafter"
          value={searchText}
          required={false}
          onChange={onChange}
        />
      </div>

      <div className="fa-sm mt-4 search-icon-btn">
        <button
          onClick={onSearchClick}
          className="bcgovbtn bcgovbtn__primary bcgovbtn__primary-search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="mt-3">
        <button
          onClick={onClearSearchClick}
          className="bcgovbtn bcgovbtn__tertiary "
        >
          Clear search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
