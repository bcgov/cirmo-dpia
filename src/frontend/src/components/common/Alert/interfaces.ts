import React from 'react';

type SupportedAlertTypes = 'danger' | 'warning' | 'info' | 'success';

export interface AlertProps {
  children?: React.ReactElement;
  type: SupportedAlertTypes;
  message?: string;
  className?: string;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}
