import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputText from '../InputText/InputText';
import { SearchBoxProps } from './interfaces';

const SearchBox = ({
  searchText = '',
  onChange = () => {},
  onSearchClick = () => {},
  onClearSearchClick = () => {},
}: SearchBoxProps) => {
  return (
    <div className="d-flex ms-auto search-container">
      <div className="search-sub-container">
        <div className="search-input">
          <InputText
            placeholder="Search by title or drafter"
            value={searchText}
            required={false}
            onChange={onChange}
          />
        </div>

        <div className="search-icon-container">
          <button
            onClick={onSearchClick}
            className="bcgovbtn bcgovbtn__primary bcgovbtn__primary-search search-icon-container"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      <div className="mt-1">
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
