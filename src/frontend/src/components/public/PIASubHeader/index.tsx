import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { statusList } from '../../../utils/status';
import { PIASubHeaderProps } from './interfaces';
import Alert from '../../common/Alert';
import { useState } from 'react';
import {
  FileDownload,
  FileDownloadTypeEnum,
} from '../../../utils/file-download.util';
import { API_ROUTES } from '../../../constant/apiRoutes';
import Spinner from '../../common/Spinner';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { PiaStatuses } from '../../../constant/constant';
import { isMPORole } from '../../../utils/helper.util';
import Modal from '../../common/Modal';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { HttpRequest } from '../../../utils/http-request.util';

function PIASubHeader({
  pia,
  secondaryButtonText = 'Save',
  handleStatusChange,
  mode = 'edit',
  lastSaveAlertInfo,
  onSaveChangeClick = () => {},
  onEditClick = () => {},
  onSubmitClick = () => {},
}: PIASubHeaderProps) {
  //TODO implement tooltip for faEllipsisH icon, so when mouse hover, will display download word
  // this pr just add download function for faEllipsisH icon
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const { pathname } = useLocation();

  const nextStepAction = pathname?.split('/').includes('nextSteps');
  secondaryButtonText = mode === 'view' ? 'Edit' : ' Save';
  const isMPO = () => {
    return isMPORole();
  };
  const handleDownload = async () => {
    setDownloadError('');

    if (!pia.id) {
      console.error(
        'Something went wrong. Result Id not available for download',
      );
      setDownloadError('Something went wrong. Please try again.');
      return;
    }

    setIsDownloading(true);
    try {
      await FileDownload.download(
        API_ROUTES.PIA_INTAKE_RESULT_DOWNLOAD.replace(':id', `${pia.id}`),
        FileDownloadTypeEnum.PDF,
      );
    } catch (e) {
      setDownloadError('Something went wrong. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  const handleAlertClose = () => {
    setDownloadError('');
  };
  //
  // Modal State
  //
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>('');
  const [modalCancelLabel, setModalCancelLabel] = useState<string>('');
  const [modalTitleText, setModalTitleText] = useState<string>('');
  const [modalParagraph, setModalParagraph] = useState<string>('');
  const [statusLocal, setStatusLocal] = useState<string>('');
  const [modalButtonValue, setModalButtonValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const changeStatusFn = (status: string) => {
    setStatusLocal(status);
    setModalConfirmLabel(statusList[status].modal.confirmLabel);
    setModalCancelLabel(statusList[status].modal.cancelLabel);
    setModalTitleText(statusList[status].modal.title);
    setModalParagraph(statusList[status].modal.description);
    setShowModal(true);
  };

  const handleModalClose = async (event: any) => {
    event.preventDefault();
    handleStatusChange(statusLocal);
    setShowModal(false);
    // navigate(buildDynamicPath(routes.PIA_VIEW, { id: pia.id }));
  };
  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="subheader-container wrapper">
      <h1 className="title">{pia.title ? pia.title : 'New PIA'}</h1>
      <div
        className={
          nextStepAction
            ? 'other__elements-nextstep-container'
            : 'other__elements-container'
        }
      >
        <div>
          {downloadError && (
            <Alert
              type="danger"
              message="Something went wrong. Please try again."
              onClose={handleAlertClose}
              className="mt-2 col-sm-1"
            />
          )}
        </div>
        <div>
          {message && (
            <Alert
              type="danger"
              message="Something went wrong. Please try again."
              onClose={handleAlertClose}
              className="mt-2 col-sm-1"
            />
          )}
        </div>
        <div className="col-md-3">
          <div>Status</div>
          <div className="dropdownSatusContainer">
            {isMPO() && mode === 'view' ? (
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
                      {statusList[pia.status].Priviliges.MPO.changeStatus.map(
                        (statuskey, index) =>
                          pia.status !== statuskey &&
                          statuskey !== PiaStatuses.COMPLETED ? (
                            <li
                              key={index}
                              onClick={() => {
                                changeStatusFn(statuskey);
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
                <div className={`statusBlock ${statusList[pia.status].class}`}>
                  {pia.status ? statusList[pia.status].title : 'Completed'}
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
        </div>
        {lastSaveAlertInfo?.show && !nextStepAction && (
          <div>
            <Alert
              type={lastSaveAlertInfo.type}
              message={lastSaveAlertInfo.message}
              showInitialIcon={true}
              showCloseIcon={false}
            />
          </div>
        )}
        <div className="d-flex">
          <button
            onClick={() => handleDownload()}
            className="mx-2 bcgovbtn bcgovbtn__secondary"
          >
            <FontAwesomeIcon icon={faEllipsisH} />
            {isDownloading && <Spinner />}
          </button>

          {/* Save or Edit button */}
          {!nextStepAction && (
            <button
              onClick={mode === 'view' ? onEditClick : onSaveChangeClick}
              className="mx-2 bcgovbtn bcgovbtn__secondary"
            >
              {secondaryButtonText}
            </button>
          )}

          {/* Submission button */}
          {!nextStepAction && pia.status !== PiaStatuses.MPO_REVIEW && (
            <button
              onClick={onSubmitClick}
              className="bcgovbtn bcgovbtn__primary"
            >
              {primaryButtonText}
            </button>
          )}
        </div>
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
  );
}

export default PIASubHeader;
