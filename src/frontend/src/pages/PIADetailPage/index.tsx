import {
  faFileArrowDown,
  faPenToSquare,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import PIASubHeader from '../../components/public/PIASubHeader';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../../types/interfaces/pia-form.interface';
import { buildDynamicPath } from '../../utils/path';

const PIADetailPage = () => {
  // https://github.com/microsoft/TypeScript/issues/48949
  // workaround
  const win: Window = window;
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [pia, setPia] = useState<IPiaForm>({});
  const [fetchPiaError, setFetchPiaError] = useState('');
  const [piaMinistryFullName, setPiaMinistryFullName] = useState('');
  const [piOption, setPIOption] = useState('');

  //
  // Modal State
  //
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>('');
  const [modalCancelLabel, setModalCancelLabel] = useState<string>('');
  const [modalTitleText, setModalTitleText] = useState<string>('');
  const [modalParagraph, setModalParagraph] = useState<string>('');
  const [handleEditing, setHandleEditing] = useState<boolean>(true);
  const [statusLocal, setStatusLocal] = useState<string>('');
  const [modalButtonValue, setModalButtonValue] = useState<string>('');

  const updatePiaHttpRequest = (
    updatedId: number,
    requestBody: Partial<IPiaForm>,
  ) => {
    return HttpRequest.patch<IPiaForm>(
      API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${updatedId}`),
      requestBody,
    );
  };

  useEffect(() => {
    (async () => {
      try {
        // Actually perform fetch
        const result = (
          await HttpRequest.get<IPiaFormResponse>(
            API_ROUTES.GET_PIA_INTAKE.replace(':id', `${id}`),
          )
        ).data;
        setPia(result);
        setPiaMinistryFullName(
          MinistryList.filter((item) => item.value === result.ministry)[0]
            .label,
        );
        /* Note this is a workaround to get the PI option value */
        setPIOption(
          result.hasAddedPiToDataElements === true
            ? PIOptions[0]?.key
            : result.hasAddedPiToDataElements === false
            ? PIOptions[1]?.key
            : PIOptions[2]?.key,
        );
      } catch (e) {
        if (e instanceof Error && e.cause) {
          const cause = e.cause as any;
          const errorCode = cause?.status;
          if (errorCode === 404) {
            win.location = routes.NOT_FOUND;
          } else if (
            errorCode === 401 ||
            errorCode === 403 ||
            errorCode === 410
          ) {
            win.location = routes.NOT_AUTHORIZED;
          } else {
            setFetchPiaError('Something went wrong. Please try again.');
            throw new Error('Fetch pia failed');
          }
        }
      }
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
    return isMPORole();
  };

  const changeStatefn = (status: string) => {
    setStatusLocal(status);
    setHandleEditing(false);
    setModalConfirmLabel(statusList[status].modal.confirmLabel);
    setModalCancelLabel(statusList[status].modal.cancelLabel);
    setModalTitleText(statusList[status].modal.title);
    setModalParagraph(statusList[status].modal.description);
    setShowModal(true);
  };

  const handleShowModal = (modalType: string) => {
    switch (modalType) {
      case 'submit':
        setModalConfirmLabel(messages.Modal.Submit.ConfirmLabel.en);
        setModalCancelLabel(messages.Modal.Submit.CancelLabel.en);
        setModalTitleText(messages.Modal.Submit.TitleText.en);
        setModalParagraph(messages.Modal.Submit.ParagraphText.en);
        setModalButtonValue('submit');
        break;
      case 'edit':
        setModalConfirmLabel(messages.Modal.Edit.ConfirmLabel.en);
        setModalCancelLabel(messages.Modal.Edit.CancelLabel.en);
        setModalTitleText(messages.Modal.Edit.TitleText.en);
        setModalParagraph(messages.Modal.Edit.ParagraphText.en);
        setModalButtonValue('edit');
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const handleEdit = () => {
    if (!pia?.id) {
      console.error('PIA id not found');
      return;
    }
    // the status will change to enum when Brandon pr merged
    if (pia.status === PiaStatuses.MPO_REVIEW) {
      handleShowModal('edit');
    } else {
      navigate(buildDynamicPath(routes.PIA_INTAKE_EDIT, { id: pia.id }), {
        state: pia,
      });
    }
  };

  const handleSubmit = () => {
    handleShowModal('submit');
  };

  const handleStatusSubmit = async () => {
    if (!pia?.id) {
      console.error('PIA id not found.');
      return;
    }

    const requestBody: Partial<IPiaForm> = {
      status: statusLocal,
      saveId: pia?.saveId,
      submittedAt: pia?.submittedAt,
    };
    try {
      const res = await updatePiaHttpRequest(
        pia.id,
        requestBody,
      ); /* PIA will be set after data is updated in backend */
      setPia(res);
      setHandleEditing(true);
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleAlertClose = () => {
    setFetchPiaError('');
  };

  const handleModalClose = async (event: any) => {
    if (!handleEditing) {
      handleStatusSubmit();
      setShowModal(false);
      return;
    }
    setShowModal(false);
    // call backend patch endpoint to update the pia status
    event.preventDefault();
    const buttonValue = event.target.value;

    const requestBody: Partial<IPiaForm> =
      buttonValue === 'submit'
        ? {
            status: PiaStatuses.MPO_REVIEW,
            saveId: pia?.saveId,
            submittedAt: pia?.submittedAt,
          }
        : {
            status: PiaStatuses.EDIT_IN_PROGRESS,
            saveId: pia?.saveId,
          };
    try {
      if (!pia?.id) {
        console.error('PIA id not found.');
        return;
      }

      if (buttonValue === 'submit') {
        const updatedPia = await updatePiaHttpRequest(pia.id, requestBody);
        setPia(updatedPia);
        navigate(routes.PIA_RESULT, {
          state: { result: updatedPia },
        });
      } else {
        const updatedPia = await updatePiaHttpRequest(pia?.id, requestBody);
        setPia(updatedPia);
        navigate(buildDynamicPath(routes.PIA_INTAKE_EDIT, { id: pia.id }), {
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

  return (
    <>
      <PIASubHeader
        pia={pia}
        secondaryButtonText="Edit"
        primaryButtonText="Submit"
        onSaveChangeClick={() => handleEdit()}
        onSubmitClick={() => handleSubmit()}
      />
      <div className="bcgovPageContainer wrapper">
        <div className="component__wrapper">
          <div className="full__width">
            <div className="mb-5">
              {pia?.status === 'INCOMPLETE' && (
                <Alert
                  type="banner-warning"
                  message="Warning: Your MPO cannot see or help you with this PIA until you click “Submit to MPO”. "
                  className="mt-2"
                  showInitialIcon={true}
                  showCloseIcon={false}
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
            {message && (
              <Alert
                type="danger"
                message={message}
                className="mb-4"
                onClose={() => setMessage('')}
              />
            )}

            <div>
              <div className="row">
                <div className="col col-md-4">
                  <strong>Status</strong>
                </div>
                <div className="col col-md-4">
                  <strong>Submitted on</strong>
                </div>
                <div className="col col-md-4">
                  <strong>Last modified</strong>
                </div>
              </div>
              <div className="row">
                <div className="col col-md-4">
                  <div className="dropdownSatusContainer">
                    {isMPO() ? (
                      <div className="dropdown">
                        <button
                          className="dropdown-toggles form-control"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div
                            className={`statusBlock ${
                              pia.status ? statusList[pia.status].class : ''
                            }`}
                          >
                            {pia.status
                              ? statusList[pia.status].title
                              : statusList[PiaStatuses.INCOMPLETE].title}
                          </div>
                        </button>
                        {pia.status ? (
                          pia.status in statusList ? (
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              {statusList[
                                pia.status
                              ].Priviliges.MPO.changeStatus.map(
                                (statuskey, index) =>
                                  pia.status !== statuskey &&
                                  statuskey !== PiaStatuses.COMPLETED ? (
                                    <li
                                      key={index}
                                      onClick={() => {
                                        changeStatefn(statuskey);
                                      }}
                                      className="dropdown-item-container"
                                    >
                                      <div
                                        className={`dropdown-item statusBlock ${statusList[statuskey].class}`}
                                      >
                                        {statusList[statuskey].title}
                                      </div>
                                    </li>
                                  ) : (
                                    ''
                                  ),
                              )}
                            </ul>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                        <FontAwesomeIcon
                          className="dropdown-icon"
                          icon={faChevronDown}
                        />
                      </div>
                    ) : pia.status ? (
                      pia.status in statusList ? (
                        <div
                          className={`statusBlock ${
                            statusList[pia.status].class
                          }`}
                        >
                          {pia.status
                            ? statusList[pia.status].title
                            : 'Completed'}
                        </div>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col col-md-4">
                  {pia.submittedAt ? dateToString(pia.submittedAt) : ''}
                </div>
                <div className="col col-md-4">
                  {dateToString(pia.updatedAt)}
                </div>
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
                  <MDEditor
                    preview="preview"
                    value={pia.initiativeDescription}
                  />
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
                  <MDEditor
                    preview="preview"
                    value={pia.dataElementsInvolved}
                  />
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
    </>
  );
};

export default PIADetailPage;
