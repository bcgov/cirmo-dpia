import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useContext, useState } from 'react';
import { MinistryList, PIOptions } from '../../../../constant/constant';
import Dropdown from '../../../common/Dropdown';
import InputText from '../../../common/InputText/InputText';
import { exportIntakeFromPia } from './helper/extract-intake-from-pia.helper';
import Messages from './helper/messages';
import { IPiaFormIntake } from './pia-form-intake.interface';
import PIAIntakeGeneralInformation from './viewGeneralInformation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import GeneralInformation from './components/GeneralInformation';

export const PIAFormIntake = () => {
  const {
    pia,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
    validationMessage,
    commentCount,
  } = useContext<IPiaFormContext>(PiaFormContext);

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

    // ensuring we see the NextSteps page every time user switches from a delegated to a non-delegated flow AND vice-versa
    if (
      ((pia?.hasAddedPiToDataElements === true ||
        pia?.hasAddedPiToDataElements === null) &&
        event.target.value === 'No') ||
      (pia?.hasAddedPiToDataElements === false &&
        (event.target.value === 'Yes' || event.target.value === "I'm not sure"))
    ) {
      piaStateChangeHandler(false, 'isNextStepsSeenForNonDelegatedFlow');
      piaStateChangeHandler(false, 'isNextStepsSeenForDelegatedFlow');
    }
  };

  return (
    <>
      <GeneralInformation isReadOnly={isReadOnly} />

      <section className="section__padding-block">
        <h3>{Messages.GeneralInfoSection.H2Text.en}</h3>
        {isReadOnly ? (
          <PIAIntakeGeneralInformation
            commentCount={commentCount}
            pia={pia}
            path={selectedSection}
          />
        ) : (
          <div
            className={`drop-shadow card p-4 p-md-5 ${
              selectedSection &&
              selectedSection === PiaSections.INTAKE_GENERAL_INFORMATION
                ? 'section-focus'
                : ''
            }`}
          >
            <div className="row">
              <InputText
                label="Initiative title"
                value={intakeForm?.title}
                onChange={(e) => stateChangeHandler(e.target.value, 'title')}
                required={true}
              />
              {validationMessage.piaTitle && (
                <p className="error-text "> {validationMessage.piaTitle}</p>
              )}
            </div>
            <div className="row">
              <div className="col col-md-6">
                {/* Backend accept either null or valid ministry names. Empty string is not an accepted value. Hence conversions below */}
                <Dropdown
                  id="ministry-select"
                  value={intakeForm?.ministry || ''} // null to empty string conversion
                  label="Ministry"
                  options={MinistryList}
                  changeHandler={
                    (e) =>
                      stateChangeHandler(e?.target?.value || null, 'ministry') // empty string to null conversion
                  }
                  required={true}
                />
                {validationMessage.piaMinistry && (
                  <p className="error-text ">{validationMessage.piaMinistry}</p>
                )}
              </div>
              <div className="col">
                <InputText
                  label="Branch"
                  value={intakeForm?.branch}
                  required={true}
                  onChange={(e) => stateChangeHandler(e.target.value, 'branch')}
                />
                {validationMessage.piaBranch && (
                  <p className="error-text "> {validationMessage.piaBranch}</p>
                )}
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
                  required={false}
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
                  required={false}
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
                  required={false}
                />
              </div>
            </div>
            <ViewComments
              count={commentCount?.[PiaSections.INTAKE_GENERAL_INFORMATION]}
              path={PiaSections.INTAKE_GENERAL_INFORMATION}
            />
          </div>
        )}
      </section>

      <section className="section__padding-block">
        <h3>{Messages.InitiativeDescriptionSection.SectionHeading.en}</h3>
        <div
          className={`drop-shadow card p-4 p-md-5 ${
            selectedSection &&
            selectedSection ===
              PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION
              ? 'section-focus'
              : ''
          }`}
        >
          {!isReadOnly ? (
            <p>
              <strong>
                {Messages.InitiativeDescriptionSection.Question.en}
                <span className="error-text "> (required)</span>
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
              <MDEditor.Markdown
                source={intakeForm.initiativeDescription}
                aria-label="Initiative Description Textarea Input Preview"
              />
            ) : (
              <MDEditor
                preview="edit"
                defaultTabEnable={true}
                value={intakeForm?.initiativeDescription}
                onChange={(value) =>
                  stateChangeHandler(value, 'initiativeDescription')
                }
                aria-label="Initiative Description Textarea Input"
              />
            )}
            {!isReadOnly && validationMessage.piaInitialDescription && (
              <p className="error-text ">
                {validationMessage.piaInitialDescription}
              </p>
            )}
          </div>

          <ViewComments
            count={
              commentCount?.[PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION]
            }
            path={PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION}
          />
        </div>
      </section>

      <section className="section__padding-block">
        <div
          className={`drop-shadow card p-4 p-md-5  ${
            selectedSection &&
            selectedSection === PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE
              ? 'section-focus'
              : ''
          }`}
        >
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
              <MDEditor.Markdown
                source={intakeForm.initiativeScope}
                aria-label="Initiative Scope Textarea Input Preview"
              />
            ) : (
              <MDEditor
                preview="edit"
                value={intakeForm?.initiativeScope}
                defaultTabEnable={true}
                onChange={(value) =>
                  stateChangeHandler(value, 'initiativeScope')
                }
                aria-label="Initiative Scope Textarea Input"
              />
            )}
          </div>

          <ViewComments
            count={commentCount?.[PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE]}
            path={PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE}
          />
        </div>
      </section>

      <section className="section__padding-block">
        <div
          className={`drop-shadow card p-4 p-md-5  ${
            selectedSection &&
            selectedSection ===
              PiaSections.INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED
              ? 'section-focus'
              : ''
          }`}
        >
          {!isReadOnly ? (
            <p className="form__h2">
              <strong>
                {Messages.InitiativeDataElementsSection.H2Text.en}
              </strong>
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
              <MDEditor.Markdown
                source={intakeForm.dataElementsInvolved}
                aria-label="Data Elements Involved Textarea Input Preview"
              />
            ) : (
              <MDEditor
                preview="edit"
                value={intakeForm?.dataElementsInvolved}
                defaultTabEnable={true}
                onChange={(value) =>
                  stateChangeHandler(value, 'dataElementsInvolved')
                }
                aria-label="Data Elements Involved Textarea Input"
              />
            )}
          </div>

          <ViewComments
            count={
              commentCount?.[
                PiaSections.INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED
              ]
            }
            path={PiaSections.INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED}
          />
        </div>
      </section>

      <section className="section__padding-block">
        <h3>{Messages.InitiativePISection.SectionHeading.en}</h3>
        <div
          className={`drop-shadow card p-4 p-md-5  ${
            selectedSection &&
            selectedSection === PiaSections.INTAKE_PERSONAL_INFORMATION
              ? 'section-focus'
              : ''
          }`}
        >
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
                  aria-label={`Did you list personal information in the last question? ${option.key}`}
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
                  <MDEditor.Markdown
                    source={intakeForm.riskMitigation}
                    aria-label="Risk Mitigation Textarea Input Preview"
                  />
                ) : (
                  <MDEditor
                    preview="edit"
                    value={intakeForm?.riskMitigation}
                    defaultTabEnable={true}
                    onChange={(value) =>
                      stateChangeHandler(value, 'riskMitigation')
                    }
                    aria-label="Risk Mitigation Textarea Input"
                  />
                )}
              </div>
            </div>
          )}

          <ViewComments
            count={commentCount?.[PiaSections.INTAKE_PERSONAL_INFORMATION]}
            path={PiaSections.INTAKE_PERSONAL_INFORMATION}
          />
        </div>
      </section>
    </>
  );
};
