import { ValidateFormProps, ValidationRule } from '../helpers/types';

export const validateForm = (props: ValidateFormProps) => {
  const { pia, setValidationMessages } = props;
  let isValid = true;
  let formId = '';

  const validations: ValidationRule[] = [
    {
      key: 'title',
      validationKey: 'piaTitle',
      msg: 'Error: Please enter a title.',
    },
    {
      key: 'ministry',
      validationKey: 'piaMinistry',
      msg: 'Error: Please select a ministry.',
    },
    {
      key: 'branch',
      validationKey: 'piaBranch',
      msg: 'Error: Please enter a branch.',
    },
    {
      key: 'initiativeDescription',
      validationKey: 'piaInitialDescription',
      msg: 'Error: Please describe your initiative.',
    },
  ];

  for (const { key, validationKey, msg } of validations) {
    if (!pia?.[key]) {
      isValid = false;
      formId = key;
      setValidationMessages((prevState) => ({
        ...prevState,
        [validationKey]: msg,
      }));
      break;
    }
  }

  return { isValid, formId };
};
