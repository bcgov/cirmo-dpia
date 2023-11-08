import React, { useEffect, useState } from 'react';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakeInitiativeDetailsProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

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

  // State for dataElementsInvolved text editor.
  const [dataElementsInvolved, setDataElementsInvolved] = useState(
    intakeForm?.dataElementsInvolved ?? '',
  );

  // Update form state.
  useEffect(() => {
    stateChangeHandler(dataElementsInvolved, 'dataElementsInvolved');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataElementsInvolved]);

  // Show the editor unless isReadOnly and dataElementsInvolved is empty.
  const showEditor = !(isReadOnly && dataElementsInvolved === '');

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
          {showEditor ? (
            <RichTextEditor
              content={dataElementsInvolved}
              setContent={setDataElementsInvolved}
              readOnly={isReadOnly}
              aria-label="Data Elements Involved Textarea Input"
            />
          ) : (
            <i>Not answered</i>
          )}
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
