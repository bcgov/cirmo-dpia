import { ChangeEventHandler } from 'react';
import { convertLabelToId } from '../../../utils/helper.util';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SupportedInputTypes = 'text' | 'email';

interface InputTextProps {
  id?: string;
  label?: string;
  helperText?: string;
  linkText?: string;
  linkHref?: string;
  hasIcon?: boolean;
  type?: SupportedInputTypes;
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const InputText = ({
  id = '',
  label = '',
  helperText = '',
  linkText = '',
  linkHref = '',
  hasIcon = false,
  type = 'text',
  className = '',
  value = '',
  onChange = () => {},
  required = false,
}: InputTextProps) => {
  // default to converted id from label if "id" is not provided
  const inputId = id || (label && convertLabelToId(label)) || '';

  return (
    <div className={'form-group ' + className}>
      <label htmlFor={inputId}>{label}</label>
      {helperText !== '' && (
        <p className="form-group__p--margin-zero">
          {helperText}
          <a href={linkHref} rel="noreferrer external" target="_blank">
            {linkText}
            {!!hasIcon && (
              <FontAwesomeIcon
                className="helper-text__link-icon"
                icon={faUpRightFromSquare}
              />
            )}
          </a>
        </p>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
        required={required}
      />
    </div>
  );
};

export default InputText;
