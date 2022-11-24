import Dropdown from '../../components/common/Dropdown';
import InputText from '../../components/common/InputText/InputText';
import { MinistryList } from '../../constant/constant';
import Messages from './messages';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import Alert from '../../components/common/Alert';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { useNavigate } from 'react-router-dom';

const PIAIntakeFormPage = () => {
  const navigate = useNavigate();

  const [initiativeDescription, setInitiativeDescription] =
    useState<string>('');
  const [ministry, setMinistry] = useState('');
  const [message, setMessage] = useState('');
  
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInitiativeDescriptionChange = (newMessage: any) => {
    setInitiativeDescription(newMessage);
  };

  const handleMinistryChange = (newMinistry: any) => {
    setMinistry(newMinistry);
  };

  return (
    <div className="bcgovPageContainer background background__form">
      <section className="ppq-form-section form__container">
        <form>
          <div className="form-header">
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
            <div className="row">
              <div className="col">
                <InputText label="Ministry Privacy Officer" />
              </div>
              <div className="col">
                <InputText label="MPO email" type="email" />
              </div>
            </div>
          </section>
          <section className="form__section">
            <h2 className="form__h2">{Messages.InitiativeDescriptionSection.H2Text.en}</h2>
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
            <h2 className="form__h2">{Messages.InitiativeScopeSection.H2Text.en}</h2>
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
            <h2 className="form__h2">{Messages.InitiativeDataElementsSection.H2Text.en}</h2>
            <p className="form__helper-text">
              {Messages.InitiativeDataElementsSection.HelperText.en}
            </p>
            <MDEditor
              preview="edit"
              value={initiativeDescription}
              onChange={handleInitiativeDescriptionChange}
            />
          </section>
          <div className="horizontal-divider"></div>
          <div className="form-buttons">
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

