import { MouseEventHandler } from 'react';

export interface IModal {
  confirmLabel: string;
  cancelLabel: string;
  titleText: string;
  show: boolean;
  children: any;
  reversed?: boolean;
  value?: string;
  accessLink?: string;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleCancel: any;
}
