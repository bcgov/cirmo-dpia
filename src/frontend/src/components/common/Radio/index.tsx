import { IRadio } from './interfaces';

const Radio = ({
  index,
  groupName,
  value,
  changeHandler,
  isDefault,
  readOnly = false,
}: IRadio) => {
  return !readOnly ? (
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
  ) : (
    <p>{`${value.charAt(0)}${value.slice(1).toLowerCase()}`}</p>
  );
};

export default Radio;
