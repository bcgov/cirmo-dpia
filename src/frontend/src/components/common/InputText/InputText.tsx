import { useCallback, useEffect, useRef } from 'react';
import { convertLabelToId } from '../../../utils/helper.util';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextInputEnum } from '../../../constant/constant';
import { InputTextProps } from './interfaces';

const InputText = ({
  id = '',
  label = '',
  helperText = '',
  linkText = '',
  linkHref = '',
  hasIcon = false,
  type = TextInputEnum.INPUT_TEXT,
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
  maxLength,
  autoFocus = false,
}: InputTextProps) => {
  // Generating an input ID from the label, or using a provided ID
  const inputId = id || (label && convertLabelToId(label)) || '';

  // Constructing CSS classes based on the label position
  let labelSideClasses = ' ';
  labelSideClasses += labelSide === 'top' ? 'flex-column ' : 'flex-row ';
  labelSideClasses += labelSide === 'left' ? 'align-items-center ' : ' ';

  // Refs for input and textarea elements
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Callback for handling 'Enter' key events
  const keydownListener = useCallback(
    (e: any) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        onEnter?.(e);
      }
    },
    [onEnter],
  );

  // Effect for attaching the 'Enter' keydown event listener
  useEffect(() => {
    const currentInput = inputRef.current || textareaRef.current;

    if (!currentInput) return;

    currentInput.addEventListener('keydown', keydownListener);

    return () => {
      currentInput.removeEventListener('keydown', keydownListener);
    };
  }, [keydownListener]);

  // Effect for auto-focusing the input or textarea when the component mounts
  useEffect(() => {
    if (autoFocus) {
      if (type === TextInputEnum.INPUT_TEXT_AREA && textareaRef.current) {
        textareaRef.current.focus();
      } else if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [autoFocus, type]);

  // Function to check if the current type is a textarea
  const checkTextArea = () => {
    return type === TextInputEnum.INPUT_TEXT_AREA;
  };

  // Common properties for input and textarea elements
  const commonProps = {
    id: inputId,
    value: value || '',
    placeholder,
    onChange,
    onFocus,
    className: 'form-control',
    required,
    disabled: isDisabled,
    readOnly: isAccessLink,
    'aria-label': required && label ? `${label} (required)` : label ?? inputId,
    maxLength,
  };

  // Properties specific to input elements
  const inputProps = {
    ...commonProps,
    type,
  };

  // Properties specific to textarea elements
  const textareaProps = {
    ...commonProps,
  };

  return (
    <div
      className={`input-text-container form-group d-flex ${labelSideClasses} ${className}`}
    >
      {/* Label rendering with conditional requirement indicator */}
      {label && (
        <label className={labelSide === 'left' ? 'mt-0' : ''} htmlFor={inputId}>
          {label}
          {required && <span className="error-text "> (required)</span>}
        </label>
      )}
      {/* Helper text and optional link rendering */}
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
      {/* Conditional rendering for editable and read-only states */}
      {!readOnly ? (
        checkTextArea() ? (
          <textarea ref={textareaRef} {...textareaProps} />
        ) : (
          <input ref={inputRef} {...inputProps} />
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
