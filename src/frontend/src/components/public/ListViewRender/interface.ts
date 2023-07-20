export interface IfilterMetaParams {
  [key: string]: boolean;
}

export interface IsearchAndFilter {
  filterChangeHandler: (params: URLSearchParams) => void;
  searchParams: URLSearchParams;
  searchText: string;
  handleSearchTextChange: (newSearchText: any) => void;
  setSearchParamsForSearchText: () => void;
  updateSearchUrl: () => void;
  handleClearSearchText: () => void;
  showfilter: IfilterMetaParams | null;
}

export interface IListViewRenderProps {
  showCompleted: boolean;
}
