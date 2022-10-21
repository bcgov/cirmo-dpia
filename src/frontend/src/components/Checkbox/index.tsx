import { useState } from 'react';
import { ICheckbox } from './interfaces';

const Checkbox = ({ label, checked, value, onChange, ...props }: ICheckbox) => {
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
    </div>
  );
};

export default Checkbox;
