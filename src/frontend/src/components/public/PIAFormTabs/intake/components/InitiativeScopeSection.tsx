import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { InitiativeScopeSectionProps } from '../pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

const InitiativeScopeSection: React.FC<InitiativeScopeSectionProps> = ({
  isReadOnly,
  selectedSection,
  intakeForm,
  stateChangeHandler,
  commentCount,
}) => {
  return (
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
              onChange={(value) => stateChangeHandler(value, 'initiativeScope')}
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
  );
};

export default InitiativeScopeSection;
