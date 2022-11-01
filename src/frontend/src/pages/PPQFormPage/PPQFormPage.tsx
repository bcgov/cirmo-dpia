import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import MDEditor from '@uiw/react-md-editor';
import 'react-datepicker/dist/react-datepicker.css';
import {
  faFileLines,
  faFileCircleCheck,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import StagesArray from '../../components/common/ProgressBar/StagesArray';
import {
  OtherFactor,
  ContactUserName,
  MinistryList,
  PIATypes,
  PIOptions,
  startDateOptions,
} from '../../constant/constant';

import { StageProps } from '../../components/common/ProgressBar/interfaces';
import Checkbox from '../../components/common/Checkbox';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { IPPQFrom } from '../../ts/interfaces/ppq-form.interface';
import { routes } from '../../constant/routes';
import { IPPQResult } from '../../ts/interfaces/ppq-result.interface';

const PPQFormPage = () => {
  const stages: StageProps[] = [
    {
      id: 1,
      label: 'Fill out the PPQ',
      icon: faFileLines,
      active: true,
    },
    {
      id: 2,
      label: 'Review results',
      icon: faFileCircleCheck,
      active: false,
    },
    {
      id: 3,
      label: 'Connect with your MPO',
      icon: faHandshake,
      active: false,
    },
  ];
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ministry, setMinistry] = useState('');
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [initiativeName, setInitiativeName] = useState('');
  const [initiativeDesc, setInitiativeDesc] = useState('');
  const [initiativeScope, setInitiativeScope] = useState('');
  const [initiativeDataElements, setInitiativeDataElements] = useState('');
  const [initiativePICollectReduce, setInitiativePICollectReduce] = useState('');
  const [piaType, setPiaType] = useState('');
  const [containsPI, setContainsPI] = useState('Yes');
  const [containsStartDate, setContainsStartDate] = useState('Yes');
  const [startDate, setStartDate] = useState(null);
  const [checkedPIItems, setCheckedPIItems] = useState({
    hasSensitivePersonalInformation: false,
    hasSharingOfPersonalInformation: false,
    hasProgramAgreement: false,
    hasOthersAccessToPersonalInformation: false,
    hasCloudTechnology: false,
    hasPotentialPublicInterest: false,
    hasDisclosureOutsideOfCanada: false,
    hasBcServicesCardOnboarding: false,
    hasAiOrMl: false,
    hasPartnershipNonMinistry: false,
  });

  const choosePIOption = (event: any) => {
    setContainsPI(event.target.value);
  };
  const chooseStartDate = (event: any) => {
    setContainsStartDate(event.target.value);
  };

  const handleBackClick = () => {
    // 👇️ replace set to true

    // TODO replace hardcode value to const value in a central file
    navigate(routes.PPQ_LANDING_PAGE, { replace: true });
  };

  const setInitiativeDescription = (newMessage: any) => {
    setInitiativeDesc(newMessage);
  };

  const handleSetInitiativeScope = (newMessage: any) => {
    setInitiativeScope(newMessage);
  };

  const setInitiativeDataElementsInput = (newMessage: any) => {
    setInitiativeDataElements(newMessage);
  };

  const handleSetInitiativePICollectReduce = (newMessage: any) => {
    setInitiativePICollectReduce(newMessage);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedPIItems({
      ...checkedPIItems,
      [event.target.value]: event.target.checked,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const requestBody: IPPQFrom = {
      name: name,
      email: workEmail,
      ministry: ministry,
      branch: branch,
      initiativeName: initiativeName,
      initiativeDescription: initiativeDesc,
      dataElements: initiativeDataElements,
      piaType: piaType === 'null' ? null : piaType,
      containsPersonalInformation: containsPI === 'Yes' ? true : false,
      proposedStartDate: startDate,
      ...checkedPIItems,
    };
    try {
      const res = await HttpRequest.post<IPPQResult>(
        API_ROUTES.PPQ_FORM_SUBMISSION,
        requestBody,
      );

      navigate(routes.PPQ_FORM_RESULTS, {
        state: { result: res },
      });
    } catch (err) {
      setMessage('Some error occured');
      console.log(err);
    }
  };

  return (
    <>
      <StagesArray stages={stages} />
      <section className="ppq-form-section">
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-header">
              <h1> Fill out the PPQ</h1>
              <p>
                By answering these <strong>first 4 questions</strong> from the PIA template you
                can give the information to your MPO and find out whether you have
                to do a full PIA.
              </p>
            </div>

            <div className="row">
              <h2>1. Contact information</h2>
              <div className="form-group col-md-6">
                <label>Name</label>
                <select
                  className="form-control"
                  key="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <option key="selectName" disabled={true} value="">
                    Select one
                  </option>
                  {ContactUserName.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Work Email</label>
                <input
                  className="form-control"
                  type="email"
                  key="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Ministry</label>
                <select
                  key="ministry"
                  className="form-control"
                  value={ministry}
                  onChange={(e) => setMinistry(e.target.value)}
                >
                  <option key="selectMinistry" disabled={true} value="">
                    Select one
                  </option>
                  {MinistryList.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Branch</label>
                <input
                  className="form-control"
                  type="text"
                  key="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <h2>2. Your initiative</h2>
              <div className="form-group col-md-12">
                <label>Name of initiative</label>
                <input
                  className="form-control"
                  type="text"
                  key="initiativeName"
                  onChange={(e) => setInitiativeName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>What type of PIA do you need to complete?</label>
                <select
                  key="pia"
                  className="form-control"
                  value={piaType}
                  onChange={(e) => setPiaType(e.target.value)}
                >
                  <option key="selectPiaType" disabled={true} value="">
                    Select one
                  </option>
                  {PIATypes.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label>About your initiative</label>
                <span>
                  Describe your initiative in enough detail that a reader who
                  knows nothing about your work will understand the purpose of
                  your initiative and who your partners and other interested
                  parties are.
                </span>
                <div>
                  <MDEditor
                    preview="edit"
                    value={initiativeDesc}
                    onChange={setInitiativeDescription}
                  />
                </div>
              </div>
              <div className='form-group'>
                <label>What is the scope of the PIA?</label>
                <span>
                Your initiative might be part of a larger one or might be rolled 
                out in phases. What part of the initiative is covered by this 
                PIA? What is out of scope of this PIA?
                </span>
                <div>
                  <MDEditor
                    preview="edit"
                    value={initiativeScope}
                    onChange={handleSetInitiativeScope}
                  />
                </div>
              </div>
              <div className='form-group'>
                <label>
                  What are the data or information elements involved in your
                  initiative?
                </label>
                <span>
                  Please list all the elements of information or data that you
                  might collect, use, store, disclose, or access as part of your
                  initiative.
                </span>

                <div>
                  <MDEditor
                    preview="edit"
                    value={initiativeDataElements}
                    onChange={setInitiativeDataElementsInput}
                  />
                </div>
              </div>
              
            </div>

            <div className="form-group">
              <h2>3. Personal information</h2>
              <label className='h2-label'>Is personal information involved in your initiative?</label>
              <span>
                Personal information is any recorded information about an
                identifiable individual, other than business contact
                information. Personal information includes information that can
                be used to identify an individual through association or
                reference.
              </span>
              <div>
                {PIOptions.map((option, index) => {
                  return PIOptions[0] === option ? (
                  <div key={index} onChange={choosePIOption}>
                    <label className='input-label'>
                      <input
                      name="pi-radio"
                      key={index}
                      type="radio"
                      value={option}
                      defaultChecked
                    />
                    {option}
                    </label>
                  </div>
                  ) : (
                  <div key={index} onChange={choosePIOption}>
                    <label className='input-label'>
                      <input
                      name="pi-radio"
                      key={index}
                      type="radio"
                      value={option}
                    />
                    {option}
                    </label>
                  </div>
                  )
                })}
              </div>
            </div>

            <div className="form-group">
              <h2>4. Other factors</h2>
              <label className='h2-label'>
                Does your initiative involve any of the following? Check all
                that apply.
              </label>
              <div>
                {OtherFactor.map((factor, index) => {
                  return (
                    <Checkbox
                      key={index}
                      checked={false}
                      value={factor.value}
                      label={factor.label}
                      tooltip={factor.tooltip}
                      tooltipText={factor.tooltipText}
                      onChange={handleCheckboxChange}
                    />
                  );
                })}
              </div>
            </div>
            <div className='form-group pi-collect'>
              <label>How will you reduce the risk of unintentionally collecting personal information?</label>
              <span>
                Some initiatives that do not require personal information are at risk of collecting personal 
                information inadvertently, which could result in an information incident or privacy breach. 
              </span>
              <div>
                <MDEditor
                  preview="edit"
                  value={initiativePICollectReduce}
                  onChange={handleSetInitiativePICollectReduce}
                />
              </div>
            </div>
            <div className="form-group">
              <h2>5. Start date </h2>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className='h2-label'>
                    Do you have a proposed go-live or start date for the
                    initiative?
                  </label>
                  <div>
                    {startDateOptions.map((option, index) => {
                      return startDateOptions[0] === option ? (
                      <div key={index} onChange={chooseStartDate}>
                        <label className='input-label'>
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
                      <div key={index} onChange={chooseStartDate}>
                        <label className='input-label'>
                        <input
                          key={index}
                          type="radio"
                          name="start-initiative-radio"
                          value={option}
                        />
                        {option}
                        </label>
                      </div>
                      )
                    })}
                  </div>
                </div>
                {containsStartDate === 'Yes' && (
                  <div className="form-group col-md-6">
                    <label>Proposed go-live or start date</label>
                    <DatePicker
                      key="startDate"
                      placeholderText={'yyyy-MM-dd'}
                      dateFormat="yyyy/MM/dd"
                      selected={startDate === null ? null : startDate}
                      onChange={(date: any) => setStartDate(date)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="horizontal-divider"></div>
            <div className="form-buttons">
              <button
                className="btn-secondary btn-back"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button type="submit" className="btn-primary btn-next">
                Submit
              </button>
            </div>
            <div className="message">{message ? <p>{message}</p> : null}</div>
          </form>
        </div>
      </section>
    </>
  );
};

export default PPQFormPage;
