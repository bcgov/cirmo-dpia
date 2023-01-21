import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../constant/apiRoutes';

import { IPIAIntake } from '../types/interfaces/pia-intake.interface';
import { IPIAResults } from '../types/interfaces/pia-result.interface';
import { HttpRequest } from '../utils/http-request.util';

export const usePIALookup = (sortBy: string, sortOrder: number) => {
  const [tableData, setTableData] = useState<IPIAIntake[]>([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    (async () => {
      let params = {};
      if (sortBy && sortOrder) {
        params = {
          sortBy: sortBy,
          sortOrder: String(sortOrder),
        };
      }
      if (
        searchParams.get('searchText') !== null &&
        searchParams.get('searchText') !== undefined
      ) {
        params = {
          ...params,
          searchText: searchParams.get('searchText'),
        };
      }
      try {
        // Actually perform fetch
        const results = (
          await HttpRequest.get<IPIAResults>(
            API_ROUTES.PIA_INTAKE,
            {},
            {},
            true,
            params,
          )
        ).data;
        setTableData(results);
      } catch (e) {
        throw new Error('Fetch pia failed');
      }
    })();
  }, [searchParams, sortBy, sortOrder]);
  return {
    tableData,
  };
};
