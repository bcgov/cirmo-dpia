export type PaginationProps = {
  currentPage: number;
  totalEntries: number;
  pageSize: number;
  changePage: (page: number) => void;
  changePageSize: (pageSize: number) => void;
};
