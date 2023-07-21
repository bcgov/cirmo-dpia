export interface IFilterMetaParams {
  [key: string]: boolean;
}

export interface ISearchAndFilter {
  filterChangeHandler: (params: URLSearchParams) => void;
  searchParams: URLSearchParams;
  searchText: string;
  handleSearchTextChange: (newSearchText: any) => void;
  setSearchParamsForSearchText: () => void;
  updateSearchUrl: () => void;
  handleClearSearchText: () => void;
  showfilter: IFilterMetaParams | null;
}

export interface IListViewRenderProps {
  showCompleted: boolean;
  title: string;
}
