import {
  ChangeEventHandler,
  MouseEventHandler,
  FocusEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { convertLabelToId } from '../../../utils/helper.util';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SupportedInputTypes = 'text' | 'email' | 'textArea' | string;

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
  onChange?: ChangeEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onEnter?: MouseEventHandler<HTMLElement>;
  required?: boolean;
  labelSide?: 'top' | 'left';
  isDisabled?: boolean;
  readOnly?: boolean;
  isAccessLink?: boolean;
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
  onFocus = () => {},
  onEnter = () => {},
  required = false,
  labelSide = 'top',
  isDisabled = false,
  readOnly = false,
  isAccessLink = false,
}: InputTextProps) => {
  // default to converted id from label if "id" is not provided
  const inputId = id || (label && convertLabelToId(label)) || '';

  let labelSideClasses = ' ';
  labelSideClasses += labelSide === 'top' ? 'flex-column ' : 'flex-row ';
  labelSideClasses += labelSide === 'left' ? 'align-items-center ' : ' ';

  const inputRef = useRef(null);
  const keydownListener = useCallback(
    (e: any) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        onEnter?.(e);
      }
    },
    [onEnter],
  );

  useEffect(() => {
    const inputRefCurrent = inputRef?.current as unknown as HTMLElement;

    if (!inputRefCurrent) return;

    inputRefCurrent.addEventListener('keydown', keydownListener);

    return () =>
      inputRefCurrent.removeEventListener('keydown', keydownListener);
  }, [keydownListener]);

  const checkTextArea = () => {
    if (type === 'textArea') {
      return true;
    } else {
      return false;
    }
  };

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
          <span className="pe-1">{helperText}</span>
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
        checkTextArea() ? (
          <textarea
            id={inputId}
            value={value || ''}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            className="form-control"
            required={required}
            disabled={isDisabled}
            readOnly={isAccessLink}
            ref={inputRef}
            aria-label={inputId}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            value={value || ''}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            className="form-control"
            required={required}
            disabled={isDisabled}
            readOnly={isAccessLink}
            ref={inputRef}
            aria-label={inputId}
          />
        )
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
