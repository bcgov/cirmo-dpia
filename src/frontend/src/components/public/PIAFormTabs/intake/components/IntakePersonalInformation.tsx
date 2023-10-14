import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakePersonalInformationProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import { PIOptions } from '../../../../../constant/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

// Destructure the messages object for better readability
const { SectionHeading, HelperText, Question, LinkText } =
  Messages.InitiativePISection;

// The main component for the Intake Personal Information section
const IntakePersonalInformation: React.FC<IntakePersonalInformationProps> = ({
  isReadOnly,
  selectedSection,
  intakeForm,
  stateChangeHandler,
  commentCount,
  pia,
  handlePIOptionChange,
}) => {
  // Render component
  return (
    <section className="section__padding-block">
      {/* Section Heading */}
      <h3>{SectionHeading.en}</h3>

      <div
        className={`drop-shadow card p-4 p-md-5 ${
          selectedSection === PiaSections.INTAKE_PERSONAL_INFORMATION
            ? 'section-focus'
            : ''
        }`}
      >
        {/* Render the question heading */}
        {isReadOnly ? (
          <h4>{Question.en}</h4>
        ) : (
          <p>
            <strong>{Question.en}</strong>
          </p>
        )}

        {/* Render the helper text with external link */}
        {!isReadOnly && (
          <p className="form__helper-text">
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/personal-information?keyword=personal&keyword=information"
              rel="noreferrer external"
              target="_blank"
            >
              {LinkText.en}
              &nbsp;
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            &nbsp;
            {HelperText.en}
          </p>
        )}

        {/* Render the radio options for personal information */}
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

        {/* Render the risk mitigation section */}
        {intakeForm?.hasAddedPiToDataElements === false && (
          <div className="section__padding-block">
            {isReadOnly ? (
              <h4>{Messages.InitiativeRiskReductionSection.H2Text.en}</h4>
            ) : (
              <p>
                <strong>
                  {Messages.InitiativeRiskReductionSection.H2Text.en}
                </strong>
              </p>
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

        {/* Component to display comments */}
        <ViewComments
          count={commentCount?.[PiaSections.INTAKE_PERSONAL_INFORMATION]}
          path={PiaSections.INTAKE_PERSONAL_INFORMATION}
        />
      </div>
    </section>
  );
};

export default IntakePersonalInformation;
