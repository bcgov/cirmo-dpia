import { PaginationDirection } from './enums';

export interface PaginationButtonProps {
  currentPage: number;
  totalEntries: number;
  pageSize: number;
  changePage: (page: number) => void;
  icon: any;
  direction: PaginationDirection;
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
