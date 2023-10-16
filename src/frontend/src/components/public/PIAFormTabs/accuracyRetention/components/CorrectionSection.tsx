import React from 'react';
import Radio from '../../../../common/Radio';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helpers/messages';
import { CorrectionSectionProps } from '../accuracy-retention-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

export const CorrectionSection: React.FC<CorrectionSectionProps> = ({
  accuracyCorrectionAndRetentionForm,
  showComments,
  commentCount,
  isReadOnly,
  selectedSection,
  haveProcessinPlace,
  willDocument,
  willConductNotifications,
}) => {
  // Destructure messages from the Messages object
  const { RequestCorrection } = Messages.FormElements;

  // Define the class name for the section
  const sectionClassName = `drop-shadow card p-4 p-md-5 ${
    selectedSection === PiaSections.ACCURACY_CORRECTION_AND_RETENTION_CORRECTION
      ? 'section-focus'
      : ''
  }`;

  return (
    <section className="section__padding-block">
      <h3 className="form__h2">{RequestCorrection.H2Text.en}</h3>
      <div className={sectionClassName}>
        {/* Render the question and helper text */}
        {!isReadOnly ? (
          <>
            <p>
              <strong>
                {RequestCorrection.haveProcessinPlace.Question.en}
              </strong>
            </p>
            <p>
              <a
                href={RequestCorrection.haveProcessinPlace.HelperText.LinkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {RequestCorrection.haveProcessinPlace.HelperText.LinkText.en}
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              {RequestCorrection.haveProcessinPlace.HelperText.en}
            </p>
          </>
        ) : (
          <h4>{RequestCorrection.haveProcessinPlace.Question.en}</h4>
        )}

        {/* Render the radio buttons for haveProcessinPlace */}
        {!isReadOnly ? (
          haveProcessinPlace.map((radio, index) => (
            <Radio key={index} {...radio} />
          ))
        ) : (
          <p>
            {accuracyCorrectionAndRetentionForm.correction.haveProcessInPlace?.charAt(
              0,
            )}
            {accuracyCorrectionAndRetentionForm.correction.haveProcessInPlace
              ?.slice(1)
              .toLowerCase()}
          </p>
        )}

        {/* Render the document question and helper text */}
        <div className="section__padding-block">
          {!isReadOnly ? (
            <p>
              <strong>
                {RequestCorrection.willDocument.Question.PartOne.en}
                <a
                  href={RequestCorrection.willDocument.Question.LinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {RequestCorrection.willDocument.Question.LinkText.en}
                  <FontAwesomeIcon icon={faUpRightFromSquare} />
                </a>
                {RequestCorrection.willDocument.Question.PartTwo.en}
              </strong>
            </p>
          ) : (
            <h4>
              {RequestCorrection.willDocument.Question.PartOne.en}
              <a
                href={RequestCorrection.willDocument.Question.LinkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {RequestCorrection.willDocument.Question.LinkText.en}
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              {RequestCorrection.willDocument.Question.PartTwo.en}
            </h4>
          )}

          {/* Render the radio buttons for willDocument */}
          {!isReadOnly ? (
            willDocument.map((radio, index) => <Radio key={index} {...radio} />)
          ) : (
            <p>
              {accuracyCorrectionAndRetentionForm.correction.willDocument?.charAt(
                0,
              )}
              {accuracyCorrectionAndRetentionForm.correction.willDocument
                ?.slice(1)
                .toLowerCase()}
            </p>
          )}
        </div>

        {/* Render the notifications question and helper text */}
        <div className="section__padding-block">
          {!isReadOnly ? (
            <p>
              <strong>
                {RequestCorrection.willConductNotifications.Question.PartOne.en}
                <a
                  href={
                    RequestCorrection.willConductNotifications.Question.LinkHref
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {
                    RequestCorrection.willConductNotifications.Question.LinkText
                      .en
                  }
                  <FontAwesomeIcon icon={faUpRightFromSquare} />
                </a>
                {RequestCorrection.willConductNotifications.Question.PartTwo.en}
              </strong>
            </p>
          ) : (
            <h4>
              {RequestCorrection.willConductNotifications.Question.PartOne.en}
              <a
                href={
                  RequestCorrection.willConductNotifications.Question.LinkHref
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {
                  RequestCorrection.willConductNotifications.Question.LinkText
                    .en
                }
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              {RequestCorrection.willConductNotifications.Question.PartTwo.en}
            </h4>
          )}

          {/* Render the radio buttons for willConductNotifications */}
          {!isReadOnly ? (
            willConductNotifications.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))
          ) : (
            <p>
              {accuracyCorrectionAndRetentionForm.correction?.willConductNotifications?.charAt(
                0,
              )}
              {accuracyCorrectionAndRetentionForm.correction?.willConductNotifications
                ?.slice(1)
                .toLowerCase()}
            </p>
          )}
        </div>

        {/* Render the comments section */}
        {showComments && (
          <ViewComments
            count={
              commentCount?.[
                PiaSections.ACCURACY_CORRECTION_AND_RETENTION_CORRECTION
              ]
            }
            path={PiaSections.ACCURACY_CORRECTION_AND_RETENTION_CORRECTION}
          />
        )}
      </div>
    </section>
  );
};
