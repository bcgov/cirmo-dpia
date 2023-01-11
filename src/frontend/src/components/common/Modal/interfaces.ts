import { MouseEventHandler } from 'react';

export interface IModal {
  confirmLabel: string;
  cancelLabel: string;
  titleText: string;
  show: boolean;
  children: any;
  reversed?: boolean;
  value?: string;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
}
