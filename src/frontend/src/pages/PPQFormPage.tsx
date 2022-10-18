import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import MDEditor from '@uiw/react-md-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ppqImg from '../assets/ppq_homepage.svg';
import {
  otherFactor,
  contactUserName,
  ministryList,
} from '../constant/constant';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function PPQFormPage() {
  const [value, setValue] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const handleBackClick = () => {
    // 👇️ replace set to true
    navigate('/ppq', { replace: true });
  };
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    alert('A name was submitted: ');
  };
  return (
    <div>
      <Header data-cy="header" user="first.last@gov.bc.ca" />

      <section data-cy="ppq-form-nav-bar" className="ppq-form-nav-bar">
        <div className="ppq-nav-header">
          <a href="/">
            <p> Home </p>
          </a>
        </div>
        <div>
          <a href="/ppq">
            <p> PIA Pathway Questionnaire</p>
          </a>
        </div>
      </section>
      <section className="ppq-form-section">
        <div>
          <form onSubmit={handleSubmit}>
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

                <select className="form-control" id="name" value="">
                  <option disabled={true} value="">
                    Select one
                  </option>
                  {contactUserName.map((option) => (
                    <option value={option}> {option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Work Email</label>
                <input className="form-control" type="text" name="email" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Ministry</label>
                <select className="form-control" value="">
                  <option disabled={true} value="">
                    Select one
                  </option>
                  {ministryList.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Branch</label>
                <input className="form-control" type="text" name="branch" />
              </div>
            </div>

            <div className="ppq-form-content">
              {' '}
              <h2>2. Your initiative</h2>
              <div className="form-group col-md-12">
                <label>Name of initiative</label>
                <input className="form-control" type="text" name="name" />
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
                  <MDEditor preview="edit" value={value} onChange={setValue} />
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
                  <MDEditor preview="edit" value={value} onChange={setValue} />
                </div>
              </div>
              <div>
                {' '}
                <div className="form-group col-md-6">
                  <label>What type of PIA do you need to complete?</label>
                  <select className="form-control" value="">
                    <option disabled={true} value="">
                      Select one
                    </option>
                    <option value="standard"> Standard</option>
                    <option value="complex">Complex</option>
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
                <label>
                  <input type="radio" value="yes" checked={true} />
                  Yes
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="no" />
                  No
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="notsure" />
                  I'm not sure
                </label>
              </div>
            </div>
            <div className="ppq-form-content">
              <h3>4. Other factors</h3>
              <span>
                Does your initiative involve any of the following? Check all
                that apply.
              </span>
              <div>
                {otherFactor.map((name, index) => {
                  return (
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {name}
                        </label>
                      </div>
                    </div>
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
                    initative?
                  </span>
                  <div>
                    <label>
                      <input type="radio" value="yes" checked={true} />
                      Yes
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="no" />
                      No
                    </label>
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <label>Proposed go-live or start date</label>
                  <DatePicker
                    placeholderText="yyyy-MM-dd"
                    dateFormat="yyyy/MM/dd"
                    //  selected={startDate}
                    // onChange={(date) => setStartDate(date)}
                  />
                </div>
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
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PPQFormPage;
