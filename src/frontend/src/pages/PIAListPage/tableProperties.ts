export interface TableHeadingPropertiesType {
  [name: string]: {
    title: string;
    sorting: boolean;
    sortValue: number;
  };
}

export const tableHeadingProperties: TableHeadingPropertiesType = {
  Title: {
    title: 'Title',
    sorting: false,
    sortValue: 0,
  },
  Last_modified: {
    title: 'Last modified',
    sorting: true,
    sortValue: 0,
  },
  Drafter: {
    title: 'Drafter',
    sorting: true,
    sortValue: 0,
  },
  PIA_status: {
    title: 'PIA status',
    sorting: false,
    sortValue: 0,
  },
};
