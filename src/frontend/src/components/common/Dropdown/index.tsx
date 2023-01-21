import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
}: IDropdown) => (
  <div className={`form-group ${optionalClass}`}>
    <label htmlFor={id}>{label}</label>
    <div className="dropdown">
      <select
        id={id}
        className="form-control"
        value={value}
        onChange={changeHandler}
        required={required}
      >
        <option key={id} value="">
          {placeholder ? placeholder : 'Select one'}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
    </div>
  </div>
);

export default Dropdown;
