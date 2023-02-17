import { IPiaForm } from './pia-form.interface';

export interface IPIAResult {
  id: number;
}

export interface IPIAResults {
  data: IPiaForm[];
  page: number;
  pageSize: number;
  total: number;
}
