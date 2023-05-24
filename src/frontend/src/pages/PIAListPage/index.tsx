import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';
import { usePIALookup } from '../../hooks/usePIALookup';
import { tableHeadingProperties } from './tableProperties';
import { PiaSorting } from '../../constant/constant';
import Pagination from '../../components/common/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../../components/common/SearchBox';
import PIAIntakeFilter from '../../components/public/PIAIntakeFilter';

const PIAList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [SortBy, setSortBy] = useState('');
  const [SortOrder, setSortOrder] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [headings, setHeading] = useState(tableHeadingProperties);
  const [PageSizedefault, setPageSizedefault] = useState(10);

  const { tableData, Page, Total } = usePIALookup(
    SortBy,
    SortOrder,
    currentPage,
    PageSizedefault,
  );
  useEffect(() => {
    document.title = 'List of PIAs - Digital Privacy Impact Assessment (DPIA)';
  }, []); // Empty array ensures this runs once on mount and unmount

  const [searchText, setSearchText] = useState(
    searchParams.get('searchText') || '',
  );
  // TODO make a common function to handle search params update both for filter component and search text
  const setSearchParamsForSearchText = useCallback(() => {
    const params: any = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    // if the searchText is not empty, means user input some new searchText, we update it, otherwise delete it from params
    if (searchText !== '') params.searchText = searchText;
    else delete params.searchText;
    setSearchParams(params);
  }, [searchParams, searchText, setSearchParams]);

  const updateSearchUrl = () => {
    setSearchParamsForSearchText();
  };

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
      </div>
      <div className="w-100">
        <div className="row">
          <div className="col-lg-8 col-xl-7">
            <PIAIntakeFilter />
          </div>
          <div className="col-lg-4 col-xl-5 pt-4 pt-lg-0">
            <SearchBox
              searchText={searchText}
              onChange={handleSearchTextChange}
              onEnter={() => setSearchParamsForSearchText()}
              onSearchClick={updateSearchUrl}
              onClearSearchClick={handleClearSearchText}
            />
          </div>
        </div>
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
