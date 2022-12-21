import { IPIAIntake } from '../../types/interfaces/pia-intake.interface';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateToString } from '../../utils/date';
import messages from './messages';
import fakeData from './fakeData';
const PIADetailPage = () => {
  const pia: IPIAIntake = fakeData;
  return (
    <div className="bcgovPageContainer results results-wrapper ppq-connect">
      <div className="form__title">
        <h1>{pia.title}</h1>
        <a href="/pia-edit" className="bcgovbtn bcgovbtn__primary">
          <FontAwesomeIcon icon={faArrowDown} />
        </a>
      </div>
      <div>
        <div className="row">
          <div className="col col-md-4">Status</div>
          <div className="col col-md-4">Submitted on</div>
          <div className="col col-md-4">Last modified</div>
        </div>
        <div className="row">
          <div className="col col-md-4">{pia.status}</div>
          <div className="col col-md-4">{dateToString(pia.createdAt)}</div>
          <div className="col col-md-4">{dateToString(pia.updatedAt)}</div>
        </div>
      </div>
      <div className="horizontal-divider"></div>
      <div className="container d-grid gap-3">
        <h2>
          <b>{messages.GeneralInfoSection.H2Text.en}</b>
        </h2>
        <div>
          <div className="row ">
            <div className="col col-md-4">
              <b>Drafter</b>
            </div>
            <div className="col col-md-4">
              <b>Initiative Lead</b>
            </div>
            <div className="col col-md-4">
              <b>Ministry Privacy Officer </b>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-4">{pia.drafterName}</div>
            <div className="col col-md-4">{pia.leadName}</div>
            <div className="col col-md-4">{pia.mpoName}</div>
          </div>
          <div className="row">
            <div className="col col-md-4">{pia.drafterTitle}</div>
            <div className="col col-md-4">{pia.leadTitle}</div>
            <div className="col col-md-4">{pia.mpoEmail}</div>
          </div>
          <div className="row">
            <div className="col col-md-4">{pia.drafterEmail}</div>
            <div className="col col-md-4">{pia.leadEmail}</div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col col-md-4">
              <b>Ministry</b>
            </div>
            <div className="col col-md-4">
              <b>Branch</b>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-4">{pia.ministry}</div>
            <div className="col col-md-4">{pia.branch}</div>
          </div>
        </div>
      </div>
      <div className="container pt-5">
        <h2 className="pb-3">
          <b>{messages.GeneralInfoSection.H2TextTwo.en}</b>
        </h2>
        <div>
          <p className="pb-1">
            {messages.InitiativeDescriptionSection.H2Text.en}
          </p>

          <div>
            <p> {pia.initiativeDescription}</p>
          </div>
        </div>
        <div>
          <p>{messages.InitiativeScopeSection.H2Text.en}</p>

          <div>
            <p> {pia.initiativeScope}</p>
          </div>
        </div>
        <div>
          <p>{messages.InitiativeDataElementsSection.H2Text.en}</p>

          <div>
            <p> {pia.dataElementsInvolved}</p>
          </div>
        </div>
      </div>
      <div className="container pt-5">
        <h2 className="pb-3">
          <b> {messages.GeneralInfoSection.H2TextThree.en}</b>
        </h2>
        <div>
          <p>{messages.InitiativePISection.H2Text.en}</p>

          <div>
            <p> {pia.hasAddedPiToDataElements}</p>
          </div>
        </div>
        <div>
          <p>{messages.InitiativeRiskReductionSection.H2Text.en}</p>

          <div>
            <p> {pia.riskMitigation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIADetailPage;
