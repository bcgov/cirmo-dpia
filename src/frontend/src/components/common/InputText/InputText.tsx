import { ChangeEventHandler } from 'react';
import { convertLabelToId } from '../../../utils/helper.util';

type SupportedInputTypes = 'text' | 'email';

interface InputTextProps {
  id?: string;
  label?: string;
  type?: SupportedInputTypes;
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const InputText = ({
  id = '',
  label = '',
  type = 'text',
  className = '',
  value = '',
  onChange = () => {},
}: InputTextProps) => {
  // default to converted id from label if "id" is not provided
  const inputId = id || (label && convertLabelToId(label)) || '';

  return (
    <div className={'form-group ' + className}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

export default InputText;
