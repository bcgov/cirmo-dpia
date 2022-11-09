import { ChangeEventHandler } from 'react';

export interface ICheckbox {
  label: string;
  checked: boolean;
  value: string;
  tooltip?: boolean;
  tooltipText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
