import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { PIASubHeaderProps } from './interfaces';
import Alert from '../../common/Alert';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PiaStatuses, SubmitButtonTextEnum } from '../../../constant/constant';
import Modal from '../../common/Modal';
import StatusChangeDropDown from '../StatusChangeDropDown';
import { buildDynamicPath } from '../../../utils/path';
import { routes } from '../../../constant/routes';
import { HttpRequest } from '../../../utils/http-request.util';
import { API_ROUTES } from '../../../constant/apiRoutes';
import Messages from './messages';
import { getUserPrivileges } from '../../../utils/statusList/common';
import { statusList } from '../../../utils/statusList/statusList';
import { IReviewSection } from '../PIAFormTabs/review/interfaces';

function PIASubHeader({
  pia,
  primaryButtonText,
  handleStatusChange,
  mode = 'edit',
  lastSaveAlertInfo,
  isValidationFailed,
  onEditClick = () => {},
  onSubmitClick = () => {},
}: PIASubHeaderProps) {
  const { pathname } = useLocation();
  const protocol = window.location.protocol;
  const host = window.location.host;

  const nextStepAction = pathname?.split('/').includes('nextSteps');

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
  const [enableSubmitToCPOReview, setEnableSubmitToCPOReview] =
    useState<boolean>(false);
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
    // enable finish review button condition
    // Delegate PIA, MPO_review status, program area at least one role selected and mpo accepted accountability
    // PI PIA, CPO_review status, same as delegate PIA, also at least one CPO need to accept accountability
    if (
      (pia?.status === PiaStatuses.MPO_REVIEW &&
        pia?.hasAddedPiToDataElements === false &&
        pia?.review?.programArea?.selectedRoles &&
        pia?.review?.programArea?.selectedRoles?.length > 0 &&
        pia?.review?.mpo?.isAcknowledged === true &&
        pia?.review?.mpo?.reviewNote !== '') ||
      (pia?.status === PiaStatuses.CPO_REVIEW &&
        pia?.hasAddedPiToDataElements !== false &&
        pia?.review?.programArea?.selectedRoles &&
        pia?.review?.programArea?.selectedRoles?.length > 0 &&
        pia?.review?.mpo?.isAcknowledged === true &&
        pia?.review?.mpo?.reviewNote !== '' &&
        pia?.review?.cpo &&
        Object.values(pia?.review.cpo)?.length > 0 &&
        Object.values(pia?.review?.cpo)?.every(
          (review: IReviewSection) =>
            review?.isAcknowledged === true && review.reviewNote !== '',
        ))
    ) {
      setEnableFinalReview(true);
    } else {
      setEnableFinalReview(false);
    }
  }, [
    pia?.hasAddedPiToDataElements,
    pia?.review?.cpo,
    pia?.review?.mpo?.isAcknowledged,
    pia?.review?.mpo?.reviewNote,
    pia?.review?.programArea?.selectedRoles,
    pia?.review?.programArea?.selectedRoles?.length,
    pia?.status,
  ]);

  useEffect(() => {
    if (
      pia?.status === PiaStatuses.MPO_REVIEW &&
      pia?.hasAddedPiToDataElements !== false &&
      pia?.review?.programArea?.selectedRoles &&
      pia?.review?.programArea?.selectedRoles?.length > 0 &&
      pia?.review?.mpo?.isAcknowledged === true &&
      pia?.review?.mpo?.reviewNote !== ''
    )
      setEnableSubmitToCPOReview(true);
  }, [
    pia?.hasAddedPiToDataElements,
    pia?.review?.mpo?.isAcknowledged,
    pia?.review?.mpo?.reviewNote,
    pia?.review?.programArea?.selectedRoles,
    pia?.status,
  ]);

  useEffect(() => {
    // If all reviews are acknowledged
    // the current status is in final review and
    // MPO too has acknowledged, the PIA can progress to complete.
    let reviewDone = false;
    reviewDone = statusList(pia)?.FINAL_REVIEW?.finalReviewCompleted || false;
    setEnableComplete(reviewDone);
  }, [
    pia,
    pia?.review?.mpo?.isAcknowledged,
    pia?.review?.programArea?.reviews,
    pia?.review?.programArea?.selectedRoles,
    pia?.status,
  ]);

  // TODO refactor this part asap.
  useEffect(() => {
    if (
      mode === 'view' &&
      isValidationFailed &&
      primaryButtonText === SubmitButtonTextEnum.FORM
    ) {
      setDisableSubmitButton(true);
    }
    if (
      pia.hasAddedPiToDataElements !== false &&
      primaryButtonText === SubmitButtonTextEnum.FORM &&
      pia.status === PiaStatuses.MPO_REVIEW &&
      enableSubmitToCPOReview === false
    ) {
      setDisableSubmitButton(true);
    } else if (
      enableFinalReview === false &&
      primaryButtonText === SubmitButtonTextEnum.FINISH_REVIEW
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
    enableSubmitToCPOReview,
    isValidationFailed,
    mode,
    pia.hasAddedPiToDataElements,
    pia.status,
    primaryButtonText,
  ]);

  const showEditButton = () => {
    // we may revisit this part later for standard PIA
    if (
      (mode === 'view' &&
        (pia.status === PiaStatuses.FINAL_REVIEW ||
          pia.status === PiaStatuses.COMPLETE ||
          pia.status === PiaStatuses.CPO_REVIEW)) ||
      nextStepAction ||
      mode === 'edit'
    )
      return false;

    return true;
  };
  const showSubmitButton = () => {
    return getUserPrivileges(pia)?.showSubmitButton;
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
        {showEditButton() && (
          <div className="mx-1">
            <button
              onClick={onEditClick}
              className="mx-1 bcgovbtn bcgovbtn__secondary"
              aria-label="Edit Button"
            >
              Edit
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
