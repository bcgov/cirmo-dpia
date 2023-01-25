import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {
  MinistryList,
  PiaDrafterFilterList,
  PiaStatuses,
  PiaStatusList,
} from '../../../constant/constant';
import { isMPORole } from '../../../utils/helper.util';
import Dropdown from '../../common/Dropdown';
import { IFilter } from './interfaces';

const Filter = ({ id }: IFilter) => {
  const [ministry, setMinistry] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [drafterFilter, setDrafterFilter] = useState<string>('');

  const handlePiaStatusChange = (newStatus: any) => {
    setStatus(newStatus.target.value);
  };

  const handleMinistryChange = (newMinistry: any) => {
    setMinistry(newMinistry.target.value);
  };

  const handleDrafterFilterChange = (newDrafterFilter: any) => {
    setDrafterFilter(newDrafterFilter.target.value);
  };

  const handleClearFilterClick = () => {
    setStatus('');
    setMinistry('');
    setDrafterFilter('');
  };

  return (
    <div className="d-flex me-auto">
      <div className="mt-2"> Filter by</div>
      <Dropdown
        id="pia-status-select"
        value={status}
        label=""
        placeholder="Any status"
        optionalClass="px-2"
        options={PiaStatusList}
        changeHandler={handlePiaStatusChange}
        required={false}
      />
      {isMPORole() && (
        <>
          <Dropdown
            id="ministry-select"
            value={ministry}
            label=""
            placeholder="Any ministry"
            optionalClass=""
            options={MinistryList}
            changeHandler={handleMinistryChange}
            required={false}
          />

          <Dropdown
            id="drafter-filter-select"
            value={drafterFilter}
            label=""
            placeholder="Any drafter"
            optionalClass="px-2"
            options={PiaDrafterFilterList}
            changeHandler={handleDrafterFilterChange}
            required={false}
          />
        </>
      )}

      <div>
        <button
          className="bcgovbtn bcgovbtn__tertiary "
          onClick={handleClearFilterClick}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
