import {
  faExclamationTriangle,
  faCircleCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AlertProps } from './interfaces';

const Alert = ({
  children,
  type,
  message,
  className,
  showInitialIcon = false,
  showCloseIcon = true,
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
      {showInitialIcon && type === 'banner-warning' && (
        <FontAwesomeIcon icon={faExclamationTriangle} />
      )}

      {showInitialIcon && type === 'success' && (
        <FontAwesomeIcon icon={faCircleCheck} />
      )}

      {showInitialIcon && type === 'danger' && (
        <FontAwesomeIcon icon={faCircleExclamation} />
      )}
      <span>{children ? renderElAlert() : message}</span>
      {showCloseIcon && (
        <span
          className="alert-close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={handleClose}
        >
          <span aria-hidden="true">&times;</span>
        </span>
      )}
    </div>
  );
};

export default Alert;
