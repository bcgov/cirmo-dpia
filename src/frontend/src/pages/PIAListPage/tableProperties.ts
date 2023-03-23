export interface TableHeadingPropertiesType {
  [name: string]: {
    title: string;
    sorting: boolean;
    sortValue: number;
    hideOnSmView?: boolean;
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
    hideOnSmView: true,
  },
  status: {
    title: 'PIA status',
    sorting: false,
    sortValue: 0,
  },
};
