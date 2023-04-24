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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);
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
            isOpen && alignment === 'left'
              ? faChevronLeft
              : isOpen && alignment === 'right'
              ? faChevronRight
              : icon
          }
          className={`
            text-muted 
            ${!isOpen ? 'collapsible__icon--closed' : 'collapsible__icon--open'}
            ${
              !isOpen && alignment === 'right'
                ? 'collapsible__icon--closed-right'
                : ''
            }
            ${
              isOpen && alignment === 'right'
                ? 'collapsible__icon--open-right'
                : 'collapsible__icon--open-left'
            }
          `}
        />
      </div>
      {isOpen && <div className="collapsible__content">{children}</div>}
    </div>
  );
};

export default Collapsible;
