import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakeInitiativeScopeProps } from '../helper/pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

const IntakeInitiativeScope: React.FC<IntakeInitiativeScopeProps> = ({
  isReadOnly,
  selectedSection,
  intakeForm,
  stateChangeHandler,
  commentCount,
}) => {
  // Determine section focus based on selectedSection
  const sectionFocus =
    selectedSection === PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE
      ? 'section-focus'
      : '';

  // Render the appropriate initiative scope content based on `isReadOnly` and `intakeForm`
  const renderInitiativeScope = () => {
    if (isReadOnly) {
      return intakeForm.initiativeScope ? (
        <MDEditor.Markdown
          source={intakeForm.initiativeScope}
          aria-label="Initiative Scope Textarea Input Preview"
        />
      ) : (
        <p>
          <i>Not answered</i>
        </p>
      );
    }
    return (
      <MDEditor
        preview="edit"
        value={intakeForm?.initiativeScope}
        defaultTabEnable={true}
        onChange={(value) => stateChangeHandler(value, 'initiativeScope')}
        aria-label="Initiative Scope Textarea Input"
      />
    );
  };

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
          {renderInitiativeScope()}
        </div>

        {/* Component to display comments */}
        <ViewComments
          count={commentCount?.[PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE]}
          path={PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE}
        />
      </div>
    </section>
  );
};

export default IntakeInitiativeScope;
