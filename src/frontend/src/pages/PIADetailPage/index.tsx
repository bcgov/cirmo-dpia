import {
  IPIAIntake,
  IPIAIntakeResponse,
} from '../../types/interfaces/pia-intake.interface';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateToString } from '../../utils/date';
import messages from './messages';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { routes } from '../../constant/routes';
import Alert from '../../components/common/Alert';
import MDEditor from '@uiw/react-md-editor';

const PIADetailPage = () => {
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;
  const { id } = useParams();
  const navigate = useNavigate();
  const [pia, setPia] = useState<any>({});
  const [fetchPiaError, setFetchPiaError] = useState('');
  useEffect(() => {
    (async () => {
      try {
        // Actually perform fetch
        const result = (
          await HttpRequest.get<IPIAIntakeResponse>(
            API_ROUTES.GET_PIA_INTAKE.replace(':id', `${id}`),
          )
        ).data;
        setPia(result);
      } catch (e) {
        if (e instanceof Error && e.cause instanceof Error) {
          const errorCode = e.cause.message as unknown as string;
          if (errorCode === '404') {
            win.location = routes.NOT_FOUND;
          } else if (
            errorCode === '401' ||
            errorCode === '403' ||
            errorCode === '410'
          ) {
            win.location = routes.NOT_AUTHORIZED;
          } else {
            setFetchPiaError('Something went wrong. Please try again.');
            throw new Error('Fetch pia failed');
          }
        }
      }
    })();
  }, [id, navigate, win]);

  const handleAlertClose = () => {
    setFetchPiaError('');
  };
  return (
    <div className="bcgovPageContainer background ">
      <section className="row ppq-form-section form__container">
        {fetchPiaError && (
          <Alert
            type="danger"
            message="Something went wrong. Please try again."
            onClose={handleAlertClose}
            className="mt-2"
          />
        )}
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
            <div className="col col-md-4">
              {pia.status ? pia.status : 'Submitted'}
            </div>
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
            <p className="pb-1">{messages.InitiativeDescriptionSection.en}</p>

            <div>
              <MDEditor preview="preview" value={pia.initiativeDescription} />
            </div>
          </div>
          <div>
            <p>{messages.InitiativeScopeSection.en}</p>

            <div>
              <MDEditor preview="preview" value={pia.initiativeScope} />
            </div>
          </div>
          <div>
            <p>{messages.InitiativeDataElementsSection.en}</p>

            <div>
              <MDEditor preview="preview" value={pia.dataElementsInvolved} />
            </div>
          </div>
        </div>
        <div className="container pt-5">
          <h2 className="pb-3">
            <b>{messages.GeneralInfoSection.H2TextThree.en}</b>
          </h2>
          <div>
            <p>{messages.InitiativePISection.en}</p>

            <div>
              <p>{pia.hasAddedPiToDataElements}</p>
            </div>
          </div>
          <div>
            <p>{messages.InitiativeRiskReductionSection.en}</p>

            <div>
              <MDEditor preview="preview" value={pia.riskMitigation} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PIADetailPage;
