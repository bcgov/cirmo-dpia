import Dropdown from '../../components/common/Dropdown';
import InputText from '../../components/common/InputText/InputText';
import { MinistryList, PIOptions, PiaStatuses } from '../../constant/constant';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useEffect, useState } from 'react';
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

interface ILastSaveAlterInfo {
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
  const handleShowModal = (modalType: string) => {
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
        setPiaModalTitleText(Messages.Modal.Conflict.TitleText.en);
        setPiaModalParagraph(
          Messages.Modal.Conflict.ParagraphText.en.replace(
            '${time}',
            getShortTime(pia?.updatedAt),
          ),
        );
        setPiaModalButtonValue('conflict');
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

  const upsertAndUpdatePia = async (changes: Partial<IPIAIntake> = {}) => {
    const hasExplicitChanges = Object.keys(changes).length > 0;

    if (
      !hasExplicitChanges &&
      shallowEqual(stalePia, pia, ['updatedAt', 'saveId'])
    ) {
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

  const alertUserLeave = (e: any) => {
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
  };

  const handleBackClick = () => {
    handleShowModal('cancel');
  };

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.target.value === 'Yes'
      ? piaStateChangeHandler(true, 'hasAddedPiToDataElements')
      : event.target.value === "I'm not sure"
      ? piaStateChangeHandler(null, 'hasAddedPiToDataElements')
      : piaStateChangeHandler(false, 'hasAddedPiToDataElements');
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
        if (e?.cause?.message === '409') {
          setIsConflict(true);
          handleShowModal('conflict');
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
  }, []);

  return (
    <div className="bcgovPageContainer background background__form">
      <section className="ppq-form-section form__container">
        <form
          className="container__padding-inline"
          onSubmit={(e) => {
            handleStatusChange(PiaStatuses.MPO_REVIEW);
            handleSubmit(e);
          }}
        >
          <div className="row justify-content-between">
            <div className="col col-md-6">
              <h1>{Messages.PiaIntakeHeader.H1Text.en}</h1>
            </div>
            {lastSaveAlertInfo.show && (
              <div className="col col-md-4">
                <Alert
                  type={lastSaveAlertInfo.type}
                  message={lastSaveAlertInfo.message}
                  showInitialIcon={true}
                  showCloseIcon={false}
                />
              </div>
            )}
          </div>
          <section className="form__section">
            <h2>{Messages.GeneralInfoSection.H2Text.en}</h2>
            <div className="row">
              <InputText
                label="Title"
                value={pia?.title}
                onChange={(e) => piaStateChangeHandler(e.target.value, 'title')}
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
            <MDEditor
              preview="edit"
              value={pia?.initiativeDescription}
              onChange={(value) =>
                piaStateChangeHandler(value, 'initiativeDescription')
              }
            />
          </section>
          <section className="form__section">
            <h2 className="form__h2">
              {Messages.InitiativeScopeSection.H2Text.en}
            </h2>
            <p className="form__helper-text">
              {Messages.InitiativeScopeSection.HelperText.en}
            </p>
            <MDEditor
              preview="edit"
              value={pia?.initiativeScope}
              onChange={(value) =>
                piaStateChangeHandler(value, 'initiativeScope')
              }
            />
          </section>
          <section className="form__section">
            <h2 className="form__h2">
              {Messages.InitiativeDataElementsSection.H2Text.en}
            </h2>
            <p className="form__helper-text">
              {Messages.InitiativeDataElementsSection.HelperText.en}
            </p>
            <MDEditor
              preview="edit"
              value={pia?.dataElementsInvolved}
              onChange={(value) =>
                piaStateChangeHandler(value, 'dataElementsInvolved')
              }
            />
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
              <label key={index} className="form__input-label input-label-row">
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
              <MDEditor
                preview="edit"
                value={pia?.riskMitigation}
                onChange={(value) =>
                  piaStateChangeHandler(value, 'riskMitigation')
                }
              />
            </section>
          )}
          <div className="horizontal-divider"></div>
          <div className="form__button-row">
            <button
              className="bcgovbtn bcgovbtn__secondary btn-back"
              onClick={handleBackClick}
            >
              Back
            </button>
            <div className="form__button-group">
              <button
                type="button"
                className="bcgovbtn bcgovbtn__secondary"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
              <button
                type="submit"
                className="bcgovbtn bcgovbtn__primary btn-next"
              >
                Submit
              </button>
            </div>
          </div>
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
  );
};

export default PIAIntakeFormPage;
