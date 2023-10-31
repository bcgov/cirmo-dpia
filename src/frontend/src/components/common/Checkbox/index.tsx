import { useEffect, useState } from 'react';
import { ICheckbox } from './interfaces';
import { Tooltip } from '../Tooltip/index';

const Checkbox = ({
  label,
  checked,
  value,
  tooltip,
  tooltipText,
  isLink,
  linkURL,
  readOnly = false,
  onChange,
  ...props
}: ICheckbox) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  useEffect(() => {
    /* If checked is reset or set externally, update the state */
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

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
          disabled={readOnly}
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
        <Tooltip
          id={value}
          content={tooltipText}
          direction="right"
          className="tooltip"
        ></Tooltip>
      )}
    </div>
  );
};

export default Checkbox;
