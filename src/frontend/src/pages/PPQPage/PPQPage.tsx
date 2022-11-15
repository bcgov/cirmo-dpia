import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

import ppqImg from '../../assets/ppq_homepage.svg';

import { Link } from 'react-router-dom';

function PPQLandingPage() {
  return (
    <div className="ppq-container background">
      <div className="ppq-section results-wrapper">
        <div className="row what-is-a-ppq">
          <div className="col-md-6">
            <h1>PIA Intake</h1>
            <br />
            <p>
              The PIA Intake questions ask for some basic information about the
              initiative you&lsquo;re assessing in the PIA. If you get stuck on
              any of the questions, ask your MPO for help.{' '}
            </p>
            <p>
              If you&lsquo;re a ministry privacy officer, you can start a PIA
              intake or go to the PIA Pathways Questionnaire.
            </p>

            <div data-cy="ppq-btn">
              <Link to="/ppq-form" className="btn-primary">
                Get started
                <FontAwesomeIcon className="icon" icon={faChevronRight} />
              </Link>
            </div>
            <br />
            <span>
              <b>Estimated time:</b> 20 minutes
            </span>
          </div>
          <div data-cy="ppq-img" className="col-md-6 ppq-svg ">
            <div className="ppq-content">
              <FontAwesomeIcon
                className="icon ppq-home-warning-icon"
                icon={faExclamationTriangle}
              />{' '}
              For MPO Usage Only
              <h3>
                <b>PIA Pathway Questionnaire</b>
              </h3>
              <br />
              <p>
                The PIA Pathways Questionnaire asks for some basic information
                about the initiative you&lsquo;re assessing in the PIA
              </p>
              <div data-cy="ppq-btn">
                <Link
                  to="/ppq-form"
                  className="btn-secondary btn-secondary-transparent"
                >
                  Get started
                  <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </Link>
              </div>
              <br />
              <span>
                <b>Estimated time:</b> 5 minutes
              </span>
            </div>
            <img src={ppqImg} alt="Fill form image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PPQLandingPage;
