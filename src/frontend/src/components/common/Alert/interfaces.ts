import React from 'react';

type SupportedAlertTypes =
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
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
