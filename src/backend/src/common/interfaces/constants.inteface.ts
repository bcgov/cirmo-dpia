export interface IConstant<T = any> {
  // TODO: remove any from above lines: Added because GovMinistries.code does not adhere with GovMinistriesEnum:
  // ACTION: Refactor GovMinistriesEnum and values stored in the database
  [key: string]: {
    // TODO: Update type of "key" to be derived from keys of T
    code?: T;
    label: string;
  };
}
