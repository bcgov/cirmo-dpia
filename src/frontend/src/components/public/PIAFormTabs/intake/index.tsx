import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MinistryList, PIOptions } from '../../../../constant/constant';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';
import Dropdown from '../../../common/Dropdown';
import InputText from '../../../common/InputText/InputText';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { exportIntakeFromPia } from './helper/extract-intake-from-pia.helper';
import Messages from './helper/messages';
import { IPiaFormIntake } from './pia-form-intake.interface';
import PIAIntakeGeneralInformation from './viewGeneralInformation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export const PIAFormIntake = () => {
  const [pia, piaStateChangeHandler, isReadOnly, accessControl] =
    useOutletContext<
      [IPiaForm, PiaStateChangeHandlerType, boolean, () => void]
    >();

  if (accessControl) accessControl();

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
      <section>
        <h2>{Messages.PiaIntakeHeader.H1Text.en} </h2>
        {!isReadOnly && (
          <>
            <h3>{Messages.PiaIntakeHeader.H2Text.en} </h3>
            <ul>
              {Messages.PiaIntakeHeader.ListText.map((item, index) => (
                <li key={index}>{item.en}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="section__padding-block">
        <h3>{Messages.GeneralInfoSection.H2Text.en}</h3>
        {isReadOnly ? (
          <PIAIntakeGeneralInformation pia={pia} />
        ) : (
          <div className="drop-shadow section__padding-inline section__padding-block bg-white">
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
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'leadName')
                  }
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
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'mpoName')
                  }
                  required={true}
                />
              </div>
              <div className="col">
                <InputText
                  label="MPO email"
                  id="mpoEmail"
                  value={intakeForm?.mpoEmail}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'mpoEmail')
                  }
                  required={true}
                  type="email"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="section__padding-block">
        <h3>{Messages.InitiativeDescriptionSection.SectionHeading.en}</h3>
        <div className="drop-shadow section__padding-inline section__padding-block bg-white">
          {!isReadOnly ? (
            <p>
              <strong>
                {Messages.InitiativeDescriptionSection.Question.en}
              </strong>
            </p>
          ) : (
            <h4> {Messages.InitiativeDescriptionSection.Question.en}</h4>
          )}
          {!isReadOnly && (
            <p className="form__helper-text">
              {Messages.InitiativeDescriptionSection.HelperText.en}
            </p>
          )}
          <div className="richText" id="initiativeDescription">
            {(isReadOnly && !intakeForm.initiativeDescription) ||
            (isReadOnly && intakeForm.initiativeDescription === '') ? (
              <p>
                <i>Not answered</i>
              </p>
            ) : isReadOnly ? (
              <MDEditor.Markdown source={intakeForm.initiativeDescription} />
            ) : (
              <MDEditor
                preview="edit"
                value={intakeForm?.initiativeDescription}
                onChange={(value) =>
                  stateChangeHandler(value, 'initiativeDescription')
                }
              />
            )}
          </div>
        </div>
      </section>

      <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
        {!isReadOnly ? (
          <p className="form__h2">
            <strong>{Messages.InitiativeScopeSection.H2Text.en}</strong>
          </p>
        ) : (
          <h4>{Messages.InitiativeScopeSection.H2Text.en} </h4>
        )}
        {!isReadOnly && (
          <p className="form__helper-text">
            {Messages.InitiativeScopeSection.HelperText.en}
          </p>
        )}
        <div className="richText" id="initiativeScope">
          {(isReadOnly && !intakeForm.initiativeScope) ||
          (isReadOnly && intakeForm.initiativeScope === '') ? (
            <p>
              <i>Not answered</i>
            </p>
          ) : isReadOnly ? (
            <MDEditor.Markdown source={intakeForm.initiativeScope} />
          ) : (
            <MDEditor
              preview="edit"
              value={intakeForm?.initiativeScope}
              defaultTabEnable={true}
              onChange={(value) => stateChangeHandler(value, 'initiativeScope')}
            />
          )}
        </div>
      </section>
      <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
        {!isReadOnly ? (
          <p className="form__h2">
            <strong>{Messages.InitiativeDataElementsSection.H2Text.en}</strong>
          </p>
        ) : (
          <h4>{Messages.InitiativeDataElementsSection.H2Text.en} </h4>
        )}
        {!isReadOnly && (
          <p className="form__helper-text">
            {Messages.InitiativeDataElementsSection.HelperText.en}
          </p>
        )}
        <div className="richText" id="dataElementsInvolved">
          {(isReadOnly && !intakeForm.dataElementsInvolved) ||
          (isReadOnly && intakeForm.dataElementsInvolved === '') ? (
            <p>
              <i>Not answered</i>
            </p>
          ) : isReadOnly ? (
            <MDEditor.Markdown source={intakeForm.dataElementsInvolved} />
          ) : (
            <MDEditor
              preview="edit"
              value={intakeForm?.dataElementsInvolved}
              defaultTabEnable={true}
              onChange={(value) =>
                stateChangeHandler(value, 'dataElementsInvolved')
              }
            />
          )}
        </div>
      </section>

      <section className="section__padding-block">
        <h3>{Messages.InitiativePISection.SectionHeading.en}</h3>
        <div className="drop-shadow section__padding-inline section__padding-block bg-white">
          {!isReadOnly ? (
            <p>
              <strong>{Messages.InitiativePISection.Question.en}</strong>
            </p>
          ) : (
            <h4> {Messages.InitiativePISection.Question.en}</h4>
          )}
          {!isReadOnly && (
            <p className="form__helper-text">
              <a
                href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/personal-information?keyword=personal&keyword=information"
                rel="noreferrer external"
                target="_blank"
              >
                {Messages.InitiativePISection.LinkText.en}
                &nbsp;
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              &nbsp;
              {Messages.InitiativePISection.HelperText.en}
            </p>
          )}

          {!isReadOnly ? (
            PIOptions.map((option, index) => (
              <label key={index} className="form__input-label input-label-row">
                <input
                  disabled={isReadOnly}
                  type="radio"
                  name="pi-options-radio"
                  value={option.key}
                  onChange={handlePIOptionChange}
                  checked={option.value === pia?.hasAddedPiToDataElements}
                />
                {option.key}
              </label>
            ))
          ) : (
            <p>
              {PIOptions.find(
                (item) => item.value === pia?.hasAddedPiToDataElements,
              )?.key || ''}
            </p>
          )}
          {intakeForm?.hasAddedPiToDataElements === false && (
            <div className="section__padding-block">
              {!isReadOnly ? (
                <p>
                  <strong>
                    {Messages.InitiativeRiskReductionSection.H2Text.en}
                  </strong>
                </p>
              ) : (
                <h4> {Messages.InitiativeRiskReductionSection.H2Text.en} </h4>
              )}
              {!isReadOnly && (
                <p className="form__helper-text">
                  {Messages.InitiativeRiskReductionSection.HelperText.en}
                </p>
              )}
              <div className="richText" id="riskMitigation">
                {(isReadOnly && !intakeForm.riskMitigation) ||
                (isReadOnly && intakeForm.riskMitigation === '') ? (
                  <p>
                    <i>Not answered</i>
                  </p>
                ) : isReadOnly ? (
                  <MDEditor.Markdown source={intakeForm.riskMitigation} />
                ) : (
                  <MDEditor
                    preview="edit"
                    value={intakeForm?.riskMitigation}
                    defaultTabEnable={true}
                    onChange={(value) =>
                      stateChangeHandler(value, 'riskMitigation')
                    }
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
