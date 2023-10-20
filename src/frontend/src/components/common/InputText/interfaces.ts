import {
  ChangeEventHandler,
  MouseEventHandler,
  FocusEventHandler,
} from 'react';
import { TextType } from '../../../types/types/text.type';

export interface InputTextProps {
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
  maxLength?: number;
}
