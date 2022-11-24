import { ChangeEventHandler } from 'react';

interface IDropdownOptions {
  value: string;
  label: string;
}

export interface IDropdown {
  id?: string;
  value: string;
  label: string;
  optionalClass?: string;
  options: IDropdownOptions[];
  changeHandler?: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
}
