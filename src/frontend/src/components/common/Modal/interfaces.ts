import { MouseEventHandler } from 'react';

export interface IModal {
  confirmLabel: string;
  cancelLabel: string;
  titleText: string;
  show: boolean;
  children: any;
  reversed?: boolean;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
}
