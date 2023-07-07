import { isNumberString } from './function';

export const modifyNestedObject = <T>(
  prevState: T,
  path: string,
  value: string,
  delimiter = '.',
): T | string => {
  // return the value if path is empty; last key
  if (!path) return value;

  console.log('prevState', prevState);
  console.log('path', path);
  console.log('value', value);

  // split paths by delimiter
  const pathSplit = path.split(delimiter);

  // (nested) key to be modified
  const key = pathSplit[0] as keyof T;

  // further nested keys
  const nestedKeys = pathSplit.splice(1);
  console.log('nestedKeys', nestedKeys);

  // fetch the nested state
  const nestedState = modifyNestedObject(
    prevState?.[key],
    nestedKeys.join(delimiter),
    value,
  );

  // if prev state is an array [and key is an index], return the updated array
  if (Array.isArray(prevState)) {
    if (!isNumberString(key?.toString())) {
      throw new Error(
        'Invalid Path: Key when used for arrays should be a numbered index',
      );
    }

    const updatedState = [...prevState];
    updatedState[Number(key)] = nestedState;

    return updatedState as unknown as T;
  }

  // if prev state is an object, return the updated object
  return {
    ...prevState,
    [key]: nestedState,
  };
};

export const setNestedReactState = <T>(
  stateSetterMethod: any,
  path: string,
  value: string,
) => {
  stateSetterMethod(
    (prevState: T) => modifyNestedObject(prevState, path, value) as T,
  );
};
