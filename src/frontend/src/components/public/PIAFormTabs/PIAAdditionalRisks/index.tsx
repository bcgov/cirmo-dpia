import { useState } from 'react';
import Messages from './messages';
import { useOutletContext } from 'react-router-dom';
import List, { InputTextProps } from '../../../common/List';
import { IAdditionalRisks, IAdditionRisk } from './AdditionalRisks';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';

const PIAAdditionalRisks = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [additionalRisksForm, setAdditionalRisksForm] =
    useState<IAdditionalRisks>(pia.additionalRisks || { risks: [] });

  const stateChangeHandler = (value: any, key: keyof IAdditionalRisks) => {
    setAdditionalRisksForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(additionalRisksForm, 'additionalRisks');
  };

  const [risks, setRisks] = useState<Array<IAdditionRisk>>(
    additionalRisksForm?.risks.length > 0
      ? additionalRisksForm?.risks
      : [
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
        ],
  );

  const [rows, setRows] = useState<Array<InputTextProps[]>>(
    risks.map((risk, i) => [
      { label: `Risk ${i + 1}`, value: risk.risk, id: 'one' },
      { value: risk.response, id: 'two' },
    ]),
  );

  const addRow = () => {
    setRows([
      ...rows,
      [
        { label: `Risk ${rows.length + 1}`, value: '', id: 'one' },
        { value: '', id: 'two' },
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
    risks.splice(index, 1);
    setRisks(risks);
    stateChangeHandler(risks, 'risks');
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
      <h1 className="results-header pb-4">{Messages.Headings.Title.en}</h1>

      <section className="card p-3">
        <List
          data={rows}
          columnsName={columnsName}
          handleOnChange={handleOnChange}
          addRow={addRow}
          removeRow={removeRow}
          enableRemove={true}
          sourceTab="additionalRisks"
        />
      </section>
    </>
  );
};

export default PIAAdditionalRisks;
