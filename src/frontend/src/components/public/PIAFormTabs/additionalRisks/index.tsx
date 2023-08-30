import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import { IAdditionalRisks, PIAAdditionalRisksProps } from './AdditionalRisks';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { Table } from '../../../common/Table';
import { ColumnMetaData } from '../../../common/Table/interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';

const PIAAdditionalRisks = ({
  showComments = true,
}: PIAAdditionalRisksProps) => {
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

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
      <h2 className="results-header pb-4">
        <b>{Messages.Headings.Title.en}</b>
      </h2>
      <p> {Messages.Headings.Description.en}</p>
      <section
        className={`drop-shadow card p-4 p-md-5 ${
          selectedSection &&
          selectedSection === PiaSections.ADDITIONAL_RISKS_RISKS
            ? 'section-focus'
            : ''
        }`}
      >
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
        {showComments && (
          <ViewComments
            count={commentCount?.[PiaSections.ADDITIONAL_RISKS_RISKS]}
            path={PiaSections.ADDITIONAL_RISKS_RISKS}
          />
        )}
      </section>
    </>
  );
};

export default PIAAdditionalRisks;
