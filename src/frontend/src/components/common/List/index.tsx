import React, { ChangeEvent, MouseEventHandler } from 'react';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import InputText from '../InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export interface InputTextProps {
  label?: string;
  value: string;
  id: string;
}

interface ColumnMetaData {
  name: string;
  isDisable?: boolean;
  className?: string;
  hint?: string;
}
interface ListProps {
  data: InputTextProps[][];
  columns: Array<ColumnMetaData>;
  handleOnChange: (
    event: ChangeEvent<HTMLInputElement>,
    row: number,
    col: number,
  ) => void;
  addRow: MouseEventHandler<HTMLButtonElement>;
  removeRow: (idx: number) => void;
  enableRemove?: boolean;
}

const List = ({
  data,
  columns,
  handleOnChange,
  addRow,
  removeRow,
  enableRemove = true,
}: ListProps) => {
  return (
    <>
      <div className="data-table__container">
        <table id="tab_logic" className="table data-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={column.className}>
                  {column.name}
                  {column.hint && (
                    <div className={'no-bold'}>{column.hint}</div>
                  )}
                </th>
              ))}
              <th />
            </tr>
          </thead>

          <tbody>
            {data.map((items, idx) => (
              <tr key={idx}>
                {items.map((item, index) => (
                  <td key={index} className={columns[index].className}>
                    <InputText
                      type="text"
                      value={item.value}
                      id={item.id}
                      onChange={(e) => handleOnChange(e, idx, index)}
                      labelSide="left"
                      label={item.label}
                      isDisabled={columns[index].isDisable}
                    />
                  </td>
                ))}

                {enableRemove ? (
                  <td>
                    <button
                      className=" form-control btn btn-outline-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        removeRow(idx);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-4 pb-4 view-pid">
        <button
          onClick={(e) => {
            e.preventDefault();
            addRow(e);
          }}
          className="bcgovbtn bcgovbtn__tertiary bold"
        >
          Add more rows
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
};

export default List;
