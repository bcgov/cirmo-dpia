import React, { useEffect, useState } from 'react';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakePersonalInformationProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import { PIOptions } from '../../../../../constant/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

// Extracting message constants for better readability and code reuse
const { SectionHeading, HelperText, Question, LinkText } =
  Messages.InitiativePISection;

const IntakePersonalInformation: React.FC<IntakePersonalInformationProps> = ({
  isReadOnly,
  selectedSection,
  intakeForm,
  stateChangeHandler,
  commentCount,
  pia,
  handlePIOptionChange,
}) => {
  // Determine the class to apply for section focus
  const sectionClass =
    selectedSection === PiaSections.INTAKE_PERSONAL_INFORMATION
      ? 'section-focus'
      : '';

  // State for riskMitigation text editor.
  const [riskMitigation, setRiskMitigation] = useState(
    intakeForm?.riskMitigation?.content ?? '',
  );

  // Update form state.
  useEffect(() => {
    stateChangeHandler(riskMitigation, 'riskMitigation', 'content');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskMitigation]);

  // Show the editor unless isReadOnly and riskMitigation is empty.
  const showEditor = !(isReadOnly && riskMitigation === '');

  return (
    <section className="section__padding-block">
      <h3>{SectionHeading.en}</h3>

      <div className={`drop-shadow card p-4 p-md-5 ${sectionClass}`}>
        {/* Question heading */}
        {isReadOnly ? (
          <h4>{Question.en}</h4>
        ) : (
          <p>
            <strong>{Question.en}</strong>
          </p>
        )}

        {/* Helper Text with an external link */}
        {!isReadOnly && (
          <p className="form__helper-text">
            <a
              href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/personal-information?keyword=personal&keyword=information"
              rel="noreferrer external"
              target="_blank"
            >
              {LinkText.en} <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            &nbsp;{HelperText.en}
          </p>
        )}

        {/* Radio Options for Personal Information */}
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

        {/* Risk Mitigation Section */}
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
              {showEditor ? (
                <RichTextEditor
                  content={riskMitigation}
                  setContent={setRiskMitigation}
                  readOnly={isReadOnly}
                  textOnlyReadOnly={true}
                  aria-label="Risk Mitigation Textarea Input"
                />
              ) : (
                <i>Not answered</i>
              )}
            </div>
          </div>
        )}

        {/* Display the comment count */}
        <ViewComments
          count={commentCount?.[PiaSections.INTAKE_PERSONAL_INFORMATION]}
          path={PiaSections.INTAKE_PERSONAL_INFORMATION}
        />
      </div>
    </section>
  );
};

export default IntakePersonalInformation;
