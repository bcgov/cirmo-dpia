import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

export const CustomInputDate = React.forwardRef((props: any, ref: any) => {
  const a = 'border: 1px solid red';

  return (
    <div className="custom-input-date-wrapper" onClick={props.onClick}>
      <label ref={ref}>
        {props?.value && <span>{props.value}</span>}
        {!props?.value && props?.placeholder && (
          <span className="input-placeholder"> {props.placeholder} </span>
        )}
      </label>
      <FontAwesomeIcon icon={faCalendar} />
    </div>
  );
});
