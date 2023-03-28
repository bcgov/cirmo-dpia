export interface PaginationButtonProps {
  currentPage: number;
  totalEntries: number;
  pageSize: number;
  changePage: (page: number) => void;
  icon: any;
  direction: Direction;
}

export const enum Direction {
  left = -1,
  right = +1,
}

export interface ListPageNumberProps {
  currentPage: number;
  totalEntries: number;
  pageSize: number;
  changePage: (page: number) => void;
}

export interface RowsPerPageProps {
  pageSize: number;
  changePageSize: (pageSize: number) => void;
}
