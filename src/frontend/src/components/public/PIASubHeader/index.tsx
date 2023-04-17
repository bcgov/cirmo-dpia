import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { statusList } from '../../../utils/status';
import { PIASubHeaderProps } from './interfaces';
import Alert from '../../common/Alert';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PiaStatuses } from '../../../constant/constant';
import Modal from '../../common/Modal';
import StatusChangeDropDown from '../StatusChangeDropDown';
import { buildDynamicPath } from '../../../utils/path';
import { routes } from '../../../constant/routes';

function PIASubHeader({
  pia,
  secondaryButtonText = 'Save',
  primaryButtonText,
  handleStatusChange,
  mode = 'edit',
  lastSaveAlertInfo,
  isValidationFailed,
  onSaveChangeClick = () => {},
  onEditClick = () => {},
  onSubmitClick = () => {},
}: PIASubHeaderProps) {
  const { pathname } = useLocation();

  const nextStepAction = pathname?.split('/').includes('nextSteps');
  secondaryButtonText = mode === 'view' ? 'Edit' : 'Save';

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
        <div className="mx-1">
          <StatusChangeDropDown
            pia={pia}
            mode={mode}
            changeStatusFn={changeStatusFn}
          />
        </div>
        {lastSaveAlertInfo?.show && !nextStepAction && (
          <div className="mx-1">
            <Alert
              type={lastSaveAlertInfo.type}
              message={lastSaveAlertInfo.message}
              showInitialIcon={true}
              showCloseIcon={false}
            />
          </div>
        )}
        {mode === 'view' && (
          <div className="mx-1">
            <button
              onClick={onEditClick}
              className="mx-1 bcgovbtn bcgovbtn__secondary"
            >
              {secondaryButtonText}
            </button>
          </div>
        )}
        <div className="d-flex mx-1">
          <button
            className="mx-2 bcgovbtn bcgovbtn__secondary"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded={false}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          <ul className="dropdown-menu">
            <li role="button">
              <a
                className={`dropdown-item ${!pia?.id ? 'disabled' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                href={buildDynamicPath(routes.PIA_PRINT_PREVIEW, {
                  id: pia.id,
                })}
              >
                Print Preview
              </a>
            </li>
            <li role="button">
              {/* Save or Edit button */}
              {!nextStepAction && mode === 'edit' && (
                <button onClick={onSaveChangeClick} className="dropdown-item">
                  {secondaryButtonText}
                </button>
              )}
            </li>
          </ul>

          {/* Submission button */}
          {!nextStepAction && pia.status !== PiaStatuses.MPO_REVIEW && (
            <button
              onClick={onSubmitClick}
              className={`mx-1 bcgovbtn bcgovbtn__primary`}
              disabled={mode === 'view' && isValidationFailed}
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
