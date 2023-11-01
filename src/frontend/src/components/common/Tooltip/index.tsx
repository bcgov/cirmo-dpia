import { useState, useRef } from 'react';
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
  const ref = useRef(null);

  return (
    <div
      className={'tooltip-container'}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={ref}
    >
      <div className={`tooltip-content-wrapper tooltip-${direction}`}>
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
        {visible && <div className="tooltip-content">{content}</div>}
      </div>
    </div>
  );
};
