import React from 'react';
import { AlertProps } from './interfaces';

const Alert = ({
  children,
  type,
  message,
  className,
  onClose,
}: AlertProps): React.ReactElement => {
  const renderElAlert = function () {
    if (!children) return;
    return React.cloneElement(children);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onClose) return;
    onClose(e);
  };

  return (
    <div
      className={
        'alert-wrapper' + ` alert-${type}` + (className ? ` ${className}` : '')
      }
    >
      {children ? renderElAlert() : message}
      <span
        className="alert-close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      >
        <span aria-hidden="true">&times;</span>
      </span>
    </div>
  );
};

export default Alert;
