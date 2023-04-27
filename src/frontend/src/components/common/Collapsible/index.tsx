import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CollapsibleProps from './interfaces';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Collapsible = ({
  icon,
  alignment,
  children,
  isVisible = false,
  setIsVisible,
  onOpenHandler,
  fullHeight = false,
  bringToFocus = 0, // a hacky way to bring focus to this collapsible bar [parent to child communication]
}: CollapsibleProps) => {
  const toggleButtonRef = useRef<HTMLDivElement>(null);

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

  // The intent of this useEffect is to bring Toggle button to focus. This can happen under two circumstances:
  // 1. when the collapsible bar is made visible
  // 2. when bringToFocus is changed :: changing this number is a hack to retrigger useEffect, bringing the collapsible bar to focus when required by the parent
  useEffect(() => {
    if (isVisible) {
      (toggleButtonRef?.current as HTMLDivElement)?.focus();
    }
  }, [bringToFocus, isVisible]);

  return (
    <div
      className={`collapsible ${fullHeight ? 'h-100' : ''} ${
        alignment === 'left' ? 'collapsible__left' : ''
      }`}
    >
      <div
        className={`collapsible__header ${
          isVisible && alignment === 'right' ? 'collapsible__header-right' : ''
        }`}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        ref={toggleButtonRef}
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
