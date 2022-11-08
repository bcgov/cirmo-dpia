import { MouseEventHandler } from 'react';

export interface IModal {
  confirmLabel: string;
  cancelLabel: string;
  titleText: string;
  show: boolean;
  children: any;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
}
