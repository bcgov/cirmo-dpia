import React, { useEffect, useState } from 'react';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helpers/messages';
import { AccuracySectionProps } from '../accuracy-retention-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

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

  // State for rich text editor.
  const [accuracyDescription, setAccuracyDescription] = useState(
    accuracyCorrectionAndRetentionForm?.accuracy?.description?.content ?? '',
  );

  // Update form state on rich text editor changes.
  useEffect(() => {
    stateChangeHandler(accuracyDescription, 'accuracy.description.content');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accuracyDescription]);

  // Show the editor unless isReadOnly and accuracyDescription is empty.
  const showEditor = !(isReadOnly && accuracyDescription === '');

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
        <div className="richText" id="AccuracyDescription">
          {showEditor ? (
            <RichTextEditor
              content={accuracyDescription}
              setContent={setAccuracyDescription}
              readOnly={isReadOnly}
              aria-label="Accuracy Description Textarea Input"
            />
          ) : (
            <i>Not answered</i>
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
