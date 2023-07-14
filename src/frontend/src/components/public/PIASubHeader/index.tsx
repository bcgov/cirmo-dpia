import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { PIASubHeaderProps } from './interfaces';
import Alert from '../../common/Alert';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PiaStatuses } from '../../../constant/constant';
import Modal from '../../common/Modal';
import StatusChangeDropDown from '../StatusChangeDropDown';
import { buildDynamicPath } from '../../../utils/path';
import { routes } from '../../../constant/routes';
import { getGUID, roleCheck } from '../../../utils/helper.util';
import { HttpRequest } from '../../../utils/http-request.util';
import { API_ROUTES } from '../../../constant/apiRoutes';
import Messages from './messages';
import { SubmitButtonTextEnum } from '../../../pages/PIAForm';

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
  const protocol = window.location.protocol;
  const host = window.location.host;

  const nextStepAction = pathname?.split('/').includes('nextSteps');
  secondaryButtonText = mode === 'view' ? 'Edit' : 'Save';

  const userRoles = roleCheck();

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
  const [accessCode, setAccessCode] = useState<string>('');

  const accessLink = `${protocol}//${host}/pia/${pia.id}?invite=${accessCode}`;

  const [enableFinalReview, setEnableFinalReview] = useState<boolean>(false);
  const [enableComplete, setEnableComplete] = useState<boolean>(false);
  const [disableSubmitButton, setDisableSubmitButton] =
    useState<boolean>(false);
  const changeStatusFn = (modal: object, status: string) => {
    setModalTitleText(Object(modal).title);
    setModalParagraph(Object(modal).description);
    setModalConfirmLabel(Object(modal).confirmLabel);
    setModalCancelLabel(Object(modal).cancelLabel);
    setStatusLocal(status);
    setShowModal(true);
  };

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleModalClose = async (event: any) => {
    event.preventDefault();

    if (accessCode !== '' && accessCode !== undefined) {
      copyToClipboard(accessLink);
    } else handleStatusChange(statusLocal);

    setAccessCode('');
    setShowModal(false);
  };
  const handleModalCancel = () => {
    setAccessCode('');
    setShowModal(false);
  };

  const handleGenerateInviteCode = async () => {
    const { code }: any = await HttpRequest.post(API_ROUTES.GET_INVITE_CODE, {
      piaId: pia.id,
    });

    setAccessCode(code);
  };

  const populateGenerateInviteCodeModal = () => {
    setModalTitleText(Messages.GenerateAccessLinkModal.title);
    setModalParagraph(Messages.GenerateAccessLinkModal.paragraph);
    setModalConfirmLabel(Messages.GenerateAccessLinkModal.confirmLabel);
    setModalCancelLabel(Messages.GenerateAccessLinkModal.cancelLabel);
  };
  useEffect(() => {
    if (
      pia?.status === PiaStatuses.MPO_REVIEW &&
      pia?.hasAddedPiToDataElements === false &&
      pia?.review?.programArea?.selectedRoles &&
      pia?.review?.programArea?.selectedRoles?.length > 0 &&
      pia?.review?.mpo?.isAcknowledged === true &&
      pia?.review?.mpo?.reviewNote !== ''
    ) {
      setEnableFinalReview(true);
    } else {
      setEnableFinalReview(false);
    }
  }, [
    pia?.hasAddedPiToDataElements,
    pia?.review?.mpo?.isAcknowledged,
    pia?.review?.mpo?.reviewNote,
    pia?.review?.programArea?.selectedRoles,
    pia?.review?.programArea?.selectedRoles?.length,
    pia?.status,
  ]);

  useEffect(() => {
    let reviewProgramAreaDone = false;
    if (pia?.status === PiaStatuses.FINAL_REVIEW) {
      const selectedRoles = pia?.review?.programArea?.selectedRoles || [];
      for (const role of selectedRoles) {
        if (
          pia?.review?.programArea?.reviews?.[role]?.isAcknowledged !== true
        ) {
          reviewProgramAreaDone = false;
          break;
        }
        reviewProgramAreaDone = true;
      }
    }

    if (
      pia?.status === PiaStatuses.FINAL_REVIEW &&
      reviewProgramAreaDone &&
      pia?.review?.mpo?.isAcknowledged === true
    ) {
      setEnableComplete(true);
    } else {
      setEnableComplete(false);
    }
  }, [
    pia?.review?.mpo?.isAcknowledged,
    pia?.review?.programArea?.reviews,
    pia?.review?.programArea?.selectedRoles,
    pia?.status,
  ]);
  useEffect(() => {
    if (
      mode === 'view' &&
      isValidationFailed &&
      primaryButtonText === SubmitButtonTextEnum.FORM
    ) {
      setDisableSubmitButton(true);
    }
    if (
      enableFinalReview === false &&
      primaryButtonText === SubmitButtonTextEnum.DELEGATE_FINISH_REVIEW
    ) {
      setDisableSubmitButton(true);
    } else if (
      enableComplete === false &&
      primaryButtonText === SubmitButtonTextEnum.COMPLETE_PIA
    ) {
      setDisableSubmitButton(true);
    } else {
      setDisableSubmitButton(false);
    }
  }, [
    enableComplete,
    enableFinalReview,
    isValidationFailed,
    mode,
    primaryButtonText,
  ]);

  const showSaveAndEditButton = () => {
    // we may revisit this part later for standard PIA
    if (mode === 'view' && pia.status === PiaStatuses.CPO_REVIEW) return false;
    else if (mode === 'view' && pia.status === PiaStatuses.FINAL_REVIEW)
      return false;
    return true;
  };
  const showSubmitButton = () => {
    const owner = getGUID() === pia.createdByGuid ? true : false;
    // if the status is completed, hide submit button
    if (pia.status === PiaStatuses.COMPLETE) return false;
    if (
      owner &&
      pia.status !== PiaStatuses.CPO_REVIEW &&
      pia.status !== PiaStatuses.MPO_REVIEW
    )
      return true;
    else if (
      userRoles.roles !== undefined &&
      userRoles.roles[0].includes('MPO') &&
      pia.status === PiaStatuses.MPO_REVIEW
    )
      return true;
    else return false;
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
        {showSaveAndEditButton() && (
          <div className="mx-1">
            <button
              onClick={onEditClick}
              className="mx-1 bcgovbtn bcgovbtn__secondary"
              aria-label="Edit Button"
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
            aria-label="More options"
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
                aria-label="Print Preview Link"
              >
                Print Preview
              </a>
            </li>
            <li role="button">
              <button
                className={`dropdown-item ${!pia?.id ? 'disabled' : ''}`}
                aria-label="Generate access link button"
                onClick={() => {
                  handleGenerateInviteCode();
                  populateGenerateInviteCodeModal();
                  setShowModal(true);
                }}
              >
                Generate access link
              </button>
            </li>
            <li role="button">
              {/* Save or Edit button */}
              {!nextStepAction && mode === 'edit' && (
                <button
                  onClick={onSaveChangeClick}
                  className="dropdown-item"
                  aria-label="Save Change Button"
                >
                  {secondaryButtonText}
                </button>
              )}
            </li>
          </ul>

          {/* Submission button */}
          {!nextStepAction && showSubmitButton() && (
            <button
              onClick={(e) => {
                setAccessCode('');
                onSubmitClick(e);
              }}
              className={`mx-1 bcgovbtn bcgovbtn__primary`}
              disabled={disableSubmitButton}
              aria-label="Submit Button"
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
        accessLink={
          accessCode !== ''
            ? `${protocol}//${host}/pia/${pia.id}?invite=${accessCode}`
            : ''
        }
      >
        <p className="modal-text">{modalParagraph}</p>
      </Modal>
    </div>
  );
}

export default PIASubHeader;
