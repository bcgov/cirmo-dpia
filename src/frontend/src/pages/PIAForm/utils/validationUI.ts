import { ResetUIProps } from '../helpers/types';

export const resetUI = (props: ResetUIProps) => {
  const {
    setValidationMessages,
    setIsValidationFailed,
    setValidationFailedMessage,
    doc,
  } = props;

  const reset = doc.getElementsByClassName('is-invalid');
  if (reset) {
    [...reset].forEach((el) => {
      el.classList.remove('is-invalid');
    });
    setValidationMessages({});
    setIsValidationFailed(false);
    setValidationFailedMessage('');
  }
  const richText = doc.getElementsByClassName('richText');
  if (richText) {
    [...richText].forEach((el) => {
      el.classList.remove('form-control');
    });
  }
};

export const highlightInvalidField = (formId: string, doc: Document) => {
  const element = doc.getElementById(formId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.className += ' is-invalid form-control';
  }
};
