import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { PIAInitiativeDescriptionProps } from '../pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

const PIAInitiativeDescription: React.FC<PIAInitiativeDescriptionProps> = ({
  isReadOnly,
  intakeForm,
  stateChangeHandler,
  validationMessage,
  selectedSection,
  commentCount,
}) => {
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
        {!isReadOnly ? (
          <p>
            <strong>
              {Messages.InitiativeDescriptionSection.Question.en}
              <span className="error-text "> (required)</span>
            </strong>
          </p>
        ) : (
          <h4>{Messages.InitiativeDescriptionSection.Question.en}</h4>
        )}
        {!isReadOnly && (
          <p className="form__helper-text">
            {Messages.InitiativeDescriptionSection.HelperText.en}
          </p>
        )}
        <div className="richText" id="initiativeDescription">
          {initiativeDescription}
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
  );
};

export default PIAInitiativeDescription;
