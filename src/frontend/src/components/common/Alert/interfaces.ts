import React from 'react';

export type SupportedAlertTypes =
  | 'danger'
  | 'warning'
  | 'banner-warning'
  | 'info'
  | 'success';

export interface AlertProps {
  children?: React.ReactElement;
  type: SupportedAlertTypes;
  message?: string;
  className?: string;
  showInitialIcon?: boolean;
  showCloseIcon?: boolean;

  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
