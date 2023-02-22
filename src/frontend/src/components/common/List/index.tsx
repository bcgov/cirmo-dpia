import React, { ChangeEvent, MouseEventHandler } from 'react';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import InputText from '../InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface InputTextProps {
  label: string;
  field: string;
  value: string;
  id: string;
}

interface ListProps {
  inputLabel?: string;
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
  inputLabel = '',
  data,
  columnsName,
  handleOnChange,
  addRow,
  removeRow,
  enableRemove = true,
}: ListProps) => {
  return (
    <div>
      <div className="container">
        <div>
          <div className="data-table__container ">
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
                        <div className=" row">
                          <div className="mt-3 col-sm-2">
                            {index === 0 ? (
                              <label className="mt-3 ">
                                {inputLabel + ' ' + (idx + 1)}
                              </label>
                            ) : null}
                          </div>
                          <div className=" px-2 col-sm-10">
                            <InputText
                              type="text"
                              value={item.value}
                              id={item.id}
                              onChange={(e) => handleOnChange(e, idx, index)}
                            />
                          </div>
                        </div>
                      </td>
                    ))}

                    {enableRemove ? (
                      <td>
                        <button
                          className=" btn btn-outline-danger mt-2 "
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
        </div>
      </div>
      <div className="pt-4 pb-4 view-pid">
        <button onClick={addRow} className="bcgovbtn bcgovbtn__tertiary  ">
          Add more rows
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default List;
