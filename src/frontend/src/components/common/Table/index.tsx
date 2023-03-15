import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { deepEqual } from '../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../utils/object-modification.util';
import InputText from '../InputText/InputText';

export interface ColumnMetaData {
  key: string;
  displayName: string;
  defaultValue?: string;
  numberedLabelPrefix?: string;
  isDisable?: boolean;
  className?: string;
  hint?: string;
}

// default tabular data format - [{key1: value1, key2: value2}]
type RowData = Record<string, string>;

export type TabularData = Array<RowData>;

interface TableProps {
  columnsMeta: Array<ColumnMetaData>;
  data?: TabularData;
  allowRowAdd?: boolean;
  allowRowDelete?: boolean;
  readOnly?: boolean;
  onChangeHandler?: (updatedData: TabularData) => void;
}

export const Table = ({
  columnsMeta = [],
  data: initialData = [],
  allowRowAdd = true,
  allowRowDelete = true,
  readOnly = false,
  onChangeHandler,
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

  return (
    <>
      <div className="data-table__container">
        <table className="table data-table">
          {columnsMeta.length > 0 && (
            <>
              <thead>
                <tr>
                  {columnsMeta.map((column) => (
                    <th
                      scope="col"
                      key={column.key}
                      className={column?.className || ''}
                    >
                      {column.displayName}
                      {column.hint && (
                        <div className={'no-bold'}>{column.hint}</div>
                      )}
                    </th>
                  ))}
                  <th />
                </tr>
              </thead>

              <tbody>
                {data?.map((rowData, index) => (
                  <tr key={index}>
                    {columnsMeta.map((column) => (
                      <td
                        key={column.key + '-' + index}
                        className={column.className || ''}
                      >
                        {!readOnly ? (
                          <InputText
                            type="text"
                            value={rowData?.[column.key]}
                            labelSide="left"
                            label={
                              column.numberedLabelPrefix &&
                              `${column.numberedLabelPrefix} ${index + 1}`
                            }
                            isDisabled={column.isDisable}
                            onChange={(e) =>
                              handleDataChange(e, `${index}.${column.key}`)
                            }
                          />
                        ) : (
                          <p>
                            {column.numberedLabelPrefix && (
                              <label>
                                {column.numberedLabelPrefix} {index + 1}
                              </label>
                            )}
                            {rowData?.[column.key]}
                          </p>
                        )}
                      </td>
                    ))}

                    {allowRowDelete && !readOnly && (
                      <td key={'action' + '-' + index}>
                        <button
                          className=" form-control btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            removeRow(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>

      <div className="pt-4 pb-4 view-pid">
        {!readOnly && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addEmptyRow();
            }}
            className="bcgovbtn bcgovbtn__tertiary bold"
          >
            Add more rows
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div>
    </>
  );
};
