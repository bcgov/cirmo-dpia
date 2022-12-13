import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import ppqImg from '../../assets/ppq_homepage.svg';
import piaImg from '../../assets/pia_intake.svg';

import { Link } from 'react-router-dom';
import messages from './messages';
import Breadcrumb from '../../components/common/Breadcrumb';

interface IComponentProps {
  showMPOContents: boolean;
}
function PPQLandingPage(props: IComponentProps) {
  const { showMPOContents } = props;
  return showMPOContents ? (
    <div className="bcgovPageContainer background">
      <div>
        <Breadcrumb />

        <div>
          <h1 className="mb-4">Create New </h1>
        </div>
        <div className="container ">
          <div className="row mt=2 mb-5 get-start-container">
            <div className="col ">
              <h2>
                <b>{messages.PIAIntakeHeading.en}</b>
              </h2>
              <br />
              <p>{messages.PIAIntakeDescriptionText.en}</p>

              <div data-cy="ppq-btn">
                <Link
                  to="/pia-intake"
                  className="bcgovbtn bcgovbtn__primary ppq-btn"
                >
                  Start PIA Intake
                  <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </Link>
              </div>
              <br />
              <span>
                <b>Estimated time:</b> 20 minutes
              </span>
            </div>
            <div className="col col-sm-4 rounded float-end">
              <img src={piaImg} alt="Fill form image" />
            </div>
          </div>

          <div data-cy="ppq-img" className="row mt-2 mb-5 get-start-container ">
            <div className="col">
              <h2>
                <b>{messages.PPQHeading.en}</b>
              </h2>
              <br />
              <p>{messages.PPQDescriptionTextInPIAIntake.en}</p>
              <div data-cy="ppq-btn">
                <Link to="/ppq-form" className=" bcgovbtn bcgovbtn__primary">
                  Start PPQ
                  <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </Link>
              </div>
              <br />
              <span>
                <b>Estimated time:</b> 5 minutes
              </span>
            </div>
            <div className="col col-sm-4 rounded float-end">
              <img src={ppqImg} alt="Fill form image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bcgovPageContainer background">
      <div>
        <Breadcrumb />
        <div>
          <h1 className="mb-4">Create New </h1>
        </div>
        <div className="container ">
          <div className="row mt-2 mb-5 get-start-container">
            <div className="col ">
              <h2>
                <b>{messages.PIAIntakeHeading.en}</b>
              </h2>
              <br />
              <p>{messages.PIAIntakeDescriptionText.en}</p>

              <div data-cy="ppq-btn">
                <Link
                  to="/pia-intake"
                  className="bcgovbtn bcgovbtn__primary ppq-btn"
                >
                  Start PIA Intake
                  <FontAwesomeIcon className="icon" icon={faChevronRight} />
                </Link>
              </div>
              <br />
              <span>
                <b>Estimated time:</b> 20 minutes
              </span>
            </div>
            <div className="col col-sm-4 rounded float-end">
              <img src={piaImg} alt="Fill form image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PPQLandingPage;
