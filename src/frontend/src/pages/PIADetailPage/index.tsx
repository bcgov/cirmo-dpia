import {
  IPIAIntake,
  IPIAIntakeResponse,
} from '../../types/interfaces/pia-intake.interface';
import {
  faFileArrowDown,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { dateToString } from '../../utils/date';
import { statusList } from '../../utils/status';
import messages from './messages';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { routes } from '../../constant/routes';
import Alert from '../../components/common/Alert';
import MDEditor from '@uiw/react-md-editor';
import { MinistryList, PiaStatuses, PIOptions } from '../../constant/constant';
import { isMPORole } from '../../utils/helper.util';
import {
  FileDownload,
  FileDownloadTypeEnum,
} from '../../utils/file-download.util';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import { IPIAResult } from '../../types/interfaces/pia-result.interface';

const PIADetailPage = () => {
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [pia, setPia] = useState<any>({});
  const [fetchPiaError, setFetchPiaError] = useState('');
  const [piaMinistryFullName, setPiaMinistryFullName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [piOption, setPIOption] = useState('');

  const [piaStatus, setPiaStatus] = useState('');

  //
  // Modal State
  //
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>('');
  const [modalCancelLabel, setModalCancelLabel] = useState<string>('');
  const [modalTitleText, setModalTitleText] = useState<string>('');
  const [modalParagraph, setModalParagraph] = useState<string>('');
  const [handleEditing, sethandleEditing] = useState<boolean>(false);
  const [statusLocal, setStatusLocal] = useState<string>('');
  const [modalButtonValue, setModalButtonValue] = useState<string>('');

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
        setPiaStatus(pia.status);
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
      };
    })();
  }, [
    id,
    navigate,
    pia.hasAddedPiToDataElements,
    pia.ministry,
    pia.status,
    win,
  ]);

  const isMPO = () => {
    return isMPORole('roles');
  };
  
  const changeStatefn = (status:string) => {
    setStatusLocal(status);
    setModalConfirmLabel(statusList[status].modal.confirmLabel);
    setModalCancelLabel(statusList[status].modal.cancelLabel);
    setModalTitleText(statusList[status].modal.title);
    setModalParagraph(statusList[status].modal.description);
    setShowModal(true);
  }

  const handleSubmit = async () => {
    const requestBody: Partial<IPIAIntake> = {
      status:statusLocal,
    }; 
    try {
      const res = await HttpRequest.patch<IPIAResult>(
        API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${id}`),
        requestBody,
      );
        /* PIA will be set after data is updated in backend */
        pia.status = statusLocal;
        setPia({...pia, status:statusLocal});
      } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleAlertClose = () => {
    setFetchPiaError('');
    setDownloadError('');
  };

  const handleEdit = () => {
    // the status will change to enum when Brandon pr merged
    if (piaStatus === PiaStatuses.MPO_REVIEW) {
      sethandleEditing(true);
      setModalConfirmLabel(messages.Modal.ConfirmLabel.en);
      setModalCancelLabel(messages.Modal.CancelLabel.en);
      setModalTitleText(messages.Modal.TitleText.en);
      setModalParagraph(messages.Modal.ParagraphText.en);
      setShowModal(true);
    } else {
      navigate(`${routes.PIA_INTAKE}/${id}/edit`, {
        state: pia,
      });
    }
  };

  const handleModalClose = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!handleEditing) {
      handleSubmit();
      setShowModal(false);
      return;
    }
    setShowModal(false);
    // call backend patch endpoint to update the pia status
    event.preventDefault();
    const requestBody: Partial<IPIAIntake> = {
            status: PiaStatuses.EDIT_IN_PROGRESS,
          };
    try {
      if (buttonValue === 'submit') {
        await HttpRequest.patch<IPIAResult>(
          API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${pia.id}`),
          requestBody,
        );
        navigate(routes.PIA_INTAKE_RESULT, {
          state: { result: pia.id },
        });
      } else {
        await HttpRequest.patch<IPIAResult>(
          API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${pia.id}`),
          requestBody,
        );
        navigate(`${routes.PIA_INTAKE}/${id}/edit`, {
          state: pia,
        });
      }
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };
  const handleModalCancel = () => {
    setShowModal(false);
  };
  /*
  const handleSubmit = () => {
    console.log('will do');
  };
 */
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

  const printlog = () => {
    console.log(statusList[pia.status].Priviliges.MPO.changeStatus);
    statusList[pia.status].Priviliges.MPO.changeStatus.map((value, key) => {
      console.log(value);
    });
  }
  return (
    <div className="bcgovPageContainer wrapper">
      <div className="component__wrapper">
        <div className="full__width">
        <div className="mb-5">
          {piaStatus === 'INCOMPLETE' && (
            <Alert
              type="banner-warning"
              message="Warning: Your MPO cannot see or help you with this PIA until you click “Submit to MPO”. "
              className="mt-2"
            />
          )}
        </div>
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
        {message && (
          <Alert
            type="danger"
            message={message}
            className="mb-4"
            onClose={() => setMessage('')}
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
              {/* comment out this code now
              <button
                className="bcgovbtn bcgovbtn__primary mx-2"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
              */}
          </div>
        </div>
        <div>
            <div className="row">
              <div className="col col-md-4"><strong>Status</strong></div>
              <div className="col col-md-4"><strong>Submitted on</strong></div>
              <div className="col col-md-4"><strong>Last modified</strong></div>
            </div>
            <div className="row">
              <div className="col col-md-4">
                <div className="dropdownSatusContainer">
                  {isMPO()
                   ? <div className="dropdown">
                      <button className="dropdown-toggles form-control" 
                              type="button" 
                              id="dropdownMenuButton1" 
                              data-bs-toggle="dropdown" 
                              aria-expanded="false">
                        <div className={`statusBlock ${pia.status ? statusList[pia.status].class : ''}`}>
                            { pia.status ? statusList[pia.status].title: statusList["INCOMPLETE"].title }
                        </div>
                      </button>
                      {(pia.status)
                      ?<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {statusList[pia.status].Priviliges.MPO.changeStatus.map((statuskey, index) => (
                            (pia.status !== statuskey) && (statuskey !== PiaStatuses.COMPLETED) 
                              ?<li key={index} 
                                onClick={() => {
                                  changeStatefn(statuskey);
                                  printlog();
                                }} 
                                className="dropdown-item-container">
                                <div 
                                className={`dropdown-item statusBlock ${statusList[statuskey].class}`}>
                                  { statusList[statuskey].title }
                                </div>
                            </li>
                              : ""
                            )
                            )}
                      </ul>
                      :""
                      }
                      <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
                    </div>
                    : <div className={`statusBlock ${(pia.status == 'MPO_REVIEW') ? 'statusInfo': ''}`}>{pia.status ? pia.status : 'Completed'}</div>
                  }
                  </div>
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
          {piOption === 'No' && (
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
          )}
      </div>
      <Modal
        confirmLabel={modalConfirmLabel}
        cancelLabel={modalCancelLabel}
        titleText={modalTitleText}
        show={showModal}
        value={modalButtonValue}
        handleClose={(e) => handleModalClose(e)}
        handleCancel={handleModalCancel}
      >
        <p className="modal-text">{modalParagraph}</p>
      </Modal>
    </div>
  </div>
  );
};

export default PIADetailPage;
