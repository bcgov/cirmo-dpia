import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MinistryList,
  PiaDrafterFilterList,
  PiaStatusList,
} from '../../../constant/constant';
import { isMPORole } from '../../../utils/helper.util';
import Dropdown from '../../common/Dropdown';

const PIAIntakeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterByMinistry, setFilterByMinistry] = useState<string>('');
  const [filterByStatus, setFilterByStatus] = useState<string>('');
  const [filterPiaDrafterByCurrentUser, setFilterPiaDrafterByCurrentUser] =
    useState<string>('');

  const setSearchParamsForFilter = (field: string, newValue: any) => {
    const params: any = {};
    switch (field) {
      case 'status':
        if (newValue.target.value !== '')
          params.filterByStatus = newValue.target.value;
        if (filterByMinistry !== '') params.filterByMinistry = filterByMinistry;
        if (filterPiaDrafterByCurrentUser)
          params.filterPiaDrafterByCurrentUser = filterPiaDrafterByCurrentUser;
        if (searchParams.get('searchText'))
          params.searchText = searchParams.get('searchText');
        setSearchParams(params);
        break;

      case 'ministry':
        if (newValue.target.value !== '')
          params.filterByMinistry = newValue.target.value;
        if (filterByStatus !== '') params.filterByStatus = filterByStatus;
        if (filterPiaDrafterByCurrentUser)
          params.filterPiaDrafterByCurrentUser = filterPiaDrafterByCurrentUser;
        if (searchParams.get('searchText'))
          params.searchText = searchParams.get('searchText');
        setSearchParams(params);
        break;
      case 'drafter':
        if (newValue.target.value !== '')
          params.filterPiaDrafterByCurrentUser = newValue.target.value;
        if (filterByStatus) params.filterByStatus = filterByStatus;
        if (filterByMinistry) params.filterByMinistry = filterByMinistry;
        if (searchParams.get('searchText'))
          params.searchText = searchParams.get('searchText');
        setSearchParams(params);
        break;
    }
  };

  const handlePiaStatusChange = (newStatus: any) => {
    setFilterByStatus(newStatus.target.value);
    setSearchParamsForFilter('status', newStatus);
  };

  const handleMinistryChange = (newMinistry: any) => {
    setFilterByMinistry(newMinistry.target.value);
    setSearchParamsForFilter('ministry', newMinistry);
  };

  const handleDrafterFilterChange = (newDrafterFilter: any) => {
    setFilterPiaDrafterByCurrentUser(newDrafterFilter.target.value);
    setSearchParamsForFilter('drafter', newDrafterFilter);
  };

  const handleClearFilterClick = () => {
    setFilterByMinistry('');
    setFilterByStatus('');
    setFilterPiaDrafterByCurrentUser('');
    searchParams.delete('filterPiaDrafterByCurrentUser');
    searchParams.delete('filterByMinistry');
    searchParams.delete('filterByStatus');
    setSearchParams(searchParams);
  };

  return (
    <div className="d-flex me-auto">
      <div className="mt-2"> Filter by</div>
      <Dropdown
        id="pia-status-select"
        value={filterByStatus}
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
            value={filterByMinistry}
            label=""
            placeholder="Any ministry"
            optionalClass=""
            options={MinistryList}
            changeHandler={handleMinistryChange}
            required={false}
          />

          <Dropdown
            id="drafter-filter-select"
            value={filterPiaDrafterByCurrentUser}
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

export default PIAIntakeFilter;
