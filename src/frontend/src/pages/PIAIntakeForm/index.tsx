import Dropdown from '../../components/common/Dropdown';
import InputText from '../../components/common/InputText/InputText';
import { MinistryList, PIOptions } from '../../constant/constant';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useEffect, useState } from 'react';
import Alert from '../../components/common/Alert';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { IPIAIntake } from '../../types/interfaces/pia-intake.interface';
import { IPIAResult } from '../../types/interfaces/pia-result.interface';
import { routes } from '../../constant/routes';
import Modal from '../../components/common/Modal';

const PIAIntakeFormPage = () => {
  const navigate = useNavigate();

  //
  // Form State
  //
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [initiativeDescription, setInitiativeDescription] =
    useState<string>('');
  const [ministry, setMinistry] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
  const [drafterName, setDrafterName] = useState<string>('');
  const [drafterEmail, setDrafterEmail] = useState<string>('');
  const [drafterTitle, setDrafterTitle] = useState<string>('');
  const [leadName, setLeadName] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadTitle, setLeadTitle] = useState<string>('');
  const [mpoName, setMpoName] = useState<string>('');
  const [mpoEmail, setMpoEmail] = useState<string>('');
  const [initiativeScope, setInitiativeScope] = useState<string>('');
  const [dataElementsInvolved, setDataElementsInvolved] = useState<string>('');
  const [hasAddedPiToDataElements, setHasAddedPiToDataElements] = useState<
    boolean | null
  >(true);
  const [riskMitigation, setRiskMitigation] = useState<string>();
  const [status, setStatus] = useState<string>('INCOMPLETE');

  //
  // Modal State
  //
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalConfirmLabel, setModalConfirmLabel] = useState<string>('');
  const [modalCancelLabel, setModalCancelLabel] = useState<string>('');
  const [modalTitleText, setModalTitleText] = useState<string>('');
  const [modalParagraph, setModalParagraph] = useState<string>('');

  //
  // Event Handlers
  //
  const handleShowModal = (modalType: string) => {
    switch (modalType) {
      case 'cancel':
        setModalConfirmLabel(Messages.Modal.Cancel.ConfirmLabel.en);
        setModalCancelLabel(Messages.Modal.Cancel.CancelLabel.en);
        setModalTitleText(Messages.Modal.Cancel.TitleText.en);
        setModalParagraph(Messages.Modal.Cancel.ParagraphText.en);
        break;
      case 'save':
        setModalConfirmLabel(Messages.Modal.Save.ConfirmLabel.en);
        setModalCancelLabel(Messages.Modal.Save.CancelLabel.en);
        setModalTitleText(Messages.Modal.Save.TitleText.en);
        setModalParagraph(Messages.Modal.Save.ParagraphText.en);
        break;
      default:
        break;
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/pia-list');
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    handleShowModal('save');
  };

  const alertUserLeave = (e: any) => {
    e.preventDefault();
    e.defaultPrevented = true;
  };

  const handleBackClick = () => {
    handleShowModal('cancel');
    navigate(-1);
  };

  const handleTitleChange = (newTitle: any) => {
    setTitle(newTitle.target.value);
  };

  const handleInitiativeDescriptionChange = (newDescription: any) => {
    setInitiativeDescription(newDescription);
  };

  const handleMinistryChange = (newMinistry: any) => {
    setMinistry(newMinistry.target.value);
  };

  const handleBranchChange = (newBranch: any) => {
    setBranch(newBranch.target.value);
  };

  const handleDrafterNameChange = (newDrafterName: any) => {
    setDrafterName(newDrafterName.target.value);
  };

  const handleDrafterEmailChange = (newDrafterEmail: any) => {
    setDrafterEmail(newDrafterEmail.target.value);
  };

  const handleDrafterTitleChange = (newDrafterTitle: any) => {
    setDrafterTitle(newDrafterTitle.target.value);
  };

  const handleLeadNameChange = (newLeadName: any) => {
    setLeadName(newLeadName.target.value);
  };

  const handleLeadEmailChange = (newLeadEmail: any) => {
    setLeadEmail(newLeadEmail.target.value);
  };

  const handleLeadTitleChange = (newLeadTitle: any) => {
    setLeadTitle(newLeadTitle.target.value);
  };

  const handleMpoNameChange = (newMpoName: any) => {
    setMpoName(newMpoName.target.value);
  };

  const handleMpoEmailChange = (newMpoEmail: any) => {
    setMpoEmail(newMpoEmail.target.value);
  };

  const handleInitiativeScopeChange = (newScope: any) => {
    setInitiativeScope(newScope);
  };

  const handleDataElementsInvolvedChange = (newDataElements: any) => {
    setDataElementsInvolved(newDataElements);
  };

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.target.value === 'Yes'
      ? setHasAddedPiToDataElements(true)
      : event.target.value === "I'm not sure"
      ? setHasAddedPiToDataElements(null)
      : setHasAddedPiToDataElements(false);
  };

  const handleRiskMitigationChange = (newRiskMitigation: any) => {
    setRiskMitigation(newRiskMitigation);
  };

  const handleStatusChange = (piaStatus: any) => {
    switch (piaStatus) {
      case 'incomplete':
        setStatus('INCOMPLETE');
        break;
      case 'edit-in-progress':
        setStatus('EDIT_IN_PROGRESS');
        break;
      case 'mpo-review':
        setStatus('MPO_REVIEW');
        break;
      case 'pct-review':
        setStatus('PCT_REVIEW');
        break;
      default:
        break;
    }
  };

  //
  // Form Submission Handler
  //
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const requestBody: IPIAIntake = {
      title: title,
      ministry: ministry,
      branch: branch,
      drafterName: drafterName,
      drafterEmail: drafterEmail,
      drafterTitle: drafterTitle,
      leadName: leadName,
      leadEmail: leadEmail,
      leadTitle: leadTitle,
      mpoName: mpoName,
      mpoEmail: mpoEmail,
      initiativeDescription: initiativeDescription,
      initiativeScope: initiativeScope,
      dataElementsInvolved: dataElementsInvolved,
      hasAddedPiToDataElements: hasAddedPiToDataElements,
      riskMitigation: riskMitigation,
      status: status,
    };
    try {
      const res = await HttpRequest.post<IPIAResult>(
        API_ROUTES.PIA_INTAKE,
        requestBody,
      );

      navigate(routes.PIA_INTAKE_RESULT, {
        state: { result: res },
      });
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', alertUserLeave);
    return () => {
      window.removeEventListener('beforeunload', alertUserLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bcgovPageContainer background background__form">
      <section className="ppq-form-section form__container">
        <form
          className="container__padding-inline"
          onSubmit={(e) => {
            handleStatusChange('mpo-review');
            handleSubmit(e);
          }}
        >
          <div className="form__header">
            <h1>{Messages.PiaIntakeHeader.H1Text.en}</h1>
          </div>
          <section className="form__section">
            <h2>{Messages.GeneralInfoSection.H2Text.en}</h2>
            <div className="row">
              <InputText
                label="Title"
                value={title}
                onChange={handleTitleChange}
                required={true}
              />
            </div>
            <div className="row">
              <Dropdown
                id="ministry-select"
                value={ministry}
                label="Ministry"
                optionalClass="col-md-6"
                options={MinistryList}
                changeHandler={handleMinistryChange}
                required={true}
              />
              <div className="col">
                <InputText
                  label="Branch"
                  value={branch}
                  onChange={handleBranchChange}
                  required={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputText
                  label="Your name"
                  value={drafterName}
                  onChange={handleDrafterNameChange}
                  required={true}
                />
              </div>
              <div className="col">
                <InputText
                  label="Your email"
                  value={drafterEmail}
                  onChange={handleDrafterEmailChange}
                  required={true}
                  type="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputText
                  label="Your title"
                  value={drafterTitle}
                  onChange={handleDrafterTitleChange}
                  required={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputText
                  label="Initiative lead name"
                  value={leadName}
                  onChange={handleLeadNameChange}
                  required={true}
                />
              </div>
              <div className="col">
                <InputText
                  label="Initiative lead email"
                  value={leadEmail}
                  onChange={handleLeadEmailChange}
                  required={true}
                  type="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputText
                  label="Initiative lead title"
                  value={leadTitle}
                  onChange={handleLeadTitleChange}
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
                  value={mpoName}
                  onChange={handleMpoNameChange}
                  required={true}
                />
              </div>
              <div className="col">
                <InputText
                  label="MPO email"
                  value={mpoEmail}
                  onChange={handleMpoEmailChange}
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
              value={initiativeDescription}
              onChange={handleInitiativeDescriptionChange}
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
              value={initiativeScope}
              onChange={handleInitiativeScopeChange}
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
              value={dataElementsInvolved}
              onChange={handleDataElementsInvolvedChange}
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
          {hasAddedPiToDataElements === false && (
            <section className="form__section">
              <h2 className="form__h2">
                {Messages.InitiativeRiskReductionSection.H2Text.en}
              </h2>
              <p className="form__helper-text">
                {Messages.InitiativeRiskReductionSection.HelperText.en}
              </p>
              <MDEditor
                preview="edit"
                value={riskMitigation}
                onChange={handleRiskMitigationChange}
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
        confirmLabel={modalConfirmLabel}
        cancelLabel={modalCancelLabel}
        titleText={modalTitleText}
        show={showModal}
        handleClose={handleModalClose}
        handleCancel={handleModalCancel}
      >
        <p className="modal-text">{modalParagraph}</p>
      </Modal>
    </div>
  );
};

export default PIAIntakeFormPage;
