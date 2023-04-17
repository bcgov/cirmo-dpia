import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CollapsibleProps from './interfaces';
import { useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Collapsible = ({ icon, alignment, children }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: any) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`collapsible ${
        alignment === 'left'
          ? 'collapsible__border-right'
          : 'collapsible__border-left'
      }`}
    >
      <div
        className="collapsible__header"
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
          className={
            !isOpen ? 'collapsible__icon--closed' : 'collapsible__icon--open'
          }
        />
      </div>
      {isOpen && <div className="collapsible__content">{children}</div>}
    </div>
  );
};

export default Collapsible;
