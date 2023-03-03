import { IRadio } from './interfaces';

const Radio = ({
  index,
  groupName,
  value,
  changeHandler,
  isDefault,
}: IRadio) => {
  return (
    <label key={index} className="form__input-label">
      <input
        type="radio"
        name={groupName}
        value={value}
        onChange={changeHandler}
        defaultChecked={isDefault}
      />
      {`${value.charAt(0)}${value.slice(1).toLowerCase()}`}
    </label>
  );
};

export default Radio;
