import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IDropdown } from './interfaces';

const Dropdown = ({ key, value, options, changeHandler }: IDropdown) => (
  <div className="dropdown">
    <select
      className="form-control"
      value={value}
      onChange={changeHandler}
      required
    >
      <option key={key} disabled={true} value="">
        Select one
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
  </div>
);

export default Dropdown;
