import { ChangeEventHandler } from 'react';

interface IDropdownOptions {
  value: string;
  label: string;
}

export interface IDropdown {
  key: string;
  value: string;
  options: IDropdownOptions[];
  changeHandler: ChangeEventHandler<HTMLSelectElement>;
}
