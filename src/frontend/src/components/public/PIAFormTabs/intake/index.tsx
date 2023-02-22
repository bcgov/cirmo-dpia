import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { MinistryList, PIOptions } from '../../../../constant/constant';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import Dropdown from '../../../common/Dropdown';
import InputText from '../../../common/InputText/InputText';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { exportIntakeFromPia } from './helper/extract-intake-from-pia.helper';
import Messages from './helper/messages';
import { IPiaFormIntake } from './pia-form-intake.interface';

export const PIAFormIntake = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [intakeForm, setIntakeForm] = useState<IPiaFormIntake>(
    exportIntakeFromPia(pia),
  );

  const stateChangeHandler = (value: any, key: keyof IPiaFormIntake) => {
    setIntakeForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(value, key);
  };

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.target.value === 'Yes'
      ? stateChangeHandler(true, 'hasAddedPiToDataElements')
      : event.target.value === "I'm not sure"
      ? stateChangeHandler(null, 'hasAddedPiToDataElements')
      : stateChangeHandler(false, 'hasAddedPiToDataElements');
  };

  return (
    <>
      <form className="needs-validation">
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
          <h2>{Messages.GeneralInfoSection.H2Text.en}</h2>
          <div className="row">
            <InputText
              label="Title"
              value={intakeForm?.title}
              onChange={(e) => stateChangeHandler(e.target.value, 'title')}
              required={true}
            />
          </div>
          <div className="row">
            <Dropdown
              id="ministry-select"
              value={intakeForm?.ministry || ''}
              label="Ministry"
              optionalClass="col-md-6"
              options={MinistryList}
              changeHandler={(e) =>
                stateChangeHandler(e.target.value, 'ministry')
              }
              required={true}
            />
            <div className="col">
              <InputText
                label="Branch"
                value={intakeForm?.branch}
                required={true}
                onChange={(e) => stateChangeHandler(e.target.value, 'branch')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputText
                label="Your name"
                id="drafterName"
                value={intakeForm?.drafterName}
                onChange={(e) =>
                  stateChangeHandler(e.target.value, 'drafterName')
                }
                required={true}
              />
            </div>
            <div className="col">
              <InputText
                label="Your email"
                id="drafterEmail"
                value={intakeForm?.drafterEmail}
                onChange={(e) =>
                  stateChangeHandler(e.target.value, 'drafterEmail')
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
                value={intakeForm?.drafterTitle}
                onChange={(e) =>
                  stateChangeHandler(e.target.value, 'drafterTitle')
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
                value={intakeForm?.leadName}
                onChange={(e) => stateChangeHandler(e.target.value, 'leadName')}
                required={true}
              />
            </div>
            <div className="col">
              <InputText
                label="Initiative lead email"
                id="leadEmail"
                value={intakeForm?.leadEmail}
                onChange={(e) =>
                  stateChangeHandler(e.target.value, 'leadEmail')
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
                value={intakeForm?.leadTitle}
                onChange={(e) =>
                  stateChangeHandler(e.target.value, 'leadTitle')
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
                value={intakeForm?.mpoName}
                onChange={(e) => stateChangeHandler(e.target.value, 'mpoName')}
                required={true}
              />
            </div>
            <div className="col">
              <InputText
                label="MPO email"
                id="mpoEmail"
                value={intakeForm?.mpoEmail}
                onChange={(e) => stateChangeHandler(e.target.value, 'mpoEmail')}
                required={true}
                type="email"
              />
            </div>
          </div>
        </section>
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
          <h2 className="form__h2">
            {Messages.InitiativeDescriptionSection.H2Text.en}
          </h2>
          <p className="form__helper-text">
            {Messages.InitiativeDescriptionSection.HelperText.en}
          </p>
          <div className="richText" id="initiativeDescription">
            <MDEditor
              preview="edit"
              value={intakeForm?.initiativeDescription}
              onChange={(value) =>
                stateChangeHandler(value, 'initiativeDescription')
              }
            />
          </div>
        </section>
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
          <h2 className="form__h2">
            {Messages.InitiativeScopeSection.H2Text.en}
          </h2>
          <p className="form__helper-text">
            {Messages.InitiativeScopeSection.HelperText.en}
          </p>
          <div className="richText" id="initiativeScope">
            <MDEditor
              preview="edit"
              value={intakeForm?.initiativeScope}
              defaultTabEnable={true}
              onChange={(value) => stateChangeHandler(value, 'initiativeScope')}
            />
          </div>
        </section>
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
          <h2 className="form__h2">
            {Messages.InitiativeDataElementsSection.H2Text.en}
          </h2>
          <p className="form__helper-text">
            {Messages.InitiativeDataElementsSection.HelperText.en}
          </p>
          <div className="richText" id="dataElementsInvolved">
            <MDEditor
              preview="edit"
              value={intakeForm?.dataElementsInvolved}
              defaultTabEnable={true}
              onChange={(value) =>
                stateChangeHandler(value, 'dataElementsInvolved')
              }
            />
          </div>
        </section>
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
          <h2 className="form__h2">{Messages.InitiativePISection.H2Text.en}</h2>
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
        {intakeForm?.hasAddedPiToDataElements === false && (
          <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
            <h2 className="form__h2">
              {Messages.InitiativeRiskReductionSection.H2Text.en}
            </h2>
            <p className="form__helper-text">
              {Messages.InitiativeRiskReductionSection.HelperText.en}
            </p>
            <div className="richText" id="riskMitigation">
              <MDEditor
                preview="edit"
                value={intakeForm?.riskMitigation}
                defaultTabEnable={true}
                onChange={(value) =>
                  stateChangeHandler(value, 'riskMitigation')
                }
              />
            </div>
          </section>
        )}
      </form>
    </>
  );
};
