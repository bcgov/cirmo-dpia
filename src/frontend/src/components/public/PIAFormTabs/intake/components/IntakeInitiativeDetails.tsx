import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helper/messages';
import { IntakeInitiativeDetailsProps } from '../pia-form-intake.interface';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

const IntakeInitiativeDetails: React.FC<IntakeInitiativeDetailsProps> = ({
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
          selectedSection ===
            PiaSections.INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED
            ? 'section-focus'
            : ''
        }`}
      >
        {!isReadOnly ? (
          <p className="form__h2">
            <strong>{Messages.InitiativeDataElementsSection.H2Text.en}</strong>
          </p>
        ) : (
          <h4>{Messages.InitiativeDataElementsSection.H2Text.en} </h4>
        )}
        {!isReadOnly && (
          <p className="form__helper-text">
            {Messages.InitiativeDataElementsSection.HelperText.en}
          </p>
        )}
        <div className="richText" id="dataElementsInvolved">
          {(isReadOnly && !intakeForm.dataElementsInvolved) ||
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
              onChange={(value) =>
                stateChangeHandler(value, 'dataElementsInvolved')
              }
              aria-label="Data Elements Involved Textarea Input"
            />
          )}
        </div>

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
