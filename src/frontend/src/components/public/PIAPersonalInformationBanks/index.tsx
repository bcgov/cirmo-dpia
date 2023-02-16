import { useState } from 'react';
import Messages from './messages';
import InputText from '../../common/InputText/InputText';

import { useNavigate } from 'react-router-dom';
import { YesNoInputOptions } from '../../../constant/constant';
import MDEditor from '@uiw/react-md-editor';

const PIAPersonalInformationBanks = () => {
  const navigate = useNavigate();

  const [containsPIBs, setContainsPIBs] = useState('Yes');
  const [PIBsDescription, setPIBsDescription] = useState('');
  const [ministryAndAgencyInvolved, setMinistryAndAgencyInvolved] =
    useState('');
  const [PIBResponsiblePersonal, setPIBResponsiblePersonal] = useState('');
  const [otherOrgInvolved, setOtherOrgInvolved] = useState('');
  const [
    PIBResponsiblePersonalPhoneNumber,
    setPIBResponsiblePersonalPhoneNumber,
  ] = useState('');
  const handleBackClick = () => {
    // 👇️ replace set to true

    // TODO replace this with the correct  value in full pia scenario
    navigate(-1);
  };

  const choosePIBs = (event: any) => {
    setContainsPIBs(event.target.value);
  };
  const handlePIBsDescriptionChange = (newMessage: any) => {
    setPIBsDescription(newMessage);
  };

  return (
    <div className="bcgovPageContainer wrapper ">
      <h1 className="results-header pb-4">{Messages.Headings.Title.en}</h1>
      <p> {Messages.Headings.Description.en}</p>
      <h2 className="px-2 py-2">{Messages.Section.Title.en}</h2>
      <section className="card">
        <div className="px-4 py-4">
          <h2>{Messages.Section.QuestionOne.en}</h2>
          <div>
            <div className="form-group row">
              <div>
                {YesNoInputOptions.map((option, index) => {
                  return YesNoInputOptions[0] === option ? (
                    <div key={index} onChange={choosePIBs}>
                      <label className="input-label">
                        <input
                          key={index}
                          type="radio"
                          name="start-initiative-radio"
                          value={option}
                          defaultChecked
                        />
                        {option}
                      </label>
                    </div>
                  ) : (
                    <div key={index} onChange={choosePIBs}>
                      <label className="input-label">
                        <input
                          key={index}
                          type="radio"
                          name="start-initiative-radio"
                          value={option}
                        />
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {containsPIBs === 'Yes' && (
              <div>
                <div className="form-group">
                  <h2>{Messages.Section.QuestionOneDescription.en}</h2>
                  <MDEditor
                    preview="edit"
                    value={PIBsDescription}
                    onChange={handlePIBsDescriptionChange}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <InputText
                      label="Main ministry or agency involved"
                      value={ministryAndAgencyInvolved}
                      required={true}
                      onChange={(e) =>
                        setMinistryAndAgencyInvolved(e.target.value)
                      }
                    />
                  </div>
                  <div className="col">
                    <InputText
                      label="Any other ministries, agencies, public bodies or organizations involved"
                      value={otherOrgInvolved}
                      required={true}
                      onChange={(e) => setOtherOrgInvolved(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <InputText
                      label="Name of person responsible for managing the PIB"
                      id="PIBresponsiblePersonal"
                      value={PIBResponsiblePersonal}
                      onChange={(e) =>
                        setPIBResponsiblePersonal(e.target.value)
                      }
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <InputText
                      label="Phone number of person responsible for managing the PIB"
                      id="drafterEmail"
                      value={PIBResponsiblePersonalPhoneNumber}
                      onChange={(e) =>
                        setPIBResponsiblePersonalPhoneNumber(e.target.value)
                      }
                      required={true}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
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

export default PIAPersonalInformationBanks;
