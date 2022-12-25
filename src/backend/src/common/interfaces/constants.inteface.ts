export interface IConstant {
  // TODO: Refactor to include Generics
  // ACTION: Update GovMinistriesEnum and values stored in the database to match with GovMinistriesEnum.code
  [key: string]: {
    code?: string;
    label: string;
  };
}
