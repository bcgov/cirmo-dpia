import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../constant/apiRoutes';

import { IPIAIntake } from '../types/interfaces/pia-intake.interface';
import { IPIAResults } from '../types/interfaces/pia-result.interface';
import { HttpRequest } from '../utils/http-request.util';

export const usePIALookup = (sortBy: string, sortOrder: number) => {
  const [tableData, setTableData] = useState<IPIAIntake[]>([]);
  const location = useLocation();
  console.log('test', location.search)
  useEffect(() => {
    (async () => {
      let params = {};
      if (sortBy && sortOrder) {
        params = {
          sortBy: sortBy,
          sortOrder: String(sortOrder),
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
  }, [sortBy, sortOrder]);
  return {
    tableData,
  };
};
