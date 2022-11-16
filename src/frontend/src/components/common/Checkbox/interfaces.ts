import { ChangeEventHandler } from 'react';

export interface ICheckbox {
  label: string;
  checked: boolean;
  value: string | undefined;
  tooltip?: boolean;
  tooltipText?: string;
  isLink?: boolean;
  linkURL?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
