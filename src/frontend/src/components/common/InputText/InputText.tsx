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
import { TextInputEnum } from '../../../constant/constant';
import { TextType } from '../../../types/types/text.type';

interface InputTextProps {
  id?: string;
  label?: string;
  helperText?: string;
  linkText?: string;
  linkHref?: string;
  hasIcon?: boolean;
  type?: TextType;
  className?: string;
  value?: string | null;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onEnter?: MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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
}: InputTextProps) => {
  // default to converted id from label if "id" is not provided
  const inputId = id || (label && convertLabelToId(label)) || '';

  let labelSideClasses = ' ';
  labelSideClasses += labelSide === 'top' ? 'flex-column ' : 'flex-row ';
  labelSideClasses += labelSide === 'left' ? 'align-items-center ' : ' ';

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const keydownListener = useCallback(
    (e: any) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        onEnter?.(e);
      }
    },
    [onEnter],
  );

  useEffect(() => {
    const currentInput = inputRef.current;

    if (!currentInput) return;

    currentInput.addEventListener('keydown', keydownListener);

    return () => {
      currentInput.removeEventListener('keydown', keydownListener);
    };
  }, [keydownListener]);

  const checkTextArea = () => {
    return type === TextInputEnum.INPUT_TEXT_AREA;
  };

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
    'aria-label': inputId,
  };

  const inputProps = {
    ...commonProps,
    type,
  };

  const textareaProps = {
    ...commonProps,
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
          <textarea {...textareaProps} />
        ) : (
          <input {...inputProps} />
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
