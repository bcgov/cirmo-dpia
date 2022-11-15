import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import MDEditor from '@uiw/react-md-editor';
import 'react-datepicker/dist/react-datepicker.css';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  OtherFactor,
  MinistryList,
  PIATypes,
  ReviewTypes,
  startDateOptions,
} from '../../constant/constant';
import Messages from './messages';

import Checkbox from '../../components/common/Checkbox';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { IPPQForm } from '../../ts/interfaces/ppq-form.interface';
import { routes } from '../../constant/routes';
import { IPPQResult } from '../../ts/interfaces/ppq-result.interface';
import InputText from '../../components/common/InputText/InputText';
import CustomInputDate from '../../components/common/CustomInputDate';
import Alert from '../../components/common/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PiaTypesEnum } from '../../ts/enums/pia-types.enum';
import { DelegatedReviewTypesEnum } from '../../ts/enums/delegated-review-types.enum';

const PPQFormPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ministry, setMinistry] = useState('');
  const [message, setMessage] = useState('');
  const [piaType, setPiaType] = useState<PiaTypesEnum | string>(
    PIATypes[0].value,
  );
  const [isDelegatedReview, setIsDelegatedReview] = useState(false);
  const [delegatedReviewType, setDelegatedReviewType] = useState<
    DelegatedReviewTypesEnum | string | null
  >();
  const [containsStartDate, setContainsStartDate] = useState('Yes');
  const [startDate, setStartDate] = useState(null);
  const [description, setDescription] = useState('');
  const [checkedPIItems, setCheckedPIItems] = useState({
    hasSensitivePersonalInformation: false,
    hasSharingOfPersonalInformation: false,
    hasProgramAgreement: false,
    hasOthersAccessToPersonalInformation: false,
    hasCloudTechnology: false,
    hasPotentialPublicInterest: false,
    hasDisclosureOutsideOfCanada: false,
    hasBcServicesCardOnboarding: false,
    hasAiOrMl: false,
    hasPartnershipNonMinistry: false,
  });

  const chooseStartDate = (event: any) => {
    setContainsStartDate(event.target.value);
  };

  const handleBackClick = () => {
    // 👇️ replace set to true

    // TODO replace hardcode value to const value in a central file
    navigate(routes.PPQ_LANDING_PAGE, { replace: true });
  };

  const handlePIItemsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedPIItems({
      ...checkedPIItems,
      [event.target.value]: event.target.checked,
    });
  };

  const handlePiaTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPiaType(event.target.value);

    if (event.target.value === PiaTypesEnum.DELEGATE_REVIEW) {
      setIsDelegatedReview(true);
    } else {
      setIsDelegatedReview(false);
    }
  };

  const handleReviewTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelegatedReviewType(event.target.value);
  };

  const handleDescriptionChange = (newMessage: any) => {
    setDescription(newMessage);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const requestBody: IPPQForm = {
      title: title,
      ministry: ministry,
      description: description,
      proposedStartDate: startDate,
      piaType: piaType,
      delegatedReviewType: delegatedReviewType,
      ...checkedPIItems,
    };
    try {
      const res = await HttpRequest.post<IPPQResult>(
        API_ROUTES.PPQ_FORM_SUBMISSION,
        requestBody,
        {},
        {},
        true,
      );

      navigate(routes.PPQ_CONNECT_WITH_MPO, {
        state: { result: res },
      });
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="background results-wrapper">
      <section className="ppq-form-section">
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-header">
              <h1>PIA Pathways Questionnaire</h1>
              <p>{Messages.FillPpqDescriptionText.en}</p>
            </div>
            <div className="row">
              <InputText
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>
                  <p className="select-label">Ministry</p>
                  <div className="dropdown">
                    <select
                      key="ministry"
                      className="form-control"
                      value={ministry}
                      onChange={(e) => setMinistry(e.target.value)}
                      required
                    >
                      <option key="selectMinistry" disabled={true} value="">
                        Select one
                      </option>
                      {MinistryList.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon
                      className="dropdown-icon"
                      icon={faChevronDown}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <h2>{Messages.InitiativeFactorsHeading.en}</h2>
              <div className="other-factors-container">
                {OtherFactor.map((factor, index) => {
                  return (
                    <Checkbox
                      key={index}
                      checked={false}
                      value={factor.value}
                      label={factor.label}
                      tooltip={factor.tooltip}
                      tooltipText={factor.tooltipText}
                      onChange={handlePIItemsChange}
                    />
                  );
                })}
              </div>
            </div>
            <div className="form-group">
              <h2>{Messages.PiaTypeHeading.en}</h2>
              <div className="pia-type">
                {PIATypes.map((option, index) => {
                  return PIATypes[0] === option ? (
                    <label className="input-label input-label-row">
                      <input
                        key={index}
                        type="radio"
                        name={option.name}
                        value={option.value}
                        onChange={handlePiaTypeChange}
                        defaultChecked
                      />
                      {option.label}
                    </label>
                  ) : (
                    <label className="input-label input-label-row">
                      <input
                        key={index}
                        type="radio"
                        name={option.name}
                        value={option.value}
                        onChange={handlePiaTypeChange}
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </div>
            {isDelegatedReview && (
              <div className="form-group">
                <h2>{Messages.DelegatedTypeHeading.en}</h2>
                <div className="review-type">
                  {ReviewTypes.map((option, index) => {
                    return ReviewTypes[0] === option ? (
                      <label className="input-label input-label-row">
                        <input
                          key={index}
                          type="radio"
                          name={option.name}
                          value={option.value}
                          onChange={handleReviewTypeChange}
                          defaultChecked
                        />
                        {option.label}
                      </label>
                    ) : (
                      <label className="input-label input-label-row">
                        <input
                          key={index}
                          type="radio"
                          name={option.name}
                          value={option.value}
                          onChange={handleReviewTypeChange}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="form-group">
              <h2>
                {!isDelegatedReview
                  ? Messages.StartDateHeading.en2
                  : Messages.StartDateHeading.en}
              </h2>
              <div className="start-date-container">
                <div className="form-group col-md-6">
                  <div>
                    {startDateOptions.map((option, index) => {
                      return startDateOptions[0] === option ? (
                        <div key={index} onChange={chooseStartDate}>
                          <label className="input-label">
                            <input
                              key={index}
                              type="radio"
                              name="start-initiative-radio"
                              value={option}
                              defaultChecked
                            />
                            {option}
                          </label>
                        </div>
                      ) : (
                        <div key={index} onChange={chooseStartDate}>
                          <label className="input-label">
                            <input
                              key={index}
                              type="radio"
                              name="start-initiative-radio"
                              value={option}
                            />
                            {option}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {containsStartDate === 'Yes' && (
                  <div className="form-group">
                    <label id="start-date-label">
                      Proposed go-live or start date
                    </label>
                    <DatePicker
                      key="startDate"
                      placeholderText={'yyyy-mm-dd'}
                      dateFormat="yyyy/MM/dd"
                      selected={startDate === null ? null : startDate}
                      onChange={(date: any) => setStartDate(date)}
                      customInput={<CustomInputDate />}
                      required
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <h2>
                {!isDelegatedReview
                  ? Messages.AdditionalInfoHeading.en2
                  : Messages.AdditionalInfoHeading.en}
              </h2>
              <MDEditor
                preview="edit"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="horizontal-divider"></div>
            <div className="form-buttons">
              <button
                className="btn-secondary btn-back"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button type="submit" className="btn-primary btn-next">
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
        </div>
      </section>
    </div>
  );
};

export default PPQFormPage;
