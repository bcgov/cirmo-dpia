import { IPIAIntake } from './pia-intake.interface';

export interface IPIAResult {
  id: number;
}

export interface IPIAResults {
  data: IPIAIntake[];
  page: number;
  pageSize: number;
  total: number;
}
