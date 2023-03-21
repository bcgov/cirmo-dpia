import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const CustomInputDate = (props: any) => {
  return (
    <div className="custom-input-date-wrapper">
      <ReactDatePicker
        placeholderText="yyyy/mm/dd"
        dateFormat="yyyy/MM/dd"
        {...props}
      />
      <FontAwesomeIcon className="end-icon" icon={faCalendar} />
    </div>
  );
};

export default CustomInputDate;
