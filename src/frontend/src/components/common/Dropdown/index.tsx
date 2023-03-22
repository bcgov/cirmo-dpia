import { IDropdown } from './interfaces';
const Dropdown = ({
  id,
  value,
  label,
  optionalClass,
  options,
  placeholder,
  changeHandler,
  required,
  readOnly = false,
}: IDropdown) => {
  return (
    <div className={`form-group ${optionalClass}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="dropdown">
        {!readOnly ? (
          <select
            id={id}
            className="form-control dropdown-icon-bg"
            value={value}
            onChange={changeHandler}
            required={required}
          >
            <option key={id} value="">
              {placeholder || 'Select one'}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : value ? (
          <p>{value.split('_').join(' ')}</p>
        ) : (
          <p>
            <i>Not answered</i>
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
