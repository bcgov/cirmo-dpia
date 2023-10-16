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
  stateChangeHandler,
  showComments,
  commentCount,
  isReadOnly,
  selectedSection,
}) => (
  <section className="section__padding-block ">
    <h3 className="form__h2">{Messages.FormElements.Accuracy.H2Text.en}</h3>
    <div
      className={`drop-shadow card p-4 p-md-5 ${
        selectedSection &&
        selectedSection ===
          PiaSections.ACCURACY_CORRECTION_AND_RETENTION_ACCURACY
          ? 'section-focus'
          : ''
      }`}
    >
      {!isReadOnly ? (
        <>
          <p>
            <strong>{Messages.FormElements.Accuracy.Question.en}</strong>
          </p>
          <p>
            <a
              href={Messages.FormElements.Accuracy.HelperText.LinkHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Messages.FormElements.Accuracy.HelperText.LinkText.en}
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            {Messages.FormElements.Accuracy.HelperText.en}
          </p>
        </>
      ) : (
        <h4>{Messages.FormElements.Accuracy.Question.en}</h4>
      )}
      <div>
        {!isReadOnly ? (
          <MDEditor
            preview="edit"
            defaultTabEnable={true}
            value={
              accuracyCorrectionAndRetentionForm?.accuracy?.description ||
              undefined
            }
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
      {showComments && (
        <ViewComments
          count={
            commentCount?.[
              PiaSections.ACCURACY_CORRECTION_AND_RETENTION_ACCURACY
            ]
          }
          path={PiaSections.ACCURACY_CORRECTION_AND_RETENTION_ACCURACY}
        />
      )}
    </div>
  </section>
);
