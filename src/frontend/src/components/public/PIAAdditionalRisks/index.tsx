import { useState } from 'react';
import Messages from './messages';
import InputText from '../../common/InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import List from '../../common/List';

export interface TableColProps {
  label: string;
  field: string;
  value: string;
  id: string;
}

const PIAAdditionalRisks = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    [
      { label: 'one', field: 'one', value: 'Sample input', id: 'one' },
      { label: 'two', field: 'two', value: 'Sample input', id: 'two' },
    ],
    [
      { label: 'one', field: 'one', value: 'Sample input', id: 'one' },
      { label: 'two', field: 'two', value: 'Sample input', id: 'two' },
    ],
    [
      { label: 'one', field: 'one', value: 'Sample input', id: 'one' },
      { label: 'two', field: 'two', value: 'Sample input', id: 'two' },
    ],
    [
      { label: 'one', field: 'one', value: 'Sample input', id: 'one' },
      { label: 'two', field: 'two', value: 'Sample input', id: 'two' },
    ],
  ]);

  const addRow = () => {
    console.log(rows);
    setRows([
      ...rows,
      [
        { label: 'one', field: 'one', value: 'Sample input', id: 'one' },
        { label: 'two', field: 'two', value: 'Sample input', id: 'two' },
      ],
    ]);
  };

  const removeRow = (index: number) => {
    const newData = [...rows];
    newData.splice(index, 1);
    setRows(newData);
  };
  const handleBackClick = () => {
    // 👇️ replace set to true

    // TODO replace this with the correct  value in full pia scenario
    navigate(-1);
  };

  const handleOnChange = (e: any, row: number, col: number) => {
    const newData = rows.map((d, i) => {
      if (i === row) {
        d[col].value = e.target.value;
      }

      return d;
    });
    setRows(newData);
  };
  const columnsName = ['Possible risk', 'Response'];
  return (
    <div className="bcgovPageContainer wrapper ">
      <h1 className="results-header pb-4">{Messages.Headings.Title.en}</h1>

      <section className="card">
        <List
          data={rows}
          columnsName={columnsName}
          handleOnChange={handleOnChange}
          addRow={addRow}
          removeRow={removeRow}
        />
      </section>

      <div className="horizontal-divider"></div>
      <div className="form-buttons">
        <button
          className="bcgovbtn bcgovbtn__secondary btn-back"
          onClick={handleBackClick}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PIAAdditionalRisks;
