import { ChangeEventHandler } from 'react';

export interface ICheckbox {
  label: string;
  checked: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
