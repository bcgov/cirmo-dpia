export interface IDataTable {
  headings: string[];
  pias: {
    title: string;
    updatedAt: string;
    drafter: string;
    status: string;
  }[];
}
