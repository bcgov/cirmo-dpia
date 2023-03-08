import { PiaStatuses } from '../../constant/constant';
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

export type PiaStateChangeHandlerType = (
  value: any,
  key: keyof IPiaForm,
) => any;

export interface ILastSaveAlterInfo {
  message: string;
  type: SupportedAlertTypes;
  show: boolean;
}

const PIAFormPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const emptyState: IPiaForm = {
    hasAddedPiToDataElements: true,
    status: PiaStatuses.INCOMPLETE,
    isNextStepsSeenForDelegatedFlow: false,
    isNextStepsSeenForNonDelegatedFlow: false,
  };

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

  const [message, setMessage] = useState<string>('');
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
        break;
      case 'submit':
        setPiaModalConfirmLabel(Messages.Modal.Submit.ConfirmLabel.en);
        setPiaModalCancelLabel(Messages.Modal.Submit.CancelLabel.en);
        setPiaModalTitleText(Messages.Modal.Submit.TitleText.en);
        setPiaModalParagraph(Messages.Modal.Submit.ParagraphText.en);
        setPiaModalButtonValue('submit');
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
      message: `Auto-saved at ${getShortTime(updatedPia.updatedAt)}.`,
      show: true,
    });

    // if first time save, update stale state to the latest state, else keep the previous state for comparisons
    if (isFirstSave) {
      setStalePia(updatedPia);
      setIsFirstSave(false);
    } else {
      setStalePia(pia);
    }

    setPia(updatedPia);

    // reset flags after successful save
    setIsAutoSaveFailedPopupShown(false);
    setIsConflict(false);

    return updatedPia;
  };

  const handleModalClose = async (event: any) => {
    setShowPiaModal(false);
    // call backend patch endpoint to save the change
    event.preventDefault();
    const buttonValue = event.target.value;
    try {
      if (buttonValue === 'submit') {
        const updatedPia = await upsertAndUpdatePia({
          status: PiaStatuses.MPO_REVIEW,
        });
        if (pia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_NEXT_STEPS_EDIT, {
              id: pia.id,
              title: pia.title,
            }),
          );
        }
      } else if (buttonValue === 'cancel') {
        if (pia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: pia.id,
              title: pia.title,
            }),
          );
        } else {
          navigate(-1);
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
            title: updatedPia.title,
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
    // By default set the status to Incomplete
    const piaStatus = pia?.status ? pia.status : PiaStatuses.INCOMPLETE;
    const modalType =
      piaStatus === PiaStatuses.EDIT_IN_PROGRESS ? 'edit' : 'save';
    handleShowModal(modalType);
  };

  const handleStatusChange = (piaStatus: any) => {
    switch (piaStatus) {
      case 'incomplete':
        piaStateChangeHandler('INCOMPLETE', 'status');
        break;
      case 'edit-in-progress':
        piaStateChangeHandler('EDIT_IN_PROGRESS', 'status');
        break;
      case 'mpo-review':
        piaStateChangeHandler('MPO_REVIEW', 'status');
        break;
      case 'pct-review':
        piaStateChangeHandler('PCT_REVIEW', 'status');
        break;
      default:
        break;
    }
  };

  //
  // Form Submission Handler
  //
  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleShowModal('submit');
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
    }
    if (!pia?.ministry && !invalid) {
      invalid = true;
      formId = 'ministry-select';
    }
    if (!pia?.branch && !invalid) {
      invalid = true;
      formId = 'branch';
    }
    if (!pia?.drafterName && !invalid) {
      invalid = true;
      formId = 'drafterName';
    }
    if (!pia?.drafterTitle && !invalid) {
      invalid = true;
      formId = 'drafterTitle';
    }
    if ((!pia?.drafterEmail || pia.drafterEmail === undefined) && !invalid) {
      invalid = true;
      formId = 'drafterEmail';
    }
    if (!pia?.leadName && !invalid) {
      invalid = true;
      formId = 'leadName';
    }
    if (!pia?.leadTitle && !invalid) {
      invalid = true;
      formId = 'leadTitle';
    }
    if (!pia?.leadEmail && !invalid) {
      invalid = true;
      formId = 'leadEmail';
    }
    if (!pia?.mpoName && !invalid) {
      invalid = true;
      formId = 'mpoName';
    }
    if (!pia?.mpoEmail && !invalid) {
      invalid = true;
      formId = 'mpoEmail';
    }
    if (!pia?.initiativeDescription && !invalid) {
      invalid = true;
      formId = 'initiativeDescription';
    }
    if (!pia?.initiativeScope && !invalid) {
      invalid = true;
      formId = 'initiativeScope';
    }
    if (!pia?.dataElementsInvolved && !invalid) {
      invalid = true;
      formId = 'dataElementsInvolved';
    }
    if (pia?.hasAddedPiToDataElements === false) {
      if (!pia?.riskMitigation && !invalid) {
        invalid = true;
        formId = 'riskMitigation';
      }
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
      handleStatusChange(PiaStatuses.MPO_REVIEW);
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
  const handleBack = () => {
    navigate(-1);
  };
  const handleNext = () => {
    const tabName = pathname.split('/')[3];

    switch (tabName) {
      case 'intake':
        navigate(pathname.replace('intake', 'collectionUseAndDisclosure'));
        break;
      case 'collectionUseAndDisclosure':
        navigate(
          pathname.replace(
            'collectionUseAndDisclosure',
            'storingPersonalInformation',
          ),
        );
        break;
      case 'accuracyCorrectionAndRetention':
        navigate(
          pathname.replace(
            'accuracyCorrectionAndRetention',
            'agreementsAndInformationBanks',
          ),
        );
        break;
      case 'securityPersonalInformation':
        navigate(
          pathname.replace(
            'securityPersonalInformation',
            'accuracyCorrectionAndRetention',
          ),
        );
        break;
      case 'agreementsAndInformationBanks':
        navigate(
          pathname.replace('agreementsAndInformationBanks', 'additionalRisks'),
        );
        break;
      case 'storingPersonalInformation':
        navigate(
          pathname.replace(
            'storingPersonalInformation',
            'securityPersonalInformation',
          ),
        );
        break;
      case 'additionalRisks':
        break;
      default:
        break;
    }
  };
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
        onSaveChangeClick={handleSaveChanges}
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
            <PIASideNav pia={pia} isNewForm={!id}></PIASideNav>
          </section>
          <section className="form__container ms-md-auto content__container">
            {/* Only show the nested routes if it is a NEW Form (no ID) OR if existing form with PIA data is fetched */}
            {!id || initialPiaStateFetched ? (
              <Outlet context={[pia, piaStateChangeHandler]} />
            ) : (
              <div className="w-100">
                <div className="d-flex justify-content-center">
                  <Spinner />
                </div>
              </div>
            )}
            <div>
              <div className="horizontal-divider"></div>
              <div className="form-buttons">
                <button
                  className="bcgovbtn bcgovbtn__secondary btn-back"
                  onClick={handleBack}
                >
                  Back
                </button>
                {!pathname.includes('additionalRisks') && (
                  <button
                    type="submit"
                    className="bcgovbtn  bcgovbtn__secondary btn-next"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
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
