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
      { label: `Step ${i}`, value: step.drafterInput, id: 'one' },
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
    Messages.WorkThroughDetails.DescriptionColumnOne.en,
    Messages.WorkThroughDetails.DescriptionColumnTwo.en,
    Messages.WorkThroughDetails.DescriptionColumnThree.en,
    Messages.WorkThroughDetails.DescriptionColumnFour.en,
  ];
  return (
    <>
      <div className="container__padding-inline needs-validation">
        <h1 className="results-header">{Messages.Headings.Title.en}</h1>
        <span>{Messages.Headings.Subtitle.en}</span>
        <h2 className="pt-3 pb-3">{Messages.WorkThroughDetails.Title.en}</h2>
        <section className="card">
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

        <h2 className="pt-4 pb-4">{Messages.CollectionNotice.Title.en}</h2>

        <section className="card pt-5 px-5">
          <h2>{Messages.CollectionNotice.PartOne.Title.en}</h2>
          <p>{Messages.CollectionNotice.PartOne.Description.en}</p>
          <div className="richText" id="drafterDisclosure">
            <MDEditor
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
          <h2 className="pt-5">{Messages.CollectionNotice.PartTwo.Title.en}</h2>
          <div className="richText pb-4" id="MPOCommentsDisclosure">
            <MDEditor
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
        </section>
      </div>
    </>
  );
};

export default PIACollectionUseAndDisclosure;
