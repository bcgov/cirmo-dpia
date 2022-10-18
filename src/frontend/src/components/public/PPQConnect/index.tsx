import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';

const PPQConnect = () => {
  return (
    <div className="results-wrapper ppq-connect">
      <h1 className="results-header">Connect with your MPO</h1>
      <section className="find-your-mpo">
        <h2>1. Find your MPO</h2>
        <p className="mpo-find-contact">
          Every ministry has a Ministry Privacy Officer (MPO).{' '}
          <a href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/resources/privacy-officers">
            Identify your MPO and their contact information.
          </a>
        </p>
        <p className="privacy-helpline-contact">
          Can't find what you're looking for? Contact the Privacy Helpline.
          <br />
          <a href="tel:250-356-1851">250 356-1851</a>
          <br />
          <a href="mailto:privacy.helpline@gov.bc.ca">
            Privacy.Helpline@gov.bc.ca
          </a>
        </p>
      </section>
      <section className="download-results">
        <h2>2. Download your results</h2>
        <button className="btn-secondary">
          Download PPQ Results{' '}
          <FontAwesomeIcon className="icon" icon={faFileDownload} />
        </button>
      </section>
      <section className="email-results">
        <h2>3. Email your results to your MPO</h2>
        <p>
          MPOs are instrumental in writing and submitting good PIAs. Get the
          conversation started between your team and your MPO by emailing them
          your PPQ results. They will be able to help you through your PIA
          writing process once you begin.
        </p>
      </section>
      <div className="horizontal-divider"></div>
      <div className="form-buttons">
        <button className="btn-secondary btn-back">Back</button>
        <button className="btn-primary btn-next">Done</button>
      </div>
    </div>
  );
};

export default PPQConnect;
