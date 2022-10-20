import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import MDEditor from '@uiw/react-md-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faFileLines,
  faFileCircleCheck,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import Stage from '../components/public/ProgressBar/Stage';
import StagesArray from '../components/public/ProgressBar/StagesArray';
import ppqImg from '../assets/ppq_homepage.svg';
import {
  OtherFactor,
  ContactUserName,
  MinistryList,
  PIATypes,
  PIOptions,
  startDateOptions,
} from '../constant/constant';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { StageProps } from '../components/public/ProgressBar/interfaces';
import PPQNavBar from '../components/common/PPQNavBar';
import Checkbox from '../components/common/CheckBox';

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
function PPQFormPage() {
  const [name, setName] = useState('');
  const [ministry, setMinistry] = useState('');
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [initiativeName, setInitiativeName] = useState('');
  const [initiativeDesc, setInitiativeDesc] = useState('');
  const [initiativeDataElements, setInitiativeDataElements] = useState('');
  const [piaType, setPiaType] = useState('');
  const [containsPI, setContainsPI] = useState('Yes');
  const [containsStartDate, setContainsStartDate] = useState('Yes');
  const [startDate, setStartDate] = useState(new Date());
  const [checkedPIItems, setCheckedPIItems] = useState({
    hasSensitivePersonalInformation: false,
    hasSharingOfPersonalInformation: false,
    hasProgramAgreement: false,
    hasOthersAccessToPersonalInformation: false,
    hasCloudTechnology: false,
    hasPotentialPublicInterest: false,
    hasDisclosureOutsideOfCanada: false,
    hasHighVolumesPersonalInformation: false,
    hasDataLinking: false,
    hasBcServicesCardOnboarding: false,
    hasAiOrMl: false,
    hasPartnershipNonMinistry: false,
  });
  const navigate = useNavigate();

  const choosePIOption = (event: any) => {
    setContainsPI(event.target.value);
  };
  const chooseStartDate = (event: any) => {
    setContainsStartDate(event.target.value);
  };

  const handleBackClick = () => {
    // 👇️ replace set to true
    navigate('/ppq', { replace: true });
  };

  const setInitiativeDescription = (newMessage: any) => {
    setInitiativeDesc(newMessage);
  };
  const setInitiativeDataElementsInput = (newMessage: any) => {
    setInitiativeDataElements(newMessage);
  };

  const handleCheckboxChange = (event: any) => {
    setCheckedPIItems({
      ...checkedPIItems,
      [event.target.value]: event.target.checked,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // it should refactor here later
    const bodyPart1 = {
      name: name,
      email: workEmail,
      ministry: ministry,
      branch: branch,
      initiativeName: initiativeName,
      initiativeDescription: initiativeDesc,
      dataElements: initiativeDataElements,
      piaType: piaType,
      containsPersonalInformation: containsPI === 'Yes' ? true : false,
      proposedStartDate: startDate,
    };
    const requestBody = { ...bodyPart1, ...checkedPIItems };
    try {
      const res = await fetch(
        `http://${import.meta.env.VITE_REACT_API_HOST}:${
          import.meta.env.VITE_REACT_API_PORT
        }/api/ppq`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },

          body: JSON.stringify(requestBody),
        },
      );

      const resJson = await res.json();
      if (res.status === 201) {
        navigate('/ppq-results', {
          state: { id: resJson.id, complexity: resJson.complexity },
        });
      } else {
        setMessage('Some error occured');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header data-cy="header" user="first.last@gov.bc.ca" />
      <PPQNavBar />
      <div>
        <StagesArray stages={stages} />
      </div>
      <section className="ppq-form-section">
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-header">
              <h1> Fill out the PPQ</h1>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                sapien fringilla, mattis ligula consectetur, ultrices mauris.
                Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                Vestibulum auctor ornare leo, non suscipit magna interdum eu.{' '}
              </span>
            </div>

            <h3>1. Contact information</h3>
            <div className="row">
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
                      {' '}
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

            <div className="ppq-form-content">
              {' '}
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
              <div>
                <h3>About your initiative</h3>
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
              <div>
                <h3>
                  What are the data or information elements involved in your
                  initiative?{' '}
                </h3>
                <span>
                  Please list all the elements of information or data that you
                  might collect, use, store, disclose, or access as part of your
                  initiative.{' '}
                </span>

                <div>
                  <MDEditor
                    preview="edit"
                    value={initiativeDataElements}
                    onChange={setInitiativeDataElementsInput}
                  />
                </div>
              </div>
              <div>
                {' '}
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
                        {' '}
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="ppq-form-content">
              {' '}
              <h2>3. Personal information</h2>
              <h3>Is personal information involved in your initiative?</h3>
              <span>
                Personal information is any recorded information about an
                identifiable individual, other than business contact
                information. Personal information includes information that can
                be used to identify an individual through association or
                reference.
              </span>
              <div>
                {PIOptions.map((option, index) => (
                  <div onChange={choosePIOption}>
                    <label> {option}</label>
                    <input
                      key={index}
                      type="radio"
                      name="pi"
                      value={option}
                      // checked={containsPI === option}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="ppq-form-content">
              <h3>4. Other factors</h3>
              <span>
                Does your initiative involve any of the following? Check all
                that apply.
              </span>
              <div>
                {OtherFactor.map((factor, index) => {
                  return (
                    <Checkbox
                      key={index}
                      checked={false}
                      value={factor.value}
                      label={factor.label}
                      onChange={handleCheckboxChange}
                    />
                  );
                })}
              </div>
            </div>

            <div className="ppq-form-content">
              {' '}
              <h2>5. Start date </h2>
              <div className="row">
                <div className="form-group col-md-6">
                  <span>
                    Do you have a proposed go-live or start date for the
                    initiative?
                  </span>
                  <div>
                    {startDateOptions.map((option, index) => (
                      <div onChange={chooseStartDate}>
                        <label> {option}</label>
                        <input
                          key={index}
                          type="radio"
                          name="needStartDate"
                          value={option}
                          // checked={containsStartDate === option}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {containsStartDate === 'Yes' && (
                  <div className="form-group col-md-6">
                    <label>Proposed go-live or start date</label>
                    <DatePicker
                      key="startDate"
                      placeholderText="yyyy-MM-dd"
                      dateFormat="yyyy/MM/dd"
                      // selected={startDate}
                      onChange={(date) => setStartDate(startDate)}
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
      <Footer />
    </div>
  );
}

export default PPQFormPage;
