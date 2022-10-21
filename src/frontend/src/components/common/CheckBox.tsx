import { useState } from 'react';

const Checkbox = ({
  label,
  checked,
  value,
  onChange,
  ...props
}: {
  label: string;
  checked: boolean;
  value: string;
  onChange: any;
}) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={onChange}
        onClick={() => setIsChecked((prev: any) => !prev)}
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
