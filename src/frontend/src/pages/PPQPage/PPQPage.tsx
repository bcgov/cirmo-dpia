import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ppqImg from '../../assets/ppq_homepage.svg';
import piaImg from '../../assets/pia_intake.svg';

import { Link } from 'react-router-dom';
import messages from './messages';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { routes } from '../../constant/routes';
import { useEffect } from 'react';

export interface IComponentProps {
  showMPOContents: boolean;
}
function PPQLandingPage(props: IComponentProps) {
  const { showMPOContents } = props;
  useEffect(() => {
    document.title = 'Create new - Digital Privacy Impact Assessment (DPIA)';
  }, []); // Empty array ensures this runs once on mount and unmount
  return (
    <div className="bcgovPageContainer wrapper">
      <Breadcrumbs />
      <div>
        <div>
          <h1 className="mb-4">Create New </h1>
        </div>
        <div className="overflow-clip">
          <div className="row mt-2 mb-5 component__row--create-new-form drop-shadow section-border-radius">
            <div className="col">
              <h2>
                <b>{messages.PIAIntakeHeading.en}</b>
              </h2>
              <br />
              <p>{messages.PIAIntakeDescriptionText.en}</p>

              <div data-cy="ppq-btn">
                <Link
                  to={routes.PIA_NEW}
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
            <div
              data-cy="pia-img"
              className="col col-md-4 rounded float-end order-first order-md-last"
            >
              <img src={piaImg} alt="Fill form image" />
            </div>
          </div>
          {showMPOContents && (
            <div
              data-cy="ppq-img"
              className="row mt-2 mb-5 component__row--create-new-form  drop-shadow section-border-radius"
            >
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
              <div className="col col-md-4 rounded float-end order-first order-md-last">
                <img src={ppqImg} alt="Fill form image" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PPQLandingPage;
