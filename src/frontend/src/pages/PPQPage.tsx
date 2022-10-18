import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ppqImg from '../assets/ppq_homepage.svg';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';
import PPQNavBar from '../components/common/PPQNavBar';

function PPQLandingPage() {
  return (
    <div>
      <Header data-cy="header" user="first.last@gov.bc.ca" />

      <PPQNavBar />

      <div className=" container ppq-section">
        <div className="row what-is-a-ppq">
        <div className='col-md-6'>
          <h2 >PIA Pathway Questionnaire</h2>
          <br />
          <p className='col-mb-6'>
            The PIA Pathways Questionnaire asks for some basic information about
            the initiative you're assessing in the PIA. Your answers will help
            us estimate{' '}
          </p>
         <ul className='col-mb-6 list'>
          <li>The relative complexity of your PIA </li>
          <li> Which PIA template you should fill out</li>
          <li>Where to go for help with your PIA</li>
          </ul> 
          <div data-cy="ppq-btn" className="ctas">
            <Link to="/ppq-form" className="btn-primary">
              Get started{' '}
              <FontAwesomeIcon className="icon" icon={faChevronRight} />
            </Link>
          </div>
          <br />
          <span>
            {' '}
            <b>Estimated time:</b> 20 minutes
          </span>
        </div>
        <div data-cy="ppq-img" className="col-md-6 ppq-svg">
          <img src={ppqImg} alt="Fill form image" />
        </div>
        </div>
     </div>
      <Footer />
    </div>
  );
}

export default PPQLandingPage;
