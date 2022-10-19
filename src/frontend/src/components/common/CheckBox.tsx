
import { useState } from "react";
const Checkbox = ({ label, checked, ...props }) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <div className="checkbox-wrapper">
       
          <input
            type="checkbox"
            checked={isChecked}
            onClick={() => setIsChecked((prev) => !prev)}
            className={isChecked ? "checked" : ""}
            {...props}
          />
       <label>
       <span>{label}</span> 
        </label>
       
      </div>
    );
  };
  
  export default Checkbox;