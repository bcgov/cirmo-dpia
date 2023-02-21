import { useState } from 'react';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import InputText from '../../../common/InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { isMPORole } from '../../../../utils/helper.util';
import PIASideNav from '../../PIASideNav';
import PIASubHeader from '../../PIASubHeader';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';

import {
  CollectionNoticeInput,
  ICollectionUseAndDisclosure,
} from './CollectionUseAndDisclosure';

const PIACollectionUseAndDisclosure = () => {
  const navigate = useNavigate();
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [collectionUseAndDisclosureForm, setCollectionUseAndDisclosureForm] =
    useState(pia.collectionUseAndDisclosure);

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
  const [steps, setSteps] = useState([
    {
      drafterInput: null,
      mpoInput: null,
      foippaInput: null,
      OtherInput: null,
    },
    {
      drafterInput: null,
      mpoInput: null,
      foippaInput: null,
      OtherInput: null,
    },
    {
      drafterInput: null,
      mpoInput: null,
      foippaInput: null,
      OtherInput: null,
    },
    {
      drafterInput: null,
      mpoInput: null,
      foippaInput: null,
      OtherInput: null,
    },
  ]);
  const [MPOCommentsDisclosure, setMPOCommentsDisclosure] = useState('');
  const [collectionNotice, setCollectionNotice] =
    useState<CollectionNoticeInput>({
      drafterInput: '',
      mpoInput: '',
    });
  const [rows, setRows] = useState([
    [
      { value: null, id: 'drafterInput' },
      { value: null, id: 'mpoInput' },
      { value: null, id: 'foippaInput' },
      { value: null, id: 'OtherInput' },
    ],
    [
      { value: null, id: 'drafterInput' },
      { value: null, id: 'mpoInput' },
      { value: null, id: 'foippaInput' },
      { value: null, id: 'OtherInput' },
    ],
    [
      { value: null, id: 'drafterInput' },
      { value: null, id: 'mpoInput' },
      { value: null, id: 'foippaInput' },
      { value: null, id: 'OtherInput' },
    ],
    [
      { value: null, id: 'drafterInput' },
      { value: null, id: 'mpoInput' },
      { value: null, id: 'foippaInput' },
      { value: null, id: 'OtherInput' },
    ],
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      [
        { value: null, id: 'drafterInput' },
        { value: null, id: 'mpoInput' },
        { value: null, id: 'foippaInput' },
        { value: null, id: 'OtherInput' },
      ],
    ]);
    setSteps([
      ...steps,
      {
        drafterInput: null,
        mpoInput: null,
        foippaInput: null,
        OtherInput: null,
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
    delete steps[index];
    setSteps(steps);
    stateChangeHandler(newData, 'steps');
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

  const printResult = () => {
    console.log('result', collectionUseAndDisclosureForm);
  };

  return (
    <>
      {/* PIA sub header will handle later  */}
      <PIASubHeader
        pia={pia}
        secondaryButtonText="Edit"
        primaryButtonText="Submit"
      />
      <div className="bcgovPageContainer background background__form wrapper">
        <div className="component__container">
          <PIASideNav personal_information={Boolean(true)}></PIASideNav>
          <div className=" form__container ms-md-auto right__container ">
            <h1 className="results-header">{Messages.Headings.Title.en}</h1>
            <span>{Messages.Headings.Subtitle.en}</span>
            <h2 className="pt-3 pb-3">
              {Messages.WorkThroughDetails.Title.en}
            </h2>
            <section className="card">
              <div className="container">
                <div className="row">
                  <div>
                    <table className="data-table__container" id="tab_logic">
                      <thead>
                        <tr>
                          <th className="text-center"> </th>
                          <th
                            className="text-center"
                            key={'DescriptionColumnOne'}
                          >
                            {
                              Messages.WorkThroughDetails.DescriptionColumnOne
                                .en
                            }
                          </th>
                          <th
                            className="text-center"
                            key={'DescriptionColumnTwo'}
                          >
                            {
                              Messages.WorkThroughDetails.DescriptionColumnTwo
                                .en
                            }
                          </th>
                          <th
                            className="text-center"
                            key={'DescriptionColumnThree'}
                          >
                            {
                              Messages.WorkThroughDetails.DescriptionColumnThree
                                .en
                            }
                          </th>
                          <th
                            className="text-center"
                            key={'DescriptionColumnFour'}
                          >
                            {
                              Messages.WorkThroughDetails.DescriptionColumnFour
                                .en
                            }
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((items, idx) => (
                          <tr key={idx}>
                            <td className="pt-4 col-sm-1">Step {idx + 1}</td>
                            {items.map((item, index) => (
                              <td className="px-2" key={index}>
                                <InputText
                                  type="text"
                                  value={item.value}
                                  id={item.id}
                                  onChange={(e) =>
                                    handleOnChange(e, idx, index)
                                  }
                                />
                              </td>
                            ))}

                            <td className="pt-4">
                              <button
                                className=" btn btn-outline-danger "
                                onClick={() => removeRow(idx)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="pt-4 pb-4 view-pid">
                <button
                  onClick={addRow}
                  className="bcgovbtn bcgovbtn__tertiary  "
                >
                  Add more rows
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
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
                    stateChangeHandler(value, 'collectionNotice');
                  }}
                />
              </div>
              <h2 className="pt-5">
                {Messages.CollectionNotice.PartTwo.Title.en}
              </h2>
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
                    stateChangeHandler(value, 'collectionNotice');
                  }}
                />
              </div>
            </section>
            <div className="horizontal-divider"></div>
            <div className="form-buttons">
              <button
                className="bcgovbtn bcgovbtn__secondary btn-back"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                type="submit"
                className="bcgovbtn bcgovbtn__primary btn-next"
                onClick={printResult}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PIACollectionUseAndDisclosure;
