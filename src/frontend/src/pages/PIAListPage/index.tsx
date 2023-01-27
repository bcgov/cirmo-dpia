import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';
import { usePIALookup } from '../../hooks/usePIALookup';
import { tableHeadingProperties } from './tableProperties';
import { PiaSorting } from '../../constant/constant';
import Pagination from '../../components/common/Pagination';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBox from '../../components/common/SearchBox';
import PIAIntakeFilter from '../../components/public/PIAIntakeFilter';

const PIAList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [SortBy, setSortBy] = useState('');
  const [SortOrder, setSortOrder] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [headings, setHeading] = useState(tableHeadingProperties);
  const [PageSizedefault, setPageSizedefault] = useState(10);

  const [filterByMinistry] = useState<string>('');
  const [filterByStatus] = useState<string>('');
  const [filterPiaDrafterByCurrentUser] = useState<string>('');
  const { tableData, Page, Total } = usePIALookup(
    SortBy,
    SortOrder,
    currentPage,
    PageSizedefault,
  );

  const [searchText, setSearchText] = useState(
    searchParams.get('searchText') || '',
  );
  const setSearchParamsForSearchText = () => {
    const params: any = {};

    params.searchText = searchText;
    if (searchParams.get('filterPiaDrafterByCurrentUser'))
      params.filterPiaDrafterByCurrentUser = filterPiaDrafterByCurrentUser;
    if (searchParams.get('filterByStatus'))
      params.filterByStatus = filterByStatus;
    if (searchParams.get('filterByMinistry'))
      params.filterByMinistry = filterByMinistry;

    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    console.log('params', params);
    setSearchParams(params);
  };

  const updateSearchUrl = () => {
    // navigate(`?searchText=${searchText}`);
    setSearchParamsForSearchText();
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        const params: any = {};

        params.searchText = searchText;
        if (searchParams.get('filterPiaDrafterByCurrentUser'))
          params.filterPiaDrafterByCurrentUser = filterPiaDrafterByCurrentUser;
        if (searchParams.get('filterByStatus'))
          params.filterByStatus = filterByStatus;
        if (searchParams.get('filterByMinistry'))
          params.filterByMinistry = filterByMinistry;

        for (const [key, value] of searchParams.entries()) {
          params[key] = value;
        }
        console.log('params', params);
        setSearchParams(params);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [
    filterByMinistry,
    filterByStatus,
    filterPiaDrafterByCurrentUser,
    navigate,
    searchParams,
    searchText,
    setSearchParams,
  ]);

  const handleClearSearchText = () => {
    setSearchText('');
    searchParams.delete('searchText');
    setSearchParams(searchParams);
  };

  const handleSearchTextChange = (newSearchText: any) => {
    setSearchText(newSearchText.target.value);
  };
  //Switch ordering states
  function startSorting(Sortheading: string) {
    Object.keys(headings).forEach((key) => {
      if (key === Sortheading) {
        headings[Sortheading].sortValue =
          headings[Sortheading].sortValue >= PiaSorting.ASCENDING
            ? PiaSorting.DESCENDING
            : headings[Sortheading].sortValue + 1;
        setSortBy(key);
        setSortOrder(headings[Sortheading].sortValue);
      } else {
        headings[key].sortValue = 0;
      }
    });
    setHeading(headings);
  }

  function changePage(changeCurrentPage: number) {
    if (
      !changeCurrentPage ||
      changeCurrentPage < 1 ||
      changeCurrentPage > Math.ceil(Total / PageSizedefault)
    ) {
      return;
    }
    setcurrentPage(changeCurrentPage);
  }

  function changePageSize(PageSize: number) {
    setcurrentPage(1);
    setPageSizedefault(PageSize);
  }

  return (
    <div className="bcgovPageContainer background bcgovPageContainer__with-controls wrapper">
      <div className="page__controls full__width">
        <h1>List of PIAs</h1>
        <a href="/ppq" className="bcgovbtn bcgovbtn__primary">
          Create New
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div>
      <div className="search-container-wrapper">
        <PIAIntakeFilter />
        <SearchBox
          searchText={searchText}
          onChange={handleSearchTextChange}
          onSearchClick={updateSearchUrl}
          onClearSearchClick={handleClearSearchText}
        />
      </div>
      {tableData.length === 0 ? (
        <EmptyPIAList />
      ) : (
        <PIAListTable
          headings={tableHeadingProperties}
          pias={tableData}
          sorting={startSorting}
        />
      )}
      {tableData.length ? (
        <Pagination
          currentPage={currentPage}
          totalEntries={Total}
          pageSize={PageSizedefault}
          changePage={changePage}
          changePageSize={changePageSize}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default PIAList;
