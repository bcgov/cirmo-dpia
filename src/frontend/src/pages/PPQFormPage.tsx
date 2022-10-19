import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import MDEditor from '@uiw/react-md-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faFile,
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
    icon: faFile,
    active: true,
  },
  {
    id: 2,
    label: 'Review results',
    icon: faFile,
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
  const [containsStartDate, setContainsStartDate] = useState('yes');
  const [startDate, setStartDate] = useState(new Date());
  const [checkedPIItems, setCheckedPIItems] = useState({});
  const navigate = useNavigate();

  const handleBackClick = () => {
    // 👇️ replace set to true
    navigate('/ppq', { replace: true });
  };
  const handleCheckBoxChange = (event: any) => {
    setCheckedPIItems({
      ...checkedPIItems,
      [event.target.value]: event.target.checked,
    });
    console.log('testt 1111', checkedPIItems);
  };
  const handleSubmit = (event: Event) => {
    // event.preventDefault();
    navigate('/ppq-result');
    /*
    try {
      let res = await fetch('http://dpia-api/ppq', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: workEmail,
          ministry: ministry,
          branch: branch,
          initiativeName: initiativeName,
          initiativeDescription: initiativeDesc,
          dataElements: initiativeDataElements,
          piaType: piaType,
          containsPersonalInformation: containsPI,
          
          proposedStartDate:startDate
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        navigate('/ppq-result');
      } else {
        setMessage('Some error occured');
      }
    } catch (err) {
      console.log(err);
    }
    */
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
          <form onSubmit={() => handleSubmit}>
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
                  id="name"
                  value=""
                  onChange={(e) => setName(e.target.value)}
                >
                  <option disabled={true} value="">
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
                  type="text"
                  name="email"
                  onChange={(e) => setWorkEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Ministry</label>
                <select
                  name="ministry"
                  className="form-control"
                  value=""
                  onChange={(e) => setMinistry(e.target.value)}
                >
                  <option disabled={true} value="">
                    Select one
                  </option>
                  {MinistryList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Branch</label>
                <input
                  className="form-control"
                  type="text"
                  name="branch"
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
                  name="initiativeName"
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
                    onChange={(e) => setInitiativeDesc(e.target.value)}
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
                    onChange={(e) => setInitiativeDataElements(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {' '}
                <div className="form-group col-md-6">
                  <label>What type of PIA do you need to complete?</label>
                  <select
                    className="form-control"
                    value=""
                    onChange={(e) => setPiaType(e.target.value)}
                  >
                    <option disabled={true} value="">
                      Select one
                    </option>
                    {PIATypes.map((option, index) => (
                      <option key={index} value={option}>
                        {' '}
                        {option}
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
                  <div onChange={(e) => setContainsPI(e.target.value)}>
                    <label> {option}</label>
                    <input
                      key={index}
                      type="radio"
                      name="pi"
                      value={option}
                      checked={containsPI === option}
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
                      onChange={handleCheckBoxChange}
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
                  <div
                    onClick={() => {
                      setContainsStartDate('yes');
                    }}
                  >
                    <label>Yes</label>
                    <input
                      type="radio"
                      value="yes"
                      checked={containsStartDate === 'yes'}
                    />
                  </div>
                  <div
                    className="radio"
                    onClick={() => {
                      setContainsStartDate('no');
                    }}
                  >
                    <label>No</label>
                    <input
                      type="radio"
                      value="no"
                      checked={containsStartDate === 'no'}
                    />
                  </div>
                </div>
                {containsStartDate == 'yes' && (
                  <div className="form-group col-md-6">
                    <label>Proposed go-live or start date</label>
                    <DatePicker
                      placeholderText="yyyy-MM-dd"
                      dateFormat="yyyy/MM/dd"
                      //  selected={startDate}
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
              <button className="btn-primary btn-next">Submit</button>
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
