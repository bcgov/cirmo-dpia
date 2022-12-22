export interface IConstantFields<T> {
  code: T;
  label: string;
}
export interface IConstant<T> {
  [key: string]: IConstantFields<T>; // TODO: Update type of "key" to be derived from keys of T
}
