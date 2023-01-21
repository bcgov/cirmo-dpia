import { ChangeEventHandler, MouseEventHandler } from 'react';
import { IDropdownOptions } from '../Dropdown/interfaces';

export interface IFilter {
  id?: string;
  value?: string;
  label?: string;
  optionalClass?: string;
  options?: IDropdownOptions[];
  changeHandler?: ChangeEventHandler<HTMLSelectElement>;
  onClearFilterClick?: MouseEventHandler<HTMLButtonElement>;
  required?: boolean;
}
