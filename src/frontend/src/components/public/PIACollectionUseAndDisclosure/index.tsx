import { useState } from 'react';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import InputText from '../../common/InputText/InputText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { isMPORole } from '../../../utils/helper.util';

export interface TableColProps {
  label: string;
  filed: string;
  value: string;
  id: string;
}

const PIACollectionUseAndDisclosure = () => {
  const navigate = useNavigate();
  const [disclosure, setDisclosure] = useState('');
  const [MPOCommentsDisclosure, setMPOCommentsDisclosure] = useState('');

  const [rows, setRows] = useState([
    [
      { label: 'one', filed: 'one', value: '', id: 'one' },
      { label: 'two', filed: 'two', value: '', id: 'two' },
      { label: 'three', filed: 'three', value: '', id: 'three' },
      { label: 'four', filed: 'four', value: '', id: 'four' },
    ],
    [
      { label: 'one', filed: 'one', value: '', id: 'one' },
      { label: 'two', filed: 'two', value: '', id: 'two' },
      { label: 'three', filed: 'three', value: '', id: 'three' },
      { label: 'four', filed: 'four', value: '', id: 'four' },
    ],
    [
      { label: 'one', filed: 'one', value: '', id: 'one' },
      { label: 'two', filed: 'two', value: '', id: 'two' },
      { label: 'three', filed: 'three', value: '', id: 'three' },
      { label: 'four', filed: 'four', value: '', id: 'four' },
    ],
    [
      { label: 'one', filed: 'one', value: '', id: 'one' },
      { label: 'two', filed: 'two', value: '', id: 'two' },
      { label: 'three', filed: 'three', value: '', id: 'three' },
      { label: 'four', filed: 'four', value: '', id: 'four' },
    ],
  ]);

  const addRow = () => {
    console.log(rows);
    setRows([
      ...rows,
      [
        { label: 'one', filed: 'one', value: '', id: 'one' },
        { label: 'two', filed: 'two', value: '', id: 'two' },
        { label: 'three', filed: 'three', value: '', id: 'three' },
        { label: 'four', filed: 'four', value: '', id: 'four' },
      ],
    ]);
  };
  const isMPO = () => {
    return isMPORole();
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

  return (
    <div className="bcgovPageContainer wrapper ">
      <h1 className="results-header">{Messages.Headings.Title.en}</h1>
      <span>{Messages.Headings.Subtitle.en}</span>
      <h2 className="pt-3 pb-3">{Messages.WorkThroughDetails.Title.en}</h2>
      <section className="card">
        <div className="container">
          <div className="row">
            <div>
              <table className="data-table__container" id="tab_logic">
                <thead>
                  <tr>
                    <th className="text-center"> </th>
                    <th className="text-center" key={'DescriptionColumnOne'}>
                      {Messages.WorkThroughDetails.DescriptionColumnOne.en}
                    </th>
                    <th className="text-center" key={'DescriptionColumnTwo'}>
                      {Messages.WorkThroughDetails.DescriptionColumnTwo.en}
                    </th>
                    <th className="text-center" key={'DescriptionColumnThree'}>
                      {Messages.WorkThroughDetails.DescriptionColumnThree.en}
                    </th>
                    <th className="text-center" key={'DescriptionColumnFour'}>
                      {Messages.WorkThroughDetails.DescriptionColumnFour.en}
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
                            onChange={(e) => handleOnChange(e, idx, index)}
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
          <button onClick={addRow} className="bcgovbtn bcgovbtn__tertiary  ">
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
            onChange={(value) => setDisclosure(value ? value : '')}
          />
        </div>
        <h2 className="pt-5">{Messages.CollectionNotice.PartTwo.Title.en}</h2>
        <div className="richText pb-4" id="MPOCommentsDisclosure">
          <MDEditor
            preview={isMPO() ? 'edit' : 'preview'}
            value={MPOCommentsDisclosure}
            defaultTabEnable={true}
            onChange={(value) => setMPOCommentsDisclosure(value ? value : '')}
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
        <button type="submit" className="bcgovbtn bcgovbtn__primary btn-next">
          Next
        </button>
      </div>
    </div>
  );
};

export default PIACollectionUseAndDisclosure;
