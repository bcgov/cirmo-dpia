import Dropdown from '../../components/common/Dropdown';
import InputText from '../../components/common/InputText/InputText';
import { MinistryList, PIOptions, PiaStatuses } from '../../constant/constant';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Alert from '../../components/common/Alert';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IPIAIntake,
  IPIAIntakeResponse,
} from '../../types/interfaces/pia-intake.interface';
import { routes } from '../../constant/routes';
import Modal from '../../components/common/Modal';
import { shallowEqual } from '../../utils/object-comparison.util';
import { SupportedAlertTypes } from '../../components/common/Alert/interfaces';
import { getShortTime } from '../../utils/date';
import PIASubHeader from '../../components/public/PIASubHeader';
import PIASideNav from '../../components/public/PIASideNav';

export interface ILastSaveAlterInfo {
  message: string;
  type: SupportedAlertTypes;
  show: boolean;
}

const PIAIntakeFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const emptyState: IPIAIntake = {
    hasAddedPiToDataElements: true,
    status: PiaStatuses.INCOMPLETE,
  };

  const [stalePia, setStalePia] = useState<IPIAIntake>(emptyState);
  const [pia, setPia] = useState<IPIAIntake>(emptyState);

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

  const piaStateChangeHandler = (value: any, key: keyof IPIAIntake) => {
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
      await HttpRequest.get<IPIAIntakeResponse>(
        API_ROUTES.GET_PIA_INTAKE.replace(':id', `${piaId}`),
      )
    ).data;
    setStalePia(pia);
    setPia(updatedPia);

    return updatedPia;
  };

  const hasFormChanged = useCallback(() => {
    return !shallowEqual(stalePia, pia, ['updatedAt', 'saveId']);
  }, [pia, stalePia]);

  const upsertAndUpdatePia = async (changes: Partial<IPIAIntake> = {}) => {
    const hasExplicitChanges = Object.keys(changes).length > 0;

    if (!hasExplicitChanges && !hasFormChanged()) {
      // only expected fields have changes; no need call update
      return pia;
    }

    let updatedPia: IPIAIntake;

    if (pia?.id) {
      updatedPia = await HttpRequest.patch<IPIAIntake>(
        API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${pia.id}`),
        { ...pia, ...changes },
      );
    } else {
      updatedPia = await HttpRequest.post<IPIAIntake>(API_ROUTES.PIA_INTAKE, {
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
        navigate(routes.PIA_INTAKE_RESULT, {
          state: { result: updatedPia },
        });
      } else if (buttonValue === 'cancel') {
        if (pia?.id) {
          navigate(`/pia/intake/${pia.id}/${pia.title}`);
        } else {
          navigate(-1);
        }
      } else if (buttonValue === 'conflict') {
        // noop
      } else if (buttonValue === 'autoSaveFailed') {
        // noop
      } else {
        const updatedPia = await upsertAndUpdatePia();
        navigate(`/pia/intake/${updatedPia?.id}/${updatedPia?.title}`);
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

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.target.value === 'Yes'
      ? piaStateChangeHandler(true, 'hasAddedPiToDataElements')
      : event.target.value === "I'm not sure"
      ? piaStateChangeHandler(null, 'hasAddedPiToDataElements')
      : piaStateChangeHandler(false, 'hasAddedPiToDataElements');
  };

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
        <div className="component__container">
          <PIASideNav
            personal_information={Boolean(pia?.hasAddedPiToDataElements)}
          ></PIASideNav>
          <section className="ppq-form-section form__container ms-md-auto right__container">
            <form
              className="container__padding-inline needs-validation"
              onSubmit={(e) => {
                handleStatusChange(PiaStatuses.MPO_REVIEW);
                handleSubmit(e);
              }}
            >
              <section className="form__section">
                <h2>{Messages.GeneralInfoSection.H2Text.en}</h2>
                <div className="row">
                  <InputText
                    label="Title"
                    value={pia?.title}
                    onChange={(e) =>
                      piaStateChangeHandler(e.target.value, 'title')
                    }
                    required={true}
                  />
                </div>
                <div className="row">
                  <Dropdown
                    id="ministry-select"
                    value={pia?.ministry || ''}
                    label="Ministry"
                    optionalClass="col-md-6"
                    options={MinistryList}
                    changeHandler={(e) =>
                      piaStateChangeHandler(e.target.value, 'ministry')
                    }
                    required={true}
                  />
                  <div className="col">
                    <InputText
                      label="Branch"
                      value={pia?.branch}
                      required={true}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'branch')
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <InputText
                      label="Your name"
                      id="drafterName"
                      value={pia?.drafterName}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'drafterName')
                      }
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <InputText
                      label="Your email"
                      id="drafterEmail"
                      value={pia?.drafterEmail}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'drafterEmail')
                      }
                      required={true}
                      type="email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <InputText
                      label="Your title"
                      id="drafterTitle"
                      value={pia?.drafterTitle}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'drafterTitle')
                      }
                      required={true}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <InputText
                      label="Initiative lead name"
                      id="leadName"
                      value={pia?.leadName}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'leadName')
                      }
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <InputText
                      label="Initiative lead email"
                      id="leadEmail"
                      value={pia?.leadEmail}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'leadEmail')
                      }
                      required={true}
                      type="email"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <InputText
                      label="Initiative lead title"
                      id="leadTitle"
                      value={pia?.leadTitle}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'leadTitle')
                      }
                      required={true}
                    />
                  </div>
                </div>
                <div className="row form__row--flex-end">
                  <div className="col">
                    <InputText
                      label="Ministry Privacy Officer"
                      helperText={Messages.GeneralInfoSection.MPOHelperText.en}
                      linkText={Messages.GeneralInfoSection.MPOLinkText.en}
                      linkHref={Messages.GeneralInfoSection.MPOLinkHref}
                      hasIcon={true}
                      id="mpoName"
                      value={pia?.mpoName}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'mpoName')
                      }
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <InputText
                      label="MPO email"
                      id="mpoEmail"
                      value={pia?.mpoEmail}
                      onChange={(e) =>
                        piaStateChangeHandler(e.target.value, 'mpoEmail')
                      }
                      required={true}
                      type="email"
                    />
                  </div>
                </div>
              </section>
              <section className="form__section">
                <h2 className="form__h2">
                  {Messages.InitiativeDescriptionSection.H2Text.en}
                </h2>
                <p className="form__helper-text">
                  {Messages.InitiativeDescriptionSection.HelperText.en}
                </p>
                <div className="richText" id="initiativeDescription">
                  <MDEditor
                    preview="edit"
                    value={pia?.initiativeDescription}
                    onChange={(value) =>
                      piaStateChangeHandler(value, 'initiativeDescription')
                    }
                  />
                </div>
              </section>
              <section className="form__section">
                <h2 className="form__h2">
                  {Messages.InitiativeScopeSection.H2Text.en}
                </h2>
                <p className="form__helper-text">
                  {Messages.InitiativeScopeSection.HelperText.en}
                </p>
                <div className="richText" id="initiativeScope">
                  <MDEditor
                    preview="edit"
                    value={pia?.initiativeScope}
                    defaultTabEnable={true}
                    onChange={(value) =>
                      piaStateChangeHandler(value, 'initiativeScope')
                    }
                  />
                </div>
              </section>
              <section className="form__section">
                <h2 className="form__h2">
                  {Messages.InitiativeDataElementsSection.H2Text.en}
                </h2>
                <p className="form__helper-text">
                  {Messages.InitiativeDataElementsSection.HelperText.en}
                </p>
                <div className="richText" id="dataElementsInvolved">
                  <MDEditor
                    preview="edit"
                    value={pia?.dataElementsInvolved}
                    defaultTabEnable={true}
                    onChange={(value) =>
                      piaStateChangeHandler(value, 'dataElementsInvolved')
                    }
                  />
                </div>
              </section>
              <section className="form__section">
                <h2 className="form__h2">
                  {Messages.InitiativePISection.H2Text.en}
                </h2>
                <p className="form__helper-text">
                  <a
                    href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/personal-information?keyword=personal&keyword=information"
                    rel="noreferrer external"
                    target="_blank"
                  >
                    {Messages.InitiativePISection.LinkText.en}
                  </a>
                  {Messages.InitiativePISection.HelperText.en}
                </p>
                {PIOptions.map((option, index) => (
                  <label
                    key={index}
                    className="form__input-label input-label-row"
                  >
                    <input
                      type="radio"
                      name="pi-options-radio"
                      value={option}
                      onChange={handlePIOptionChange}
                      defaultChecked={PIOptions[0] === option}
                    />
                    {option}
                  </label>
                ))}
              </section>
              {pia?.hasAddedPiToDataElements === false && (
                <section className="form__section">
                  <h2 className="form__h2">
                    {Messages.InitiativeRiskReductionSection.H2Text.en}
                  </h2>
                  <p className="form__helper-text">
                    {Messages.InitiativeRiskReductionSection.HelperText.en}
                  </p>
                  <div className="richText" id="riskMitigation">
                    <MDEditor
                      preview="edit"
                      value={pia?.riskMitigation}
                      defaultTabEnable={true}
                      onChange={(value) =>
                        piaStateChangeHandler(value, 'riskMitigation')
                      }
                    />
                  </div>
                </section>
              )}
              {message && (
                <Alert
                  type="danger"
                  message={message}
                  className="mt-4"
                  onClose={() => setMessage('')}
                />
              )}
            </form>
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

export default PIAIntakeFormPage;
