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

const PIAIntakeFormPage = () => {
  const navigate = useNavigate();

  const [initiativeDescription, setInitiativeDescription] =
    useState<string>('');
  const [ministry, setMinistry] = useState('');
  const [initiativeDataElements, setInitiativeDataElements] = useState('');
  const [piOption, setPiOption] = useState('Yes');
  const [initiativeRiskReduction, setInitiativeRiskReduction] =
    useState<string>('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInitiativeDescriptionChange = (newMessage: any) => {
    setInitiativeDescription(newMessage);
  };
  
  const handleInitiativeDataElementsChange = (newMessage: any) => {
    setInitiativeDataElements(newMessage);
  };

  const handleMinistryChange = (newMinistry: any) => {
    setMinistry(newMinistry);
  };

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPiOption(event.target.value);
  };
  
  const handleInitiativeRiskReductionChange = (newMessage: any) => {
    setInitiativeRiskReduction(newMessage);
  };
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const requestBody: IPIAIntake = {
      initiativeDescription: initiativeDescription,
      ministry: ministry,
      initiativeDataElements: initiativeDataElements,
      piOption: piOption,
      initiativeRiskReduction: initiativeRiskReduction,
    };
    try {
      const res = await HttpRequest.post<IPPQResult>(
        API_ROUTES.PIA_INTAKE_FORM_SUBMISSION,
        requestBody,
        {},
        {},
        true,
      );

      navigate(routes.PIA_RESULTS, {
        state: { result: res },
      });
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bcgovPageContainer background background__form">
      <section className="ppq-form-section form__container">
        <form>
          <div className="form__header">
            <h1>{Messages.PiaIntakeHeader.H1Text.en}</h1>
            <p>{Messages.PiaIntakeHeader.Subheading.en}</p>
          </div>
          <section className="form__section">
            <h2>{Messages.GeneralInfoSection.H2Text.en}</h2>
            <div className="row">
              <InputText label="Title" />
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
                <InputText label="Branch" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputText label="Your name" />
              </div>
              <div className="col">
                <InputText label="Your email" type="email" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputText label="Your title" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputText label="Initiative lead name" />
              </div>
              <div className="col">
                <InputText label="Initiative lead email" type="email" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputText label="Initiative lead title" />
              </div>
            </div>
            <div className="row form__row--flex-end">
              <div className="col">
                <InputText 
                  label="Ministry Privacy Officer"
                  helperText={Messages.GeneralInfoSection.MPOHelperText.en}
                  linkText={Messages.GeneralInfoSection.MPOLinkText.en}
                  linkHref={Messages.GeneralInfoSection.MPOLinkHref}
                  icon={true}
                />
              </div>
              <div className="col">
                <InputText label="MPO email" type="email" />
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
              value={initiativeDescription}
              onChange={handleInitiativeDescriptionChange}
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
              value={initiativeDataElements}
              onChange={handleInitiativeDataElementsChange}
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
            {PIOptions.map((option, index) => {
              return PIOptions[0] === option ? (
                <label className="form__input-label input-label-row">
                  <input
                    key={index}
                    type="radio"
                    name="pi-options-radio"
                    value={option}
                    onChange={handlePIOptionChange}
                    defaultChecked
                  />
                  {option}
                </label>
              ) : (
                <label className="form__input-label input-label-row">
                  <input
                    key={index}
                    type="radio"
                    name="pi-options-radio"
                    value={option}
                    onChange={handlePIOptionChange}
                  />
                  {option}
                </label>
              );
            })}
          </section>
          {piOption === 'No' && (
            <section className="form__section">
              <h2 className="form__h2">
                {Messages.InitiativeRiskReductionSection.H2Text.en}
              </h2>
              <p className="form__helper-text">
                {Messages.InitiativeRiskReductionSection.HelperText.en}
              </p>
              <MDEditor
                preview="edit"
                value={initiativeRiskReduction}
                onChange={handleInitiativeRiskReductionChange}
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

