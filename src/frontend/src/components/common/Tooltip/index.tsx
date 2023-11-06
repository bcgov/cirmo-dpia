import { useState, useRef, useEffect, useCallback } from 'react';
import { TooltipProps } from '../Tooltip/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Tooltip component that provides additional information on hover.
 * @param {TooltipProps} props - Props for the Tooltip component.
 */
export const Tooltip = (props: TooltipProps) => {
  const { label, children, content, direction, showIcon } = props;
  const [visible, setVisible] = useState(false);
  const tooltipContainerRef = useRef(null);
  const tooltipContentRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState(direction);

  // Function to handle the mouse enter event when hovering over the tooltip container.
  const handleMouseEnter = () => {
    setVisible(true);
  };

  // Function to handle keyboard events for opening and closing the tooltip.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Check if the 'Enter' key is pressed.
    if (e.key === 'Enter') {
      // Toggle the visibility of the tooltip.
      setVisible(!visible);
    }
  };

  // Checks if there's enough space on the right for the tooltip; if not, changes the position to 'left'.
  const checkTooltipPosition = useCallback(() => {
    // Get the tooltip content element reference
    const tooltipContentElement = tooltipContentRef.current;
    // Get the bounding rectangle of the tooltip content element
    const tooltipContentRect = tooltipContentElement?.getBoundingClientRect();
    // Get the width of the screen
    const screenWidth = window.innerWidth;

    if (direction === 'right' && tooltipContentRect) {
      // Check if there is enough space available to change the tooltip position
      const canChangePosition = tooltipContentRect.right > screenWidth;

      if (canChangePosition) {
        // Change the tooltip position to 'left' if there isn't enough space on the right
        setTooltipPosition('left');
      }
    }
  }, [direction]);

  // Adding a slight delay to allow the tooltip content element to be fully rendered on the screen.
  setTimeout(() => checkTooltipPosition(), 1);

  // This `useEffect` is used to ensure that the tooltip's position is adjusted if there isn't enough space on the right side of the screen.
  // It relies on the `checkTooltipPosition` function.
  useEffect(() => {
    checkTooltipPosition();
  }, [checkTooltipPosition]);

  return (
    <div
      className={'tooltip-container'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
      onKeyDown={handleKeyDown}
      ref={tooltipContainerRef}
      tabIndex={0} // This makes the div focusable for keyboard interaction
    >
      <div className={`tooltip-content-wrapper tooltip-${tooltipPosition}`}>
        {/* Conditional rendering of the tooltip Icon */}
        {showIcon && (
          <FontAwesomeIcon
            data-tip={content}
            data-for={label}
            className="tooltipIcon"
            icon={faInfoCircle}
          />
        )}
        {children}
        {/* tooltip content */}
        {visible && (
          <div ref={tooltipContentRef} className="tooltip-content">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};
