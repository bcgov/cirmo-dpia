import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MinistryList,
  PiaDrafterFilterList,
  PiaStatusList,
} from '../../../constant/constant';
import { isMPORole, roleCheck } from '../../../utils/helper.util';
import Dropdown from '../../common/Dropdown';

const PIAIntakeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterByMinistry, setFilterByMinistry] = useState<string>(
    searchParams.get('filterByMinistry') || '',
  );
  const [filterByStatus, setFilterByStatus] = useState<string>(
    searchParams.get('filterByStatus') || '',
  );
  const [filterPiaDrafterByCurrentUser, setFilterPiaDrafterByCurrentUser] =
    useState<string>(searchParams.get('filterPiaDrafterByCurrentUser') || '');
  const isAdminRole = () => {
    const userRoles = roleCheck();
    if (userRoles !== undefined && userRoles.roles !== undefined) {
      if (userRoles.roles.length > 0) return true;
    }
    return false;
  };
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
    <div className="w-100 d-lg-inline-flex text-nowrap align-items-center">
      <label>Filter by</label>

      <div className="ms-lg-2 ms-xl-4 w-100">
        <div className="row">
          <div className="col-sm-6 col-md-3 pe-sm-0 pe-md-0">
            <Dropdown
              id="pia-status-select"
              value={filterByStatus}
              placeholder="Any status"
              options={PiaStatusList}
              changeHandler={handlePiaStatusChange}
              required={false}
            />
          </div>

          {isAdminRole() && (
            <div className="col-sm-6 col-md-3 pt-4 pt-sm-0 pe-md-0">
              <Dropdown
                id="ministry-select"
                value={filterByMinistry}
                placeholder="Any ministry"
                options={MinistryList}
                changeHandler={handleMinistryChange}
                required={false}
              />
            </div>
          )}

          {isAdminRole() && (
            <div className="col-sm-6 col-md-3 pt-4 pt-md-0 pe-sm-0">
              <Dropdown
                id="drafter-filter-select"
                value={filterPiaDrafterByCurrentUser}
                placeholder="Any drafter"
                options={PiaDrafterFilterList}
                changeHandler={handleDrafterFilterChange}
                required={false}
              />
            </div>
          )}
          <div className="col-sm-6 col-md-3 pt-4 pt-md-0 d-flex justify-content-start">
            <button
              className="bcgovbtn bcgovbtn__tertiary p-0 fw-bold"
              onClick={handleClearFilterClick}
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIAIntakeFilter;
