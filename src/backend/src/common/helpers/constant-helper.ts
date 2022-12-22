import { IConstant, IConstantFields } from '../interfaces/constants.inteface';

// returns array of fields from the constant
// example: extract all codes from PIAIntakeStatus
const extractField = <T>(
  obj: IConstant<T>,
  field: keyof IConstantFields<T> = 'code',
) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc.push(obj[key]?.[field]);
    return acc;
  }, []);
};

export const getCodes = <T>(obj: IConstant<T>) => {
  return extractField<T>(obj, 'code');
};

export const getLabels = <T>(obj: IConstant<T>) => {
  return extractField<T>(obj, 'label');
};

// returns output field value for the first matching input field value
// example: extract code value for a label
const extractFirstMatch = <T>(
  obj: IConstant<T>,
  inputField: keyof IConstantFields<T>,
  inputValue: string,
  outputField: keyof IConstantFields<T>,
) => {
  const matchingKey = Object.keys(obj).find(
    (key) => obj[key]?.[inputField] === inputValue,
  );

  return obj[matchingKey]?.[outputField];
};

export const getCodeForLabel = <T>(obj: IConstant<T>, labelValue: string) => {
  return extractFirstMatch<T>(obj, 'label', labelValue, 'code') as T;
};

export const getLabelForCode = <T>(obj: IConstant<T>, codeValue: string) => {
  return extractFirstMatch<T>(obj, 'code', codeValue, 'label');
};
