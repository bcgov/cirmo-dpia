import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ppqImg from '../assets/ppq_homepage.svg';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function PPQLandingPage() {
  return (
    <div>
      <Header data-cy="header" user="first.last@gov.bc.ca" />
      <section data-cy="ppq-nav-bar" className="ppq-nav-bar">
        <a href="/">
          <p> Home </p>
        </a>

        <a href="/ppq">
          <p> PIA Pathway Questionnaire</p>
        </a>
      </section>
      <section className="ppq-section">
        <div className="what-is-a-ppq">
          <h2 className="ppq-header">PIA Pathway Questionnaire</h2>
          <br />
          <h2>what is it?</h2>
          <p>
            The PIA Pathways Questionnaire asks for some basic information about
            the initiative you're assessing in the PIA. Your answers will help
            us estimate{' '}
          </p>
          <h2>Value of the PPQ</h2>
          <p>The relative complexity of your PIA </p>
          <p> Which PIA template you should fill out</p>
          <p>Where to go for help with your PIA</p>

          <div data-cy="ppq-btn" className="ctas">
            <a href="/" className="btn-primary">
              Get started{' '}
              <FontAwesomeIcon className="icon" icon={faChevronRight} />
            </a>
          </div>
          <br />
          <span>
            {' '}
            <b>Estimated time:</b> 20 minutes
          </span>
        </div>
        <div data-cy="ppq-img" className="ppq-svg">
          <img src={ppqImg} alt="Fill form image" />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PPQLandingPage;
