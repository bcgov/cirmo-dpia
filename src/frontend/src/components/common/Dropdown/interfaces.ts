import { ChangeEventHandler } from 'react';

export interface IDropdownOptions {
  value: string;
  label: string;
}

export interface IDropdown {
  id?: string;
  value: string;
  label: string;
  placeholder?: string;
  optionalClass?: string;
  options: IDropdownOptions[];
  changeHandler?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
}
