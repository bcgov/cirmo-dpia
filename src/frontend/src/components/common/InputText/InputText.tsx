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
  value?: string | null;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  labelSide?: 'top' | 'left';
  isDisabled?: boolean;
  readOnly?: boolean;
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
  placeholder = '',
  onChange = () => {},
  required = false,
  labelSide = 'top',
  isDisabled = false,
  readOnly = false,
}: InputTextProps) => {
  // default to converted id from label if "id" is not provided
  const inputId = id || (label && convertLabelToId(label)) || '';

  let labelSideClasses = ' ';
  labelSideClasses += labelSide === 'top' ? 'flex-column ' : 'flex-row ';
  labelSideClasses += labelSide === 'left' ? 'align-items-center ' : ' ';

  return (
    <div
      className={`input-text-container form-group d-flex ${labelSideClasses} ${className}`}
    >
      {label && (
        <label className={labelSide === 'left' ? 'mt-0' : ''} htmlFor={inputId}>
          {label}
          {required && <span className="error-text "> (required)</span>}
        </label>
      )}
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
      {!readOnly ? (
        <input
          id={inputId}
          type={type}
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
          className="form-control"
          required={required}
          disabled={isDisabled}
        />
      ) : value ? (
        <p>{value}</p>
      ) : (
        <p>
          <i>Not answered</i>
        </p>
      )}
    </div>
  );
};

export default InputText;
