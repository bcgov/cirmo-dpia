import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ICheckbox } from './interfaces';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from 'react-tooltip';

const Checkbox = ({
  label,
  checked,
  value,
  tooltip,
  tooltipText,
  isLink,
  linkURL,
  onChange,
  ...props
}: ICheckbox) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div className="checkbox-wrapper">
      <label className="input-label">
        <input
          type="checkbox"
          value={value}
          checked={isChecked}
          onChange={onChange}
          onClick={() => setIsChecked((prev: boolean) => !prev)}
          className={isChecked ? 'checked' : ''}
          aria-describedby={value}
          aria-label={label}
          {...props}
        />
        {isLink === false ? (
          label
        ) : (
          <a href={linkURL} target="_blank" rel="noreferrer">
            {label}
          </a>
        )}
      </label>
      {!tooltip ? null : (
        <>
          <FontAwesomeIcon
            data-tip={tooltipText}
            data-for={value}
            className="cb-info-icon"
            icon={faInfoCircle}
          />
          <Tooltip
            className="tooltip"
            id={value}
            place="right"
            effect="solid"
            arrowColor="#1A5A96"
            getContent={() => {
              return <div>{tooltipText}</div>;
            }}
          />
        </>
      )}
    </div>
  );
};

export default Checkbox;
