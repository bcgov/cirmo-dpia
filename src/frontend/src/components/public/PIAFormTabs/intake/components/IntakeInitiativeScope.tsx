import React, { useEffect, useState } from 'react';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakeInitiativeScopeProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

const IntakeInitiativeScope: React.FC<IntakeInitiativeScopeProps> = ({
  isReadOnly,
  selectedSection,
  intakeForm,
  stateChangeHandler,
  commentCount,
  disabled,
}) => {
  // Determine section focus based on selectedSection
  const sectionFocus =
    selectedSection === PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE
      ? 'section-focus'
      : '';

  // State for initiativeScope text editor.
  const [initiativeScope, setInitiativeScope] = useState(
    intakeForm?.initiativeScope?.content ?? '',
  );

  // Update form state.
  useEffect(() => {
    stateChangeHandler(initiativeScope, 'initiativeScope', 'content');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiativeScope]);

  // Show the editor unless isReadOnly and initiativeScope is empty.
  const showEditor = !(isReadOnly && initiativeScope === '');

  return (
    <section className="section__padding-block">
      {/* Main card layout */}
      <div className={`drop-shadow card p-4 p-md-5 ${sectionFocus}`}>
        {/* Render header */}
        {isReadOnly ? (
          <h4>{Messages.InitiativeScopeSection.H2Text.en} </h4>
        ) : (
          <p className="form__h2">
            <strong>{Messages.InitiativeScopeSection.H2Text.en}</strong>
          </p>
        )}

        {/* Render helper text */}
        {!isReadOnly && (
          <p className="form__helper-text">
            {Messages.InitiativeScopeSection.HelperText.en}
          </p>
        )}

        {/* Render initiative scope */}
        <div className="richText" id="initiativeScope">
          {showEditor ? (
            <RichTextEditor
              content={initiativeScope}
              setContent={setInitiativeScope}
              readOnly={isReadOnly}
              textOnlyReadOnly={true}
              aria-label="Initiative Scope Textarea Input"
            />
          ) : (
            <i>Not answered</i>
          )}
        </div>

        {/* Component to display comments */}
        <ViewComments
          count={commentCount?.[PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE]}
          path={PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE}
          disabled={disabled}
        />
      </div>
    </section>
  );
};

export default IntakeInitiativeScope;
