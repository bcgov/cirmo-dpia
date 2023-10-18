import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakeInitiativeDescriptionProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

// Destructure the messages object for better readability
const { SectionHeading, Question, HelperText } =
  Messages.InitiativeDescriptionSection;

// Define the IntakeInitiativeDescription functional component
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
  // Determine the content to render for the Initiative Description
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

  // Main component rendering logic
  return (
    <section className="section__padding-block">
      {/* Render the section heading */}
      <h3>{SectionHeading.en}</h3>

      {/* Render the main card */}
      <div
        className={`drop-shadow card p-4 p-md-5 ${
          selectedSection === PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION
            ? 'section-focus'
            : ''
        }`}
      >
        {/* Render the question or the heading based on isReadOnly flag */}
        {isReadOnly ? (
          <h4>{Question.en}</h4>
        ) : (
          <p>
            <strong>
              {`${Question.en} `}
              <span className="error-text "> (required)</span>
            </strong>
          </p>
        )}

        {/* Render the helper text if isReadOnly is false */}
        {!isReadOnly && <p className="form__helper-text">{HelperText.en}</p>}

        {/* Render the main content */}
        <div className="richText" id="initiativeDescription">
          {initiativeDescription}

          {/* Render error message if any */}
          {!isReadOnly && validationMessage.piaInitialDescription && (
            <p className="error-text ">
              {validationMessage.piaInitialDescription}
            </p>
          )}
        </div>

        {/* Render the comments section */}
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
