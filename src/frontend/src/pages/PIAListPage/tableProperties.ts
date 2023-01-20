export interface TableHeadingPropertiesType {
  [name: string]: {
    title: string;
    sorting: boolean;
    sortValue: number;
  };
}

export const tableHeadingProperties: TableHeadingPropertiesType = {
  title: {
    title: 'Title',
    sorting: false,
    sortValue: 0,
  },
  updatedAt: {
    title: 'Last modified',
    sorting: true,
    sortValue: 0,
  },
  drafterName: {
    title: 'Drafter',
    sorting: true,
    sortValue: 0,
  },
  status: {
    title: 'PIA status',
    sorting: false,
    sortValue: 0,
  },
};
