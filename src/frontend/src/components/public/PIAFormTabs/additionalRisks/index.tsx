import { useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import { useOutletContext } from 'react-router-dom';
import List, { InputTextProps } from '../../../common/List';
import { IAdditionalRisks, IAdditionRisk } from './AdditionalRisks';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { deepEqual } from '../../../../utils/object-comparison.util';

const PIAAdditionalRisks = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const defaultState: IAdditionalRisks = useMemo(
    () => ({
      risks: [
        {
          risk: '',
          response: ',',
        },
        {
          risk: '',
          response: ',',
        },
        {
          risk: '',
          response: ',',
        },
        {
          risk: '',
          response: ',',
        },
      ],
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.additionalRisks || defaultState,
    [defaultState, pia.additionalRisks],
  );

  const [additionalRisksForm, setAdditionalRisksForm] =
    useState<IAdditionalRisks>(initialFormState);

  const stateChangeHandler = (value: any, key: keyof IAdditionalRisks) => {
    setAdditionalRisksForm((state) => ({
      ...state,
      [key]: value,
    }));
  };

  // passing updated data to parent for auto-save for work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, additionalRisksForm)) {
      piaStateChangeHandler(additionalRisksForm, 'additionalRisks');
    }
  }, [piaStateChangeHandler, additionalRisksForm, initialFormState]);

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
    // fix the label out of order after remove a row for list
    // TODO refactor and move remove row to list comp itself
    newData.forEach((element, idx) => {
      element.forEach((e) => {
        e.label = e.label ? `Risk ${idx + 1} ` : '';
      });
    });
    setRows(newData);
    risks.splice(index, 1);
    setRisks(risks);
    stateChangeHandler(risks, 'risks');
  };

  const handleOnChange = (e: any, row: number, col: number) => {
    const newRowData = rows.map((d, i) => {
      if (i === row) {
        d[col].value = e.target.value;
      }

      return d;
    });
    setRows(newRowData);
    console.log('new row data', newRowData);
    const updatedRisks = newRowData.map((item, index) => {
      risks[index].risk = item[0].value;
      risks[index].response = item[1].value;
      return risks;
    });
    console.log('new risk data', updatedRisks);
    setRisks(updatedRisks[0]);
    stateChangeHandler(updatedRisks[0], 'risks');
  };

  const columns = [{ name: 'Possible risk' }, { name: 'Response' }];

  return (
    <>
      <h1 className="results-header pb-4">{Messages.Headings.Title.en}</h1>

      <section className="card p-3">
        <List
          data={rows}
          columns={columns}
          handleOnChange={handleOnChange}
          addRow={addRow}
          removeRow={removeRow}
          enableRemove={true}
        />
      </section>
    </>
  );
};

export default PIAAdditionalRisks;
