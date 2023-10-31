import EmptyPIAList from '../EmptyPIAList';
import PIAListTable from '../PIAListTable';
import { usePIALookup } from '../../../hooks/usePIALookup';
import { tableHeadingProperties } from './tableProperties';
import { PiaSorting, PiaStatuses } from '../../../constant/constant';
import Pagination from '../../common/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchAndFilter from './searchAndFilter';
import { IListViewRenderProps } from './interface';

const ListViewRender = (props: IListViewRenderProps) => {
  let setParamsComplete = new URLSearchParams();
  if (props.showCompleted) {
    setParamsComplete = new URLSearchParams({
      filterByStatus: PiaStatuses.COMPLETE,
    });
  }

  const showFilters = () => {
    let filters = null;
    if (props.showCompleted) {
      filters = {
        showStatus: false,
        showMinistry: false,
        showDrafter: false,
        showSearch: true,
      };
    }
    return filters;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [SortBy, setSortBy] = useState('updatedAt');
  const [SortOrder, setSortOrder] = useState(-1);
  const [currentPage, setcurrentPage] = useState(1);
  const [headings, setHeading] = useState(tableHeadingProperties);
  const [PageSizedefault, setPageSizedefault] = useState(10);
  const [filterMetaParams] = useState(showFilters);

  const { tableData, Total } = usePIALookup(
    SortBy,
    SortOrder,
    currentPage,
    PageSizedefault,
  );

  useEffect(() => {
    document.title = props.title + '- Digital Privacy Impact Assessment (DPIA)';
  }, [props.title]); // Empty array ensures this runs once on mount and unmount

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
    setcurrentPage(1);
    setSearchParams(params);
  }, [searchParams, searchText, setSearchParams]);

  const updateSearchUrl = () => {
    setcurrentPage(1);
    setSearchParamsForSearchText();
  };

  const handleClearSearchText = () => {
    setSearchText('');
    searchParams.delete('searchText');
    setcurrentPage(1);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const resetSearchText = () => {
      if (Object(searchParams).size === 0) {
        handleClearSearchText();
      }
    };
    resetSearchText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  /* This useEfect is to handle the case when user click on the completed tab,
   * if the current filter is not completed, we need to update the filter to completed
   *  Once can change the filter to completed through the url. This useeffect should
   *  be able to handle that case as well.
   */
  useEffect(() => {
    if (props.showCompleted) {
      if (searchParams.get('filterByStatus') !== PiaStatuses.COMPLETE) {
        setSearchParams(setParamsComplete);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.showCompleted, searchParams]);

  const handleSearchTextChange = (newSearchText: any) => {
    setcurrentPage(1);
    setSearchText(newSearchText.target.value);
  };
  //Switch ordering states
  function startSorting(Sortheading: string) {
    setcurrentPage(1);
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

  function filterChangeHandler(params: URLSearchParams) {
    setcurrentPage(1);
    setSearchParams(params);
  }

  return (
    <div className="bcgovPageContainer background bcgovPageContainer__with-controls wrapper">
      <div className="page__controls full__width">
        <h1>{props.title}</h1>
      </div>
      <SearchAndFilter
        filterChangeHandler={filterChangeHandler}
        searchParams={searchParams}
        searchText={searchText}
        handleSearchTextChange={handleSearchTextChange}
        setSearchParamsForSearchText={setSearchParamsForSearchText}
        updateSearchUrl={updateSearchUrl}
        handleClearSearchText={handleClearSearchText}
        showfilter={filterMetaParams}
      />

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

export default ListViewRender;
