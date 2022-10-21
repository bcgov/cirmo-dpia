import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ICheckbox } from './interfaces';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from 'react-tooltip';

const Checkbox = (
  { 
    label, 
    checked, 
    value, 
    tooltip,
    tooltipText,
    onChange, 
    ...props 
  }: ICheckbox) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={onChange}
        onClick={() => setIsChecked((prev: boolean) => !prev)}
        className={isChecked ? 'checked' : ''}
        {...props}
      />
      <label>
        <span>{label}</span>
      </label>
      {!tooltip ? null : (
        <>
          <FontAwesomeIcon data-tip={tooltipText} data-for={value} className='cbInfoIcon' icon={faInfoCircle} />
          <Tooltip className='tooltip' id={value} place='right' effect='solid' multiline />
        </>
      )}
    </div>
  );
};

export default Checkbox;
