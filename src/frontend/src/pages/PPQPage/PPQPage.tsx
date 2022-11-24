import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

import ppqImg from '../../assets/ppq_homepage.svg';

import { Link } from 'react-router-dom';
import messages from './messages';

interface IComponentProps {
  enablePiaIntakeForm: boolean;
}
function PPQLandingPage(props: IComponentProps) {
  const { enablePiaIntakeForm } = props;
  return enablePiaIntakeForm ? (
    <div className="bcgovPageContainer background">
      <div className="get-started-section results-wrapper">
        <div className="row">
          <div className="col-md-6">
            <h2 className="form-heading">{messages.PIAIntakeHeading.en}</h2>
            <br />
            <p>{messages.PIAIntakeDescriptionText.en}</p>
            <p>{messages.PIAIntakeHelpDescriptionText.en}</p>

            <div data-cy="ppq-btn">
              <Link
                to="/ppq-form"
                className="bcgovbtn bcgovbtn__primary ppq-btn"
              >
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
            <div className="get-started-content">
              <FontAwesomeIcon
                className="icon ppq-home-warning-icon"
                icon={faExclamationTriangle}
              />
              {messages.PPQHeadingWarning.en}
              <h3>
                <b>{messages.PPQHeading.en}</b>
              </h3>
              <br />
              <p>{messages.PPQDescriptionTextInPIAIntake.en}</p>
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
  ) : (
    <div className="get-started-container background">
      <div className="get-started-section results-wrapper">
        <div className="row">
          <div className="col-md-6">
            <h2>{messages.PPQHeading.en}</h2>
            <br />
            <p>{messages.PPQDescriptionText.en}</p>
            <ul>
              <li>{messages.PPQDescriptionTextOne.en}</li>
              <li>{messages.PPQDescriptionTextTwo.en}</li>
              <li>{messages.PPQDescriptionTextThree.en}</li>
            </ul>
            <div data-cy="ppq-btn">
              <Link
                to="/ppq-form"
                className="bcgovbtn bcgovbtn__primary ppq-btn"
              >
                Get started
                <FontAwesomeIcon className="icon" icon={faChevronRight} />
              </Link>
            </div>
            <br />
            <span>
              <b>Estimated time:</b> 20 minutes
            </span>
          </div>

          <div data-cy="ppq-img" className="col-md-6 ppq-svg">
            <img src={ppqImg} alt="Fill form image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PPQLandingPage;
