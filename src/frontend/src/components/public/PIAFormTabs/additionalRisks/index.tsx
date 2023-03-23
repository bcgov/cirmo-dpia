import { useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import { useOutletContext } from 'react-router-dom';
import { IAdditionalRisks } from './AdditionalRisks';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { Table } from '../../../common/Table';
import { ColumnMetaData } from '../../../common/Table/interfaces';

const PIAAdditionalRisks = () => {
  const [pia, piaStateChangeHandler, isReadOnly, accessControl] =
    useOutletContext<
      [IPiaForm, PiaStateChangeHandlerType, boolean, () => void]
    >();

  if (accessControl) accessControl();

  const defaultState: IAdditionalRisks = useMemo(
    () => ({
      risks: [{ risk: '', response: '' }],
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.additionalRisks || defaultState,
    [defaultState, pia.additionalRisks],
  );

  const [additionalRisksForm, setAdditionalRisksForm] =
    useState<IAdditionalRisks>(initialFormState);

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, additionalRisksForm)) {
      piaStateChangeHandler(additionalRisksForm, 'additionalRisks');
    }
  }, [piaStateChangeHandler, additionalRisksForm, initialFormState]);

  const stateChangeHandler = (value: any, key: keyof IAdditionalRisks) => {
    setNestedReactState(setAdditionalRisksForm, key, value);
  };

  const columns: Array<ColumnMetaData> = [
    { key: 'risk', label: 'Possible risk' },
    { key: 'response', label: 'Response' },
  ];

  return (
    <>
      <h1 className="results-header pb-4">{Messages.Headings.Title.en}</h1>

      <section className="drop-shadow card p-4 p-md-5">
        <Table
          data={additionalRisksForm.risks}
          columnsMeta={columns}
          onChangeHandler={(updatedData) => {
            stateChangeHandler(updatedData, 'risks');
          }}
          numberedLabelPrefix="Risk"
          addRowBtnLabel="Add more risks"
          format="row"
          readOnly={isReadOnly}
        />
      </section>
    </>
  );
};

export default PIAAdditionalRisks;
