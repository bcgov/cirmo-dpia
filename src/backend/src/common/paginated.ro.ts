export class PaginatedRO<T> {
  data: T[];

  page?: number;

  pageSize?: number;

  total: number;

  constructor(
    data: Array<T>,
    page: number = null,
    pageSize: number = null,
    total: number = null,
  ) {
    this.data = data;
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
  }
}
