import { MouseEventHandler } from 'react';

export interface IModal {
  buttonLabel: string;
  show: boolean;
  children: any;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}
