import React, { ChangeEvent, MouseEventHandler } from 'react';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import InputText from '../InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export interface InputTextProps {
  label?: string;
  value: string;
  id: string;
}

interface ListProps {
  data: InputTextProps[][];
  columnsName: string[];
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
  columnsName,
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
              {columnsName.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th />
            </tr>
          </thead>

          <tbody>
            {data.map((items, idx) => (
              <tr key={idx}>
                {items.map((item, index) => (
                  <td key={index}>
                    <InputText
                      type="text"
                      value={item.value}
                      id={item.id}
                      onChange={(e) => handleOnChange(e, idx, index)}
                      labelSide="left"
                      label={item.label}
                    />
                  </td>
                ))}

                {enableRemove ? (
                  <td>
                    <button
                      className=" btn btn-outline-danger"
                      onClick={() => removeRow(idx)}
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
        <button onClick={addRow} className="bcgovbtn bcgovbtn__tertiary bold">
          Add more rows
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
};

export default List;
