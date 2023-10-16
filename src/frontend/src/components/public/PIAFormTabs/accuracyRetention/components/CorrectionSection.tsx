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
}) => (
  <section className="section__padding-block">
    <h3 className="form__h2">
      {Messages.FormElements.RequestCorrection.H2Text.en}
    </h3>
    <div
      className={`drop-shadow card p-4 p-md-5 ${
        selectedSection &&
        selectedSection ===
          PiaSections.ACCURACY_CORRECTION_AND_RETENTION_CORRECTION
          ? 'section-focus'
          : ''
      }`}
    >
      {!isReadOnly ? (
        <>
          <p>
            <strong>
              {
                Messages.FormElements.RequestCorrection.haveProcessinPlace
                  .Question.en
              }
            </strong>
          </p>
          <p>
            <a
              href={
                Messages.FormElements.RequestCorrection.haveProcessinPlace
                  .HelperText.LinkHref
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {
                Messages.FormElements.RequestCorrection.haveProcessinPlace
                  .HelperText.LinkText.en
              }
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            {
              Messages.FormElements.RequestCorrection.haveProcessinPlace
                .HelperText.en
            }
          </p>
        </>
      ) : (
        <h4>
          {
            Messages.FormElements.RequestCorrection.haveProcessinPlace.Question
              .en
          }
        </h4>
      )}
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

      <div className="section__padding-block">
        {!isReadOnly ? (
          <p>
            <strong>
              {
                Messages.FormElements.RequestCorrection.willDocument.Question
                  .PartOne.en
              }
              <a
                href={
                  Messages.FormElements.RequestCorrection.willDocument.Question
                    .LinkHref
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {
                  Messages.FormElements.RequestCorrection.willDocument.Question
                    .LinkText.en
                }
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              {
                Messages.FormElements.RequestCorrection.willDocument.Question
                  .PartTwo.en
              }
            </strong>
          </p>
        ) : (
          <h4>
            {
              Messages.FormElements.RequestCorrection.willDocument.Question
                .PartOne.en
            }
            <a
              href={
                Messages.FormElements.RequestCorrection.willDocument.Question
                  .LinkHref
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {
                Messages.FormElements.RequestCorrection.willDocument.Question
                  .LinkText.en
              }
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            {
              Messages.FormElements.RequestCorrection.willDocument.Question
                .PartTwo.en
            }
          </h4>
        )}
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

      <div className="section__padding-block">
        {!isReadOnly ? (
          <p>
            <strong>
              {
                Messages.FormElements.RequestCorrection.willConductNotifications
                  .Question.PartOne.en
              }
              <a
                href={
                  Messages.FormElements.RequestCorrection
                    .willConductNotifications.Question.LinkHref
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {
                  Messages.FormElements.RequestCorrection
                    .willConductNotifications.Question.LinkText.en
                }
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              {
                Messages.FormElements.RequestCorrection.willConductNotifications
                  .Question.PartTwo.en
              }
            </strong>
          </p>
        ) : (
          <h4>
            {
              Messages.FormElements.RequestCorrection.willConductNotifications
                .Question.PartOne.en
            }
            <a
              href={
                Messages.FormElements.RequestCorrection.willConductNotifications
                  .Question.LinkHref
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {
                Messages.FormElements.RequestCorrection.willConductNotifications
                  .Question.LinkText.en
              }
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
            {
              Messages.FormElements.RequestCorrection.willConductNotifications
                .Question.PartTwo.en
            }
          </h4>
        )}
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
