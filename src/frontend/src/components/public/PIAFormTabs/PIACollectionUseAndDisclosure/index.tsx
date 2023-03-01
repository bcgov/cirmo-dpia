import { useState } from 'react';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import InputText from '../../../common/InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { isMPORole } from '../../../../utils/helper.util';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';

import {
  CollectionNoticeInput,
  ICollectionUseAndDisclosure,
  StepInput,
} from './CollectionUseAndDisclosure';
import List, { InputTextProps } from '../../../common/List';

const PIACollectionUseAndDisclosure = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [collectionUseAndDisclosureForm, setCollectionUseAndDisclosureForm] =
    useState<ICollectionUseAndDisclosure>(
      pia.collectionUseAndDisclosure || {
        steps: [],
        collectionNotice: {},
      },
    );

  const stateChangeHandler = (
    value: any,
    key: keyof ICollectionUseAndDisclosure,
  ) => {
    setCollectionUseAndDisclosureForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(
      collectionUseAndDisclosureForm,
      'collectionUseAndDisclosure',
    );
  };
  const [disclosure, setDisclosure] = useState('');
  const [steps, setSteps] = useState<Array<StepInput>>(
    collectionUseAndDisclosureForm?.steps.length > 0
      ? collectionUseAndDisclosureForm?.steps
      : [
          {
            drafterInput: '',
            mpoInput: '',
            foippaInput: '',
            OtherInput: '',
          },
          {
            drafterInput: '',
            mpoInput: '',
            foippaInput: '',
            OtherInput: '',
          },
          {
            drafterInput: '',
            mpoInput: '',
            foippaInput: '',
            OtherInput: '',
          },
          {
            drafterInput: '',
            mpoInput: '',
            foippaInput: '',
            OtherInput: '',
          },
        ],
  );
  const [MPOCommentsDisclosure, setMPOCommentsDisclosure] = useState('');
  const [collectionNotice, setCollectionNotice] =
    useState<CollectionNoticeInput>({
      drafterInput: '',
      mpoInput: '',
    });
  const [rows, setRows] = useState<Array<InputTextProps[]>>(
    steps.map((step, i) => [
      { label: `Step ${i + 1}`, value: step.drafterInput, id: 'one' },
      { value: step.mpoInput, id: 'two' },
      { value: step.foippaInput, id: 'three' },
      { value: step.OtherInput, id: 'four' },
    ]),
  );

  const addRow = () => {
    setRows([
      ...rows,
      [
        { label: `Step ${rows.length + 1} `, value: '', id: 'one' },
        { value: '', id: 'two' },
        { value: '', id: 'three' },
        { value: '', id: 'four' },
      ],
    ]);
    setSteps([
      ...steps,
      {
        drafterInput: '',
        mpoInput: '',
        foippaInput: '',
        OtherInput: '',
      },
    ]);
  };
  const isMPO = () => {
    return isMPORole();
  };
  const removeRow = (index: number) => {
    const newData = [...rows];
    newData.splice(index, 1);
    setRows(newData);
    steps.splice(index, 1);
    setSteps(steps);
    stateChangeHandler(steps, 'steps');
  };

  const handleOnChange = (e: any, row: number, col: number) => {
    const newData = rows.map((d, i) => {
      if (i === row) {
        d[col].value = e.target.value;
      }

      return d;
    });
    setRows(newData);
    const newSteps = newData.map((item, index) => {
      steps[index].drafterInput = item[0].value;
      steps[index].mpoInput = item[1].value;
      steps[index].foippaInput = item[2].value;
      steps[index].OtherInput = item[3].value;
      return steps;
    });
    setSteps(newSteps[0]);
    stateChangeHandler(steps, 'steps');
  };

  const columnsName = [
    Messages.WorkThroughDetails.ColumnDrafterInput.en,
    Messages.WorkThroughDetails.ColumnMpoInput.en,
    Messages.WorkThroughDetails.ColumnFoippaInput.en,
    Messages.WorkThroughDetails.ColumnOtherInput.en,
  ];
  return (
    <>
      <h2 className="results-header">
        <b>{Messages.Headings.Title.en}</b>
      </h2>
      <span>{Messages.Headings.Subtitle.en}</span>
      <h3 className="pt-4 pb-2">{Messages.WorkThroughDetails.Title.en}</h3>
      <section className="card p-3">
        <List
          data={rows}
          columnsName={columnsName}
          handleOnChange={handleOnChange}
          addRow={addRow}
          removeRow={removeRow}
          enableRemove={true}
          sourceTab="disclosure"
        />
      </section>

      <h3 className="pt-5 pb-2">{Messages.CollectionNotice.Title.en}</h3>

      <section className=" card pt-5 px-5">
        <div className="form-group">
          <label htmlFor="collectionNoticeDrafter">
            {Messages.CollectionNotice.DrafterInput.Title.PartOne.en}
            <a
              href={Messages.CollectionNotice.DrafterInput.Link.en}
              rel="noreferrer external"
              target="_blank"
            >
              {Messages.CollectionNotice.DrafterInput.Title.PartTwo.en}
            </a>
            {Messages.CollectionNotice.DrafterInput.Title.PartThree.en}
          </label>

          <div className="section__question-hint">
            {Messages.CollectionNotice.DrafterInput.Description.en}
          </div>
          <div className="richText" id="drafterDisclosure">
            <MDEditor
              id="collectionNoticeDrafter"
              preview="edit"
              value={disclosure}
              defaultTabEnable={true}
              onChange={(value) => {
                setDisclosure(value ? value : '');
                setCollectionNotice({
                  mpoInput: MPOCommentsDisclosure,
                  drafterInput: disclosure,
                });
                stateChangeHandler(collectionNotice, 'collectionNotice');
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="collectionNoticeMPO" className="pt-5">
            {Messages.CollectionNotice.MpoInput.Title.en}
          </label>
          <div className="richText pb-4" id="MPOCommentsDisclosure">
            <MDEditor
              id="collectionNoticeMPO"
              preview={isMPO() ? 'edit' : 'preview'}
              value={MPOCommentsDisclosure}
              defaultTabEnable={true}
              onChange={(value) => {
                setMPOCommentsDisclosure(value ? value : '');
                setCollectionNotice({
                  mpoInput: MPOCommentsDisclosure,
                  drafterInput: disclosure,
                });
                stateChangeHandler(collectionNotice, 'collectionNotice');
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PIACollectionUseAndDisclosure;
