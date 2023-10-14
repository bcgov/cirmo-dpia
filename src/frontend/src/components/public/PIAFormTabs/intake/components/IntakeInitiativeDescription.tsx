import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakeInitiativeDescriptionProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

const IntakeInitiativeDescription: React.FC<
  IntakeInitiativeDescriptionProps
> = ({
  isReadOnly,
  intakeForm,
  stateChangeHandler,
  validationMessage,
  selectedSection,
  commentCount,
}) => {
  // Render the initiative description field
  const initiativeDescription = isReadOnly ? (
    intakeForm.initiativeDescription || <i>Not answered</i>
  ) : (
    <MDEditor
      preview="edit"
      defaultTabEnable={true}
      value={intakeForm?.initiativeDescription}
      onChange={(value) => stateChangeHandler(value, 'initiativeDescription')}
      aria-label="Initiative Description Textarea Input"
    />
  );

  // Main component render function
  return (
    <section className="section__padding-block">
      <h3>{Messages.InitiativeDescriptionSection.SectionHeading.en}</h3>
      <div
        className={`drop-shadow card p-4 p-md-5 ${
          selectedSection === PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION
            ? 'section-focus'
            : ''
        }`}
      >
        {/* Render the question heading */}
        {isReadOnly ? (
          <h4>{Messages.InitiativeDescriptionSection.Question.en}</h4>
        ) : (
          <p>
            <strong>
              {Messages.InitiativeDescriptionSection.Question.en}
              <span className="error-text "> (required)</span>
            </strong>
          </p>
        )}

        {/* Render the helper text */}
        {!isReadOnly && (
          <p className="form__helper-text">
            {Messages.InitiativeDescriptionSection.HelperText.en}
          </p>
        )}

        {/* Render the initiative description field */}
        <div className="richText" id="initiativeDescription">
          {initiativeDescription}

          {/* Render the error message */}
          {!isReadOnly && validationMessage.piaInitialDescription && (
            <p className="error-text ">
              {validationMessage.piaInitialDescription}
            </p>
          )}
        </div>

        {/* Component to display comments */}
        <ViewComments
          count={
            commentCount?.[PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION]
          }
          path={PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION}
        />
      </div>
    </section>
  );
};

export default IntakeInitiativeDescription;
