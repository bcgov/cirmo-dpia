import { useEffect, useState } from 'react';
import { API_ROUTES } from '../constant/apiRoutes';

import { IPIAIntake } from '../types/interfaces/pia-intake.interface';
import { IPIAResults } from '../types/interfaces/pia-result.interface';
import { HttpRequest } from '../utils/http-request.util';

export const usePIALookup = () => {
  const [tableData, setTableData] = useState<IPIAIntake[]>([]);
  useEffect(() => {
    (async () => {
      try {
        // Actually perform fetch
        const results = (
          await HttpRequest.get<IPIAResults>(API_ROUTES.PIA_INTAKE)
        ).data;
        setTableData(results);
      } catch (e) {
        throw new Error('Fetch pia failed');
      }
    })();
  }, []);
  return {
    tableData,
  };
};
