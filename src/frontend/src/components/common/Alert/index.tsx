import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      {type === 'banner-warning' && (
        <FontAwesomeIcon icon={faExclamationTriangle} />
      )}

      {children ? renderElAlert() : message}
      <span
        className="alert-close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      >
        {type === 'banner-warning' ? null : (
          <span aria-hidden="true">&times;</span>
        )}
      </span>
    </div>
  );
};

export default Alert;
