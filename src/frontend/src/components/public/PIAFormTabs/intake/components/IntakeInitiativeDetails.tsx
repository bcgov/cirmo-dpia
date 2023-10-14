import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakeInitiativeDetailsProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

// Destructure the messages object for better readability
const { H2Text, HelperText } = Messages.InitiativeDataElementsSection;

// Define the functional component with its expected props
const IntakeInitiativeDetails: React.FC<IntakeInitiativeDetailsProps> = ({
  isReadOnly,
  selectedSection,
  intakeForm,
  stateChangeHandler,
  commentCount,
}) => {
  // Calculate if the current section is focused
  const isSectionFocused =
    selectedSection ===
    PiaSections.INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED;

  // Generate content based on whether it's read-only mode or not
  const content =
    (isReadOnly && !intakeForm.dataElementsInvolved) ||
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
        onChange={(value) => stateChangeHandler(value, 'dataElementsInvolved')}
        aria-label="Data Elements Involved Textarea Input"
      />
    );

  // Main render function for the component
  return (
    <section className="section__padding-block">
      <div
        className={`drop-shadow card p-4 p-md-5 ${
          isSectionFocused ? 'section-focus' : ''
        }`}
      >
        {/* Render the section title */}
        {isReadOnly ? (
          <h4>{H2Text.en}</h4>
        ) : (
          <p className="form__h2">
            <strong>{H2Text.en}</strong>
          </p>
        )}

        {/* Render the helper text */}
        {!isReadOnly && <p className="form__helper-text">{HelperText.en}</p>}

        {/* Render the content */}
        <div className="richText" id="dataElementsInvolved">
          {content}
        </div>

        {/* Render comments */}
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
  );
};

export default IntakeInitiativeDetails;
