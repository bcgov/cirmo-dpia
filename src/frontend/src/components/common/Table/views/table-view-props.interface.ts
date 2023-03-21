import { ColumnMetaData, TabularData } from '../interfaces';

export interface TableViewProps {
  columnsMeta: Array<ColumnMetaData>;
  data: TabularData;

  readOnly: boolean;

  handleDataChange: (e: any, path: string) => void;

  allowRowAdd: boolean;
  addRowBtnLabel: string;
  addEmptyRow: () => void;

  allowRowDelete: boolean;
  removeRow: (index: number) => void;

  numberedLabelPrefix?: string;
}
