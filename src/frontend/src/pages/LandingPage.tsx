import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import heroImg from '../assets/hero-img.svg';
import newIdeas from '../assets/undraw_new_ideas.svg';
import webSearch from '../assets/undraw_web_search.svg';
import sharedGoals from '../assets/undraw_shared_goals.svg';

function LandingPage() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Digital Privacy Impact Assessment (DPIA)</h1>
          <p>
            The Government of BC is creating a flagship Digital Privacy Impact
            Assessment (DPIA). This project will leverage service design
            findings to build a novel product that reimages the Privacy Impact
            Assessment (PIA) tools to support streamlined business processes and
            improved user experience.
          </p>
          <div className="ctas">
            <a href="/" className="btn-primary">
              Log in with IDIR{' '}
              <FontAwesomeIcon className="icon" icon={faUser} />
            </a>
            <a href="mailto:pia.intake@gov.bc.ca" className="btn-secondary">
              Contact <FontAwesomeIcon className="icon" icon={faEnvelope} />
            </a>
          </div>
        </div>
        <div className="hero-svg">
          <img src={heroImg} alt="Fill form image" />
        </div>
      </section>
      <section className="what-is-a-pia">
        <h2>What is a Privacy Impact Assessment</h2>
        <p>
          A PIA is a step-by-step review process to make sure you protect the
          personal information you collect, use or disclose in your project.
          Doing a PIA can help protect privacy and build public trust by being
          clear about what information government is collecting, who has access
          to it, and where and how it’s stored.
        </p>
        <a href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessmentS">
          Learn about the current PIA process
        </a>
      </section>
      <section className="callout-section">
        <div className="callout">
          These are draft statements and may change and evolve with feedback
          from interested parties.
        </div>
      </section>
      <section className="info-section">
        <div className="problem-subsec">
          <img src={webSearch} alt="Web Search" />
          <div className="info-subsec-text">
            <h2>Problem</h2>
            <p>
              The Privacy, Compliance and Training (PCT) is government’s
              corporate privacy office and has the mandate to review all PIAs
              for BC government ministries. PCT has seen a 686% increase in PIAs
              submitted for review in within a 10 year period. While the
              increase in volume is exponential, the statistics do not reflect
              the pressures that result from increased complexity of PIA
              submissions.{' '}
            </p>
          </div>
        </div>
        <div className="hypothesis-subsec">
          <img src={newIdeas} alt="New Ideas" />
          <div className="info-subsec-text">
            <h2>Hypothesis</h2>
            <p>
              The DPIA will alleviate unsustainable workload pressures, connect
              siloed information, support innovation, reduce repetition in the
              PIA process and enable compliance with legislated PIA
              requirements.
            </p>
          </div>
        </div>
        <div className="vision-subsec">
          <img src={sharedGoals} alt="Shared Goals" />
          <div className="info-subsec-text">
            <h2>Vision</h2>
            <p>
              The DPIA will be an integrated, guided, online tool for the for
              anyone working in a BC ministry that needs to complete a PIA.
              Digitizing the PIA will create a streamlined experience that
              enables a culture of privacy and innovation.{' '}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
