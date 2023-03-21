import { useEffect, useState } from 'react';
import { deepEqual } from '../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../utils/object-modification.util';
import { ColumnMetaData, RowData, TabularData } from './interfaces';
import { TableViewProps } from './views/table-view-props.interface';
import { UseTableRowView } from './views/useTableRowView';
import { UseTableStandardView } from './views/useTableStandardView';

export interface TableProps {
  columnsMeta: Array<ColumnMetaData>;
  data?: TabularData;
  allowRowAdd?: boolean;
  addRowBtnLabel?: string;
  allowRowDelete?: boolean;
  readOnly?: boolean;
  numberedLabelPrefix?: string;
  onChangeHandler?: (updatedData: TabularData) => void;
  format?: 'standard' | 'row';
}

export const Table = ({
  columnsMeta = [],
  data: initialData = [],
  allowRowAdd = true,
  addRowBtnLabel = 'Add more rows',
  allowRowDelete = true,
  readOnly = false,
  numberedLabelPrefix,
  onChangeHandler,
  format = 'standard',
}: TableProps) => {
  const [data, setData] = useState<TabularData>(initialData);

  const addEmptyRow = () => {
    if (!allowRowAdd) {
      console.error('User not permitted to add new rows');
      return;
    }

    const emptyRow = columnsMeta.reduce((acc, column) => {
      return { ...acc, [column.key]: column.defaultValue || '' };
    }, {} as RowData);

    setData((prevData) => [...prevData, emptyRow]);
  };

  const removeRow = (index: number) => {
    if (!allowRowDelete) {
      console.error('User not permitted to delete rows');
      return;
    }

    setData((prevData) => prevData.filter((row, i) => i !== index));
  };

  // share updated data whenever there is a change
  useEffect(() => {
    if (onChangeHandler && !deepEqual(initialData, data)) {
      onChangeHandler(data);
    }
  }, [data, initialData, onChangeHandler]);

  const handleDataChange = (e: any, path: string) => {
    setNestedReactState(setData, path, e.target.value);
  };

  const viewProps: TableViewProps = {
    columnsMeta,
    data,
    readOnly,
    numberedLabelPrefix,
    handleDataChange,
    allowRowAdd,
    addEmptyRow,
    addRowBtnLabel,
    allowRowDelete,
    removeRow,
  };

  return (
    <div className="data-table__container">
      {format === 'row' && UseTableRowView(viewProps)}
      {format === 'standard' && UseTableStandardView(viewProps)}
    </div>
  );
};
