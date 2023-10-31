import { useState, useRef } from 'react';
import { TooltipProps } from '../Tooltip/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
export const Tooltip = (props: TooltipProps) => {
  const { children, content, direction, id } = props;
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
        <FontAwesomeIcon
          data-tip={content}
          data-for={id}
          className="tooltipIcon"
          icon={faInfoCircle}
        />
        {children}
        {visible && <div className="tooltip-content">{content}</div>}
      </div>
    </div>
  );
};
