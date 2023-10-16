import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helpers/messages';
import { AccuracySectionProps } from '../accuracy-retention-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

export const AccuracySection: React.FC<AccuracySectionProps> = ({
  accuracyCorrectionAndRetentionForm,
  showComments,
  commentCount,
  isReadOnly,
  selectedSection,
  stateChangeHandler,
}) => {
  // Destructure messages from the Messages object
  const { Accuracy } = Messages.FormElements;

  // Define the class name for the section
  const sectionClassName = `drop-shadow card p-4 p-md-5 ${
    selectedSection === PiaSections.ACCURACY_CORRECTION_AND_RETENTION_ACCURACY
      ? 'section-focus'
      : ''
  }`;

  return (
    <section className="section__padding-block ">
      <h3 className="form__h2">{Accuracy.H2Text.en}</h3>
      <div className={sectionClassName}>
        {/* Render the question and helper text */}
        {!isReadOnly ? (
          <>
            <p>
              <strong>{Accuracy.Question.en}</strong>
            </p>
            <p>
              <a
                href={Accuracy.HelperText.LinkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Accuracy.HelperText.LinkText.en}
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              {Accuracy.HelperText.en}
            </p>
          </>
        ) : (
          <h4>{Accuracy.Question.en}</h4>
        )}

        {/* Render the accuracy description */}
        <div>
          {!isReadOnly ? (
            <MDEditor
              preview="edit"
              defaultTabEnable={true}
              value={accuracyCorrectionAndRetentionForm?.accuracy?.description}
              onChange={(value) =>
                stateChangeHandler(value, 'accuracy.description')
              }
              aria-label="Accuracy Description Textarea Input"
            />
          ) : accuracyCorrectionAndRetentionForm.accuracy?.description ? (
            <MDEditor.Markdown
              source={accuracyCorrectionAndRetentionForm.accuracy?.description}
              aria-label="Accuracy Description Textarea Input Preview"
            />
          ) : (
            <p>
              <i>Not answered</i>
            </p>
          )}
        </div>

        {/* Render the comments section */}
        {showComments && (
          <ViewComments
            count={
              commentCount?.[
                PiaSections.ACCURACY_CORRECTION_AND_RETENTION_ACCURACY
              ]
            }
            aria-label="Accuracy Description Textarea Input"
            path={PiaSections.ACCURACY_CORRECTION_AND_RETENTION_ACCURACY}
          />
        )}
      </div>
    </section>
  );
};
