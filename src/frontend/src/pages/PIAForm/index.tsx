import { PiaStatuses, PIOptions } from '../../constant/constant';
import Messages from './messages';
import { useCallback, useEffect, useState } from 'react';
import Alert from '../../components/common/Alert';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../constant/routes';
import Modal from '../../components/common/Modal';
import { deepEqual } from '../../utils/object-comparison.util';
import { SupportedAlertTypes } from '../../components/common/Alert/interfaces';
import { getShortTime } from '../../utils/date';
import PIASubHeader from '../../components/public/PIASubHeader';
import PIASideNav from '../../components/public/PIASideNav';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../../types/interfaces/pia-form.interface';
import { buildDynamicPath } from '../../utils/path';
import Spinner from '../../components/common/Spinner';
import PIANavButton from '../../components/public/PIANavButton';
import { PiaFormSideNavPages } from '../../components/public/PIASideNav/pia-form-sideNav-pages';

export type PiaStateChangeHandlerType = (
  value: any,
  key: keyof IPiaForm,
) => any;

export type PiaFormOpenMode = 'edit' | 'view';

export interface PiaValidationMessage {
  piaTitle?: string | null;
  piaMinistry?: string | null;
  piaBranch?: string | null;
  piaInitialDescription?: string | null;
}

export enum SubmitButtonTextEnum {
  INTAKE = 'Submit',
  FORM = 'Submit',
}

export enum PiaFormSubmissionTypeEnum {
  PI,
  DELEGATED,
}

export interface ILastSaveAlterInfo {
  message: string;
  type: SupportedAlertTypes;
  show: boolean;
}

const PIAFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const emptyState: IPiaForm = {
    hasAddedPiToDataElements: true,
    status: PiaStatuses.INCOMPLETE,
    isNextStepsSeenForDelegatedFlow: false,
    isNextStepsSeenForNonDelegatedFlow: false,
  };
  const mode: PiaFormOpenMode = pathname?.split('/').includes('view')
    ? 'view'
    : 'edit';

  const [formReadOnly, setFormReadOnly] = useState<boolean>(true);

  useEffect(() => {
    if (mode !== 'edit') {
      setFormReadOnly(true);
    } else {
      setFormReadOnly(false);
    }
  }, [mode]);

  const [stalePia, setStalePia] = useState<IPiaForm>(emptyState);
  const [pia, setPia] = useState<IPiaForm>(emptyState);

  // if id is provided, fetch initial and updated state from db
  const [initialPiaStateFetched, setInitialPiaStateFetched] =
    useState<boolean>(false);

  // if id not provided, keep default empty state; and track first save
  const [isFirstSave, setIsFirstSave] = useState<boolean>(true);

  const [isConflict, setIsConflict] = useState<boolean>(false);
  const [isAutoSaveFailedPopupShown, setIsAutoSaveFailedPopupShown] =
    useState<boolean>(false);

  const [lastSaveAlertInfo, setLastSaveAlertInfo] =
    useState<ILastSaveAlterInfo>({
      message: '',
      type: 'success',
      show: false,
    });

  const piaStateChangeHandler = (value: any, key: keyof IPiaForm) => {
    setStalePia(pia);

    setPia((latest) => ({
      ...latest,
      [key]: value,
    }));
  };

  const [isIntakeSubmitted, setIsIntakeSubmitted] = useState<boolean>(false);

  const [validationMessages, setValidationMessages] =
    useState<PiaValidationMessage>({});

  useEffect(() => {
    if (
      pia?.isNextStepsSeenForDelegatedFlow ||
      pia?.isNextStepsSeenForNonDelegatedFlow
    ) {
      setIsIntakeSubmitted(true);
    }
  }, [
    pia?.isNextStepsSeenForDelegatedFlow,
    pia?.isNextStepsSeenForNonDelegatedFlow,
  ]);

  const [submitButtonText, setSubmitButtonText] =
    useState<SubmitButtonTextEnum>(SubmitButtonTextEnum.INTAKE);

  useEffect(() => {
    const onIntakePage =
      pathname ===
      buildDynamicPath(
        mode === 'edit' ? routes.PIA_INTAKE_EDIT : routes.PIA_INTAKE_VIEW,
        {
          id: pia?.id,
        },
      );

    const onNewPiaPage = pathname === buildDynamicPath(routes.PIA_NEW, {});

    // if the user is on intake or new PIA page, show the submit PIA intake button; Else submit PIA
    if (onIntakePage || onNewPiaPage) {
      setSubmitButtonText(SubmitButtonTextEnum.INTAKE);
    } else {
      setSubmitButtonText(SubmitButtonTextEnum.FORM);
    }
  }, [mode, pathname, pia?.id]);

  // DO NOT allow user to edit in the MPO review status.
  const accessControl = useCallback(() => {
    if (pia?.status === PiaStatuses.MPO_REVIEW && mode === 'edit') {
      navigate(buildDynamicPath(routes.PIA_VIEW, { id: pia?.id }));
    }
  }, [mode, navigate, pia?.id, pia?.status]);

  const [message, setMessage] = useState<string>('');
  const [validationFailedMessage, setValidationFailedMessage] =
    useState<string>('');
  const [isValidationFailed, setIsValidationFailed] = useState(false);

  useEffect(() => {
    if (isValidationFailed)
      setValidationFailedMessage(
        'PIA cannot be submitted due to missing required fields on the PIA Intake page. Please enter a response to all required fields.',
      );
  }, [isValidationFailed]);
  //
  // Modal State
  //
  const [showPiaModal, setShowPiaModal] = useState<boolean>(false);
  const [piaModalConfirmLabel, setPiaModalConfirmLabel] = useState<string>('');
  const [piaModalCancelLabel, setPiaModalCancelLabel] = useState<string>('');
  const [piaModalTitleText, setPiaModalTitleText] = useState<string>('');
  const [piaModalParagraph, setPiaModalParagraph] = useState<string>('');
  const [piaModalButtonValue, setPiaModalButtonValue] = useState<string>('');
  //
  // Event Handlers
  //

  const handleShowModal = (modalType: string, conflictUser = '') => {
    switch (modalType) {
      case 'cancel':
        setPiaModalConfirmLabel(Messages.Modal.Cancel.ConfirmLabel.en);
        setPiaModalCancelLabel(Messages.Modal.Cancel.CancelLabel.en);
        setPiaModalTitleText(Messages.Modal.Cancel.TitleText.en);
        setPiaModalParagraph(Messages.Modal.Cancel.ParagraphText.en);
        setPiaModalButtonValue('cancel');
        break;
      case 'save':
        setPiaModalConfirmLabel(Messages.Modal.Save.ConfirmLabel.en);
        setPiaModalCancelLabel(Messages.Modal.Save.CancelLabel.en);
        setPiaModalTitleText(Messages.Modal.Save.TitleText.en);
        setPiaModalParagraph(Messages.Modal.Save.ParagraphText.en);
        setPiaModalButtonValue('save');
        break;
      case 'edit':
        setPiaModalConfirmLabel(Messages.Modal.Edit.ConfirmLabel.en);
        setPiaModalCancelLabel(Messages.Modal.Edit.CancelLabel.en);
        setPiaModalTitleText(Messages.Modal.Edit.TitleText.en);
        setPiaModalParagraph(Messages.Modal.Edit.ParagraphText.en);
        setPiaModalButtonValue('edit');
        break;
      case 'submitPiaIntake':
        setPiaModalConfirmLabel(Messages.Modal.SubmitPiaIntake.ConfirmLabel.en);
        setPiaModalCancelLabel(Messages.Modal.SubmitPiaIntake.CancelLabel.en);
        setPiaModalTitleText(Messages.Modal.SubmitPiaIntake.TitleText.en);
        setPiaModalParagraph(Messages.Modal.SubmitPiaIntake.ParagraphText.en);
        setPiaModalButtonValue('submitPiaIntake');
        break;
      case 'submitPiaForm':
        setPiaModalConfirmLabel(Messages.Modal.SubmitPiaForm.ConfirmLabel.en);
        setPiaModalCancelLabel(Messages.Modal.SubmitPiaForm.CancelLabel.en);
        setPiaModalTitleText(Messages.Modal.SubmitPiaForm.TitleText.en);
        setPiaModalParagraph(Messages.Modal.SubmitPiaForm.ParagraphText.en);
        setPiaModalButtonValue('submitPiaForm');
        break;
      case 'conflict':
        setPiaModalConfirmLabel(Messages.Modal.Conflict.ConfirmLabel.en);
        setPiaModalTitleText(
          Messages.Modal.Conflict.TitleText.en.replace('${user}', conflictUser),
        );
        setPiaModalParagraph(
          Messages.Modal.Conflict.ParagraphText.en.replace(
            '${user}',
            conflictUser,
          ),
        );
        setPiaModalButtonValue(modalType);
        break;
      case 'autoSaveFailed':
        setPiaModalConfirmLabel(Messages.Modal.AutoSaveFailed.ConfirmLabel.en);
        setPiaModalTitleText(Messages.Modal.AutoSaveFailed.TitleText.en);
        setPiaModalParagraph(
          Messages.Modal.AutoSaveFailed.ParagraphText.en.replace(
            '${time}',
            getShortTime(pia?.updatedAt),
          ),
        );
        setPiaModalButtonValue(modalType);
        break;
      default:
        break;
    }
    setShowPiaModal(true);
  };

  const fetchAndUpdatePia = async (piaId: string) => {
    const updatedPia = (
      await HttpRequest.get<IPiaFormResponse>(
        API_ROUTES.GET_PIA_INTAKE.replace(':id', `${piaId}`),
      )
    ).data;
    setStalePia(pia);
    setPia(updatedPia);
    setIsValidationFailed(
      updatedPia.branch === null ||
        updatedPia.branch === '' ||
        updatedPia.ministry === null ||
        updatedPia.title === null ||
        updatedPia.title === '' ||
        updatedPia.initiativeDescription === null ||
        updatedPia.initiativeDescription === '',
    );
    return updatedPia;
  };

  const hasFormChanged = useCallback(() => {
    return !deepEqual(stalePia, pia, ['updatedAt', 'saveId']);
  }, [pia, stalePia]);

  const upsertAndUpdatePia = async (changes: Partial<IPiaForm> = {}) => {
    const hasExplicitChanges = Object.keys(changes).length > 0;

    if (!hasExplicitChanges && !hasFormChanged()) {
      // only expected fields have changes; no need call update
      return pia;
    }

    let updatedPia: IPiaForm;

    if (pia?.id) {
      updatedPia = await HttpRequest.patch<IPiaForm>(
        API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${pia.id}`),
        { ...pia, ...changes },
      );
    } else {
      updatedPia = await HttpRequest.post<IPiaForm>(API_ROUTES.PIA_INTAKE, {
        ...pia,
        ...changes,
      });
    }

    setLastSaveAlertInfo({
      type: 'success',
      message: `Saved at ${getShortTime(updatedPia.updatedAt)}.`,
      show: true,
    });

    // if first time save, update stale state to the latest state, else keep the previous state for comparisons
    if (isFirstSave) {
      setStalePia(updatedPia);
      setIsFirstSave(false);
      navigate(
        buildDynamicPath(routes.PIA_INTAKE_EDIT, {
          id: updatedPia.id,
        }),
      );
    } else {
      setStalePia(pia);
    }

    setPia(updatedPia);

    // reset flags after successful save
    setIsAutoSaveFailedPopupShown(false);
    setIsConflict(false);

    return updatedPia;
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
  const handleStatusChange = async (status: string) => {
    if (!pia?.id) {
      console.error('PIA id not found.');
      return;
    }
    // call backend patch endpoint to update the pia status
    const requestBody: Partial<IPiaForm> = {
      status: status,
      saveId: pia?.saveId,
    };
    try {
      await upsertAndUpdatePia(
        requestBody,
      ); /* PIA will be set after data is updated in backend */
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleModalClose = async (event: any) => {
    setShowPiaModal(false);
    // call backend patch endpoint to save the change
    event.preventDefault();

    const buttonValue = event.target.value;
    try {
      if (buttonValue === 'submitPiaIntake') {
        await upsertAndUpdatePia({
          status:
            pia?.hasAddedPiToDataElements === false
              ? PiaStatuses.MPO_REVIEW
              : PiaStatuses.INCOMPLETE,
        });
        if (
          (pia?.id &&
            pia?.isNextStepsSeenForNonDelegatedFlow === true &&
            (pia?.hasAddedPiToDataElements === PIOptions[0].value ||
              pia?.hasAddedPiToDataElements === PIOptions[2].value)) ||
          (pia?.id &&
            pia?.isNextStepsSeenForDelegatedFlow === true &&
            pia?.hasAddedPiToDataElements === PIOptions[1].value)
        ) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: pia.id,
            }),
          );
        } else {
          navigate(
            buildDynamicPath(routes.PIA_NEXT_STEPS_EDIT, {
              id: pia.id,
              title: pia.title,
            }),
          );
        }
      } else if (buttonValue === 'submitPiaForm') {
        await upsertAndUpdatePia({ status: PiaStatuses.MPO_REVIEW });

        if (pia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: pia.id,
            }),
          );
        }
      } else if (buttonValue === 'cancel') {
        if (pia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: pia.id,
            }),
          );
        } else {
          navigate(-1);
        }
      } else if (buttonValue === 'edit') {
        await upsertAndUpdatePia({
          status:
            pia?.status === PiaStatuses.MPO_REVIEW
              ? PiaStatuses.EDIT_IN_PROGRESS
              : pia?.status,
        });
        if (pia?.id) {
          navigate(pathname.replace('view', 'edit'));
        } else {
          navigate(-1);
        }
      } else if (buttonValue === 'save') {
        const newPia = await upsertAndUpdatePia();
        if (newPia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: pia.id,
            }),
          );
        }
      } else if (buttonValue === 'conflict') {
        // noop
      } else if (buttonValue === 'autoSaveFailed') {
        // noop
      } else {
        // edit
        const updatedPia = await upsertAndUpdatePia();

        if (!updatedPia.id) {
          console.error('Invalid PIA id');
          throw new Error();
        }

        navigate(
          buildDynamicPath(routes.PIA_INTAKE_EDIT, {
            id: updatedPia.id,
          }),
        );
      }
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleModalCancel = () => {
    setShowPiaModal(false);
  };

  const handleSaveChanges = () => {
    // the save button now only handle save action
    handleShowModal('save');
  };

  //
  // Form Submission Handler
  //
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // if the user is in pia intake tab, then show submit pia intake; else submit full form
    if (submitButtonText === SubmitButtonTextEnum.INTAKE) {
      handleShowModal('submitPiaIntake');
    } else if (submitButtonText === SubmitButtonTextEnum.FORM) {
      handleShowModal('submitPiaForm');
    }
  };
  /*
   * @Description - This function is used to validate the form
   * and display a red border around the invalid fields
   * and scroll to the first invalid field.
   *
   * @param submit event - the event that triggered the validation
   *
   * How it works: The function loops through the form fields and checks if they are valid.
   * If they are not valid, it adds the class 'is-invalid' to the field and scrolls to the first invalid field.
   * If the field is a rich text editor <MD-Editor>, it adds the class 'form-control' to the field.
   * This is because the rich text editor is a div and not an input field.
   * The class 'is-invalid' is used to display the red border.
   *
   */
  const handleValidation = (event: any) => {
    let invalid = false;
    let formId = '';
    // Reset error messages
    const reset = document.getElementsByClassName('is-invalid');
    if (reset) {
      [...reset].forEach((el) => {
        el.classList.remove('is-invalid');
      });
      setValidationMessages({});
    }
    const richText = document.getElementsByClassName('richText');
    if (richText) {
      [...richText].forEach((el) => {
        el.classList.remove('form-control');
      });
    }
    if (!pia?.title) {
      invalid = true;
      formId = 'title';
      setValidationMessages((prevState) => ({
        ...prevState,
        piaTitle: 'Error: Please enter a title.',
      }));
    }
    if (!pia?.ministry) {
      invalid = true;
      formId = 'ministry-select';
      setValidationMessages((prevState) => ({
        ...prevState,
        piaMinistry: 'Error: Please select a ministry.',
      }));
    }
    if (!pia?.branch) {
      invalid = true;
      formId = 'branch';
      setValidationMessages((prevState) => ({
        ...prevState,
        piaBranch: 'Error: Please enter a branch.',
      }));
    }

    if (!pia?.initiativeDescription) {
      invalid = true;
      formId = 'initiativeDescription';
      setValidationMessages((prevState) => ({
        ...prevState,
        piaInitialDescription: 'Error: Please describe your initiative.',
      }));
    }

    if (!pia?.dataElementsInvolved && !invalid) {
      invalid = true;
      formId = 'dataElementsInvolved';
    }
    if (invalid) {
      const ele = document.getElementById(formId);
      if (ele) {
        window.scrollTo(ele.offsetLeft, ele.offsetTop - 160);
        ele.className += ' is-invalid form-control';
      }
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleSubmit(event);
    }
  };

  const alertUserLeave = useCallback(
    (e: any) => {
      // if no changes in the form recently, do not show warning leaving the page
      if (!hasFormChanged()) {
        return;
      }

      e.preventDefault();

      /* 
      For cross-browser support
      
      This function uses e.returnValue, which has been deprecated for 9+ years.
      The reason for this usage is to support Chrome which only behaves as expected when using this value.

      Below are a couple of references on this topic.

      References:
      - https://developer.mozilla.org/en-US/docs/Web/API/Event/returnValue
      - https://contest-server.cs.uchicago.edu/ref/JavaScript/developer.mozilla.org/en-US/docs/Web/API/Event/returnValue.html
    */
      e.returnValue = true;

      e.defaultPrevented = true;
    },
    [hasFormChanged],
  );

  useEffect(() => {
    // No initial state to fetch OR already fetched
    // if not in edit mode (no id available) OR initial state already fetched
    if (!id || initialPiaStateFetched) return;

    fetchAndUpdatePia(id).then((updatedPia) => {
      setStalePia(updatedPia);
      setPia(updatedPia);

      setInitialPiaStateFetched(true); // no further fetch PIA unless requested
    });
  });

  const pages = PiaFormSideNavPages(pia, mode === 'edit' ? true : false, false);

  useEffect(() => {
    const autoSave = async () => {
      if (isConflict) return; //noop if already a conflict

      try {
        await upsertAndUpdatePia();
      } catch (e: any) {
        setLastSaveAlertInfo({
          type: 'danger',
          message: `Unable to auto-save. Last saved at ${getShortTime(
            pia.updatedAt,
          )}.`,
          show: true,
        });
        if (e?.cause?.status === 409) {
          setIsConflict(true);
          handleShowModal('conflict', e?.cause?.data?.updatedByDisplayName);
        } else if (!isAutoSaveFailedPopupShown) {
          handleShowModal('autoSaveFailed');
          setIsAutoSaveFailedPopupShown(true);
        }
      }
    };
    const autoSaveTimer = setTimeout(() => {
      autoSave();
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  });

  useEffect(() => {
    window.addEventListener('beforeunload', alertUserLeave);
    return () => {
      window.removeEventListener('beforeunload', alertUserLeave);
    };
  }, [alertUserLeave, hasFormChanged]);

  return (
    <>
      <PIASubHeader
        pia={pia}
        lastSaveAlertInfo={lastSaveAlertInfo}
        primaryButtonText={submitButtonText}
        isValidationFailed={isValidationFailed}
        mode={mode}
        onSaveChangeClick={handleSaveChanges}
        handleStatusChange={handleStatusChange}
        onEditClick={handleEdit}
        onSubmitClick={handleValidation}
      />
      <div className="bcgovPageContainer background background__form wrapper">
        {message && (
          <Alert
            type="danger"
            message={message}
            className="mt-0 mb-4"
            onClose={() => setMessage('')}
          />
        )}

        <div className="component__container">
          <section className="side-nav__container">
            <PIASideNav
              pia={pia}
              isNewForm={!id}
              isReadOnly={formReadOnly}
            ></PIASideNav>
          </section>

          <section className="ms-md-3 ms-lg-4 ms-xl-5 content__container">
            {mode === 'view' && validationFailedMessage && (
              <Alert
                type="danger"
                message={validationFailedMessage}
                className="mt-0 mb-4"
                showCloseIcon={false}
                showInitialIcon={true}
              />
            )}
            {/* Only show the nested routes if it is a NEW Form (no ID) OR if existing form with PIA data is fetched */}
            {!id || initialPiaStateFetched ? (
              <Outlet
                context={[
                  pia,
                  piaStateChangeHandler,
                  formReadOnly,
                  accessControl,
                  validationMessages,
                ]}
              />
            ) : (
              <div className="w-100">
                <div className="d-flex justify-content-center">
                  <Spinner />
                </div>
              </div>
            )}
            <PIANavButton
              pages={pages}
              isIntakeSubmitted={isIntakeSubmitted}
              isDelegate={pia.hasAddedPiToDataElements === false}
            />
          </section>
        </div>

        <Modal
          confirmLabel={piaModalConfirmLabel}
          cancelLabel={piaModalCancelLabel}
          titleText={piaModalTitleText}
          show={showPiaModal}
          value={piaModalButtonValue}
          handleClose={(e) => handleModalClose(e)}
          handleCancel={handleModalCancel}
        >
          <p className="modal-text">{piaModalParagraph}</p>
        </Modal>
      </div>
    </>
  );
};

export default PIAFormPage;
