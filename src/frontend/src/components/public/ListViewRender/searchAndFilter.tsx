import SearchBox from '../../common/SearchBox';
import PIAIntakeFilter from '../PIAIntakeFilter';
import { IsearchAndFilter } from './interface';

const SearchAndFilter = (props: IsearchAndFilter) => {
  const showIntakeFilter = () => {
    if (props.showfilter) {
      if (
        props.showfilter.showStatus ||
        props.showfilter.showMinistry ||
        props.showfilter.showDrafter
      ) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="w-100">
      <div className="row">
        <div className="col-lg-8 col-xl-7">
          {showIntakeFilter() && (
            <PIAIntakeFilter
              filterChangeHandler={props.filterChangeHandler}
              defaultSearchParam={props.searchParams}
            />
          )}
        </div>
        <div className="col-lg-4 col-xl-5 pt-4 pt-lg-0">
          <SearchBox
            searchText={props.searchText}
            onChange={props.handleSearchTextChange}
            onEnter={() => props.setSearchParamsForSearchText()}
            onSearchClick={props.updateSearchUrl}
            onClearSearchClick={props.handleClearSearchText}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
