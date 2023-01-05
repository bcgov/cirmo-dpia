import {
  IPIAIntake,
  IPIAIntakeResponse,
} from '../../types/interfaces/pia-intake.interface';
import {
  faFileArrowDown,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
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
import { MinistryList, PIOptions } from '../../constant/constant';
import {
  FileDownload,
  FileDownloadTypeEnum,
} from '../../utils/file-download.util';
import Spinner from '../../components/common/Spinner';
import { isMPORole } from '../../utils/helper.util';

const PIADetailPage = () => {
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;
  const { id } = useParams();
  const navigate = useNavigate();
  const [pia, setPia] = useState<any>({});
  const [fetchPiaError, setFetchPiaError] = useState('');
  const [piaMinistryFullName, setPiaMinistryFullName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [piOption, setPIOption] = useState('');
  const [piaStatus, setPiaStatus] = useState('');
  const isMPO = !!isMPORole('roles');
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
        setPiaMinistryFullName(
          MinistryList.filter((item) => item.value === pia.ministry)[0].label,
        );
        setPIOption(
          pia.hasAddedPiToDataElements === true
            ? PIOptions[0]
            : pia.hasAddedPiToDataElements === false
            ? PIOptions[1]
            : PIOptions[2],
        );
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
  }, [id, navigate, pia.hasAddedPiToDataElements, pia.ministry, win]);

  const handleAlertClose = () => {
    setFetchPiaError('');
    setDownloadError('');
  };

  const handleEdit = () => {
    console.log('will do');
  };
  const handleSubmit = () => {
    console.log('will do');
  };

  const handleDownload = async () => {
    setDownloadError('');

    if (!id) {
      console.error(
        'Something went wrong. Result Id not available for download',
      );
      setDownloadError('Something went wrong. Please try again.');
      return;
    }

    setIsDownloading(true);
    try {
      await FileDownload.download(
        API_ROUTES.PIA_INTAKE_RESULT_DOWNLOAD.replace(':id', `${id}`),
        FileDownloadTypeEnum.PDF,
      );
    } catch (e) {
      setDownloadError('Something went wrong. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="bcgovPageContainer background ">
      <div className="container__padding-inline ppq-form-section form__container row">
        {fetchPiaError && (
          <Alert
            type="danger"
            message="Something went wrong. Please try again."
            onClose={handleAlertClose}
            className="mt-2"
          />
        )}
        {downloadError && (
          <Alert
            type="danger"
            message="Something went wrong. Please try again."
            onClose={handleAlertClose}
            className="mt-2"
          />
        )}
        <div className="container form__title">
          <div className="col col-md-8">
            <h1>{pia.title}</h1>
          </div>
          <div className="row">
            <button
              className={`bcgovbtn bcgovbtn__secondary mx-2 ${
                isDownloading ? 'opacity-50 pe-none' : ''
              }`}
              onClick={() => handleDownload()}
            >
              <FontAwesomeIcon icon={faFileArrowDown} />
              {isDownloading && <Spinner />}
            </button>
            <button
              className="bcgovbtn bcgovbtn__secondary mx-2"
              onClick={() => handleEdit()}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              className="bcgovbtn bcgovbtn__primary mx-2"
              onClick={() => handleSubmit()}
            >
              {isMPO ? 'start PPQ' : 'Submit'}
            </button>
          </div>
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
              <div className="col col-md-4">{piaMinistryFullName}</div>
              <div className="col col-md-4">{pia.branch}</div>
            </div>
          </div>
        </div>
        <div className="container pt-5 form__section">
          <h2 className="pb-3">
            <b>{messages.GeneralInfoSection.H2TextTwo.en}</b>
          </h2>
          <div>
            <h2 className="form__h2">
              {messages.InitiativeDescriptionSection.H2Text.en}
            </h2>

            <div>
              <MDEditor preview="preview" value={pia.initiativeDescription} />
            </div>
          </div>
          <div className="form__section">
            <h2 className="form__h2">
              {messages.InitiativeScopeSection.H2Text.en}
            </h2>

            <div>
              <MDEditor preview="preview" value={pia.initiativeScope} />
            </div>
          </div>
          <div className="form__section">
            <h2 className="pb-2 pt-3">
              {messages.InitiativeDataElementsSection.H2Text.en}
            </h2>

            <div>
              <MDEditor preview="preview" value={pia.dataElementsInvolved} />
            </div>
          </div>
        </div>
        <div className="container pt-5">
          <h2>
            <b>{messages.GeneralInfoSection.H2TextThree.en}</b>
          </h2>
          <div>
            <h2 className="form__h2">
              {messages.InitiativePISection.H2Text.en}
            </h2>

            <div>
              <p>{piOption}</p>
            </div>
          </div>
          <div className="form__section">
            <h2 className="form__h2">
              {messages.InitiativeRiskReductionSection.H2Text.en}
            </h2>
            <div>
              <MDEditor preview="preview" value={pia.riskMitigation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIADetailPage;
