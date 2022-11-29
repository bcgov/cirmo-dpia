import Dropdown from '../../components/common/Dropdown';
import InputText from '../../components/common/InputText/InputText';
import { MinistryList, PIOptions } from '../../constant/constant';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useState } from 'react';
import Alert from '../../components/common/Alert';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { IPIAIntake } from '../../types/interfaces/pia-intake.interface';
import { IPIAResult } from '../../types/interfaces/pia-result.interface';
import { routes } from '../../constant/routes';

const PIAIntakeFormPage = () => {
  const navigate = useNavigate();

  //
  // Local State
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
  >(false);
  const [riskMitigation, setRiskMitigation] = useState<string>();

  //
  // Event Handlers
  //
  const handleBackClick = () => {
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
    };
    try {
      const res = await HttpRequest.post<IPIAResult>(
        API_ROUTES.PIA_INTAKE_FORM_SUBMISSION,
        requestBody,
        {},
        {},
        true,
      );

      navigate(routes.PIA_INTAKE_RESULT, {
        state: { result: res },
      });
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bcgovPageContainer background background__form">
      <section className="ppq-form-section form__container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form__header">
            <h1>{Messages.PiaIntakeHeader.H1Text.en}</h1>
            <p>{Messages.PiaIntakeHeader.Subheading.en}</p>
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
                  defaultChecked={PIOptions[1] === option}
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
            <button
              type="submit"
              className="bcgovbtn bcgovbtn__primary btn-next"
            >
              Submit
            </button>
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
    </div>
  );
};

export default PIAIntakeFormPage;
