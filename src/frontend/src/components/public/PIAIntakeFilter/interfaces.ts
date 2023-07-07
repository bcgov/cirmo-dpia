import { URLSearchParams } from 'url';

export interface IPIAIntakeFilterProps {
  filterChangeHandler: (params: URLSearchParams) => void;
}
