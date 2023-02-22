import { useState } from 'react';
import Messages from './messages';
import { useNavigate, useOutletContext } from 'react-router-dom';
import List from '../../../common/List';
import { IAdditionalRisks } from './AdditionalRisks';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';

const PIAAdditionalRisks = () => {
  const navigate = useNavigate();
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [additionalRisksForm, setAdditionalRisksForm] = useState(
    pia.additionalRisks,
  );

  const stateChangeHandler = (value: any, key: keyof IAdditionalRisks) => {
    setAdditionalRisksForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(additionalRisksForm, 'additionalRisks');
  };
  const [risks, setRisks] = useState([
    {
      risk: '',
      response: '',
    },
    {
      risk: '',
      response: '',
    },
    {
      risk: '',
      response: '',
    },
    {
      risk: '',
      response: '',
    },
  ]);
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
    console.log('test', rows);
    setRows([
      ...rows,
      [
        { label: 'one', field: 'one', value: 'Sample input', id: 'one' },
        { label: 'two', field: 'two', value: 'Sample input', id: 'two' },
      ],
    ]);

    setRisks([
      ...risks,
      {
        risk: '',
        response: '',
      },
    ]);
    stateChangeHandler(risks, 'risks');
  };

  const removeRow = (index: number) => {
    const newData = [...rows];
    newData.splice(index, 1);
    setRows(newData);
    delete risks[index];
    setRisks(risks);
    stateChangeHandler(risks, 'risks');
  };
  const handleBackClick = () => {
    // 👇️ replace set to true

    // TODO replace this with the correct  value in full pia scenario
    console.log(additionalRisksForm);
  };

  const handleOnChange = (e: any, row: number, col: number) => {
    const newData = rows.map((d, i) => {
      if (i === row) {
        d[col].value = e.target.value;
      }

      return d;
    });
    setRows(newData);
    const newRisks = newData.map((item, index) => {
      risks[index].risk = item[0].value;
      risks[index].response = item[1].value;
      return risks;
    });
    setRisks(newRisks[0]);
    stateChangeHandler(risks, 'risks');
  };
  const columnsName = ['Possible risk', 'Response'];
  return (
    <>
      <div className="container__padding-inline needs-validation">
        <h1 className="results-header pb-4">{Messages.Headings.Title.en}</h1>

        <section className="card">
          <List
            inputLabel="Risk"
            data={rows}
            columnsName={columnsName}
            handleOnChange={handleOnChange}
            addRow={addRow}
            removeRow={removeRow}
            enableRemove={false}
          />
        </section>

        <div className="horizontal-divider"></div>
        <div className="form-buttons">
          <button
            className="bcgovbtn bcgovbtn__secondary btn-back"
            onClick={() => handleBackClick()}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PIAAdditionalRisks;
