import { useEffect, useState } from 'react';
import { API_ROUTES } from '../constant/apiRoutes';

import { IPIAIntake } from '../types/interfaces/pia-intake.interface';
import { IPIAResults } from '../types/interfaces/pia-result.interface';
import { HttpRequest } from '../utils/http-request.util';

export const usePIALookup = (
  sortBy: string,
  sortOrder: number,
  pageNumber: number,
  pageSize: number,
) => {
  const [tableData, setTableData] = useState<IPIAIntake[]>([]);
  const [PageSize, setPageSize] = useState<number>(0);
  const [Total, setTotal] = useState<number>(0);
  const [Page, setPage] = useState<number>(0);
  console.log('usePIALookup', sortBy, sortOrder, pageNumber, pageSize);
  useEffect(() => {
    (async () => {
      let params = {};
      if (sortBy && sortOrder) {
        params = {
          sortBy: sortBy,
          sortOrder: String(sortOrder),
        };
      }
      if (pageNumber) {
        params = {
          ...params,
          page: String(pageNumber),
        };
      }
      if (pageSize) {
        params = {
          ...params,
          pageSize: String(pageSize),
        };
      }
      try {
        // Actually perform fetch
        const results = await HttpRequest.get<IPIAResults>(
          API_ROUTES.PIA_INTAKE,
          {},
          {},
          true,
          params,
        );
        setTableData(results.data);
        setPage(results.page);
        setPageSize(results.pageSize);
        setTotal(results.total);
      } catch (e) {
        throw new Error('Fetch pia failed');
      }
    })();
  }, [sortBy, sortOrder, Page, pageNumber, pageSize]);
  return {
    tableData,
    PageSize,
    Total,
    Page,
  };
};
