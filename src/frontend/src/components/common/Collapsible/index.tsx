import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CollapsibleProps from './interfaces';
import { useEffect, useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Collapsible = ({
  icon,
  alignment,
  children,
  isVisible = false,

  fullHeight = false,
}: CollapsibleProps) => {
  const handleToggle = (): void => {
    setIsVisible?.(!isVisible);
    onOpenHandler?.();
  };

  const handleKeyDown = (event: any) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`collapsible ${fullHeight ? 'h-100' : ''} ${
        alignment === 'left' ? 'collapsible__left' : ''
      }`}
    >
      <div
        className={`collapsible__header ${
          isOpen && alignment === 'right' ? 'collapsible__header-right' : ''
        }`}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <FontAwesomeIcon
          icon={
            isVisible && alignment === 'left'
              ? faChevronLeft
              : isVisible && alignment === 'right'
              ? faChevronRight
              : icon
          }
          className={`
            text-muted 
            ${
              !isVisible
                ? 'collapsible__icon--closed'
                : 'collapsible__icon--open'
            }
            ${
              !isVisible && alignment === 'right'
                ? 'collapsible__icon--closed-right'
                : ''
            }
            ${
              isVisible && alignment === 'right'
                ? 'collapsible__icon--open-right'
                : 'collapsible__icon--open-left'
            }
          `}
        />
      </div>
      {isVisible && <div className="collapsible__content">{children}</div>}
    </div>
  );
};

export default Collapsible;
