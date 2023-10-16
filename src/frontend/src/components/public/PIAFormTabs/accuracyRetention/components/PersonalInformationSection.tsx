import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import Radio from '../../../../common/Radio';
import ViewComments from '../../../../common/ViewComment';
import Messages from '../helpers/messages';
import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { PersonalInformationSectionProps } from '../accuracy-retention-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';

export const PersonalInformationSection: React.FC<
  PersonalInformationSectionProps
> = ({
  accuracyCorrectionAndRetentionForm,
  showComments,
  commentCount,
  isReadOnly,
  selectedSection,
  stateChangeHandler,
  willProvideInformation,
  haveApprovedInfoSchedule,
}) => (
  <section className="section__padding-block">
    <h3 className="form__h2">
      {Messages.FormElements.PersonalInformationDecision.H2Text.en}
    </h3>
    <div
      className={`drop-shadow card p-4 p-md-5  ${
        selectedSection &&
        selectedSection ===
          PiaSections.ACCURACY_CORRECTION_AND_RETENTION_RETENTION
          ? 'section-focus'
          : ''
      }`}
    >
      {!isReadOnly ? (
        <p>
          <strong>
            {
              Messages.FormElements.PersonalInformationDecision.usePIForDecision
                .Question.en
            }
          </strong>
        </p>
      ) : (
        <h4>
          {
            Messages.FormElements.PersonalInformationDecision.usePIForDecision
              .Question.en
          }
        </h4>
      )}
      {!isReadOnly ? (
        willProvideInformation.map((radio, index) => (
          <Radio key={index} {...radio} />
        ))
      ) : (
        <p>
          {accuracyCorrectionAndRetentionForm.retention?.usePIForDecision?.charAt(
            0,
          )}
          {accuracyCorrectionAndRetentionForm.retention?.usePIForDecision
            ?.slice(1)
            .toLowerCase()}
        </p>
      )}
      {accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ===
        YesNoInput.YES ||
      !accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ? (
        <div className="section__padding-block">
          {!isReadOnly ? (
            <>
              <p>
                <strong>
                  {
                    Messages.FormElements.PersonalInformationDecision
                      .haveApprovedInfoSchedule.Question.en
                  }
                </strong>
              </p>
              <p>
                <a
                  href={
                    Messages.FormElements.PersonalInformationDecision
                      .haveApprovedInfoSchedule.FOIPPALink
                  }
                  rel="noreferrer external"
                  target="_blank"
                >
                  {
                    Messages.FormElements.PersonalInformationDecision
                      .haveApprovedInfoSchedule.FOIPPAText.en
                  }
                  <FontAwesomeIcon
                    className="helper-text__link-icon"
                    icon={faUpRightFromSquare}
                  />
                </a>
                {
                  Messages.FormElements.PersonalInformationDecision
                    .haveApprovedInfoSchedule.HelperTextPartOne.en
                }
                <a
                  href={
                    Messages.FormElements.PersonalInformationDecision
                      .haveApprovedInfoSchedule.IMALink
                  }
                  rel="noreferrer external"
                  target="_blank"
                >
                  {
                    Messages.FormElements.PersonalInformationDecision
                      .haveApprovedInfoSchedule.IMAText.en
                  }
                  <FontAwesomeIcon
                    className="helper-text__link-icon"
                    icon={faUpRightFromSquare}
                  />
                </a>

                {
                  Messages.FormElements.PersonalInformationDecision
                    .haveApprovedInfoSchedule.HelperTextPartTwo.en
                }
              </p>
            </>
          ) : (
            <h4>
              {
                Messages.FormElements.PersonalInformationDecision
                  .haveApprovedInfoSchedule.Question.en
              }
            </h4>
          )}
          {!isReadOnly ? (
            haveApprovedInfoSchedule.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))
          ) : (
            <p>
              {accuracyCorrectionAndRetentionForm.retention.haveApprovedInfoSchedule?.charAt(
                0,
              )}
              {accuracyCorrectionAndRetentionForm.retention.haveApprovedInfoSchedule
                ?.slice(1)
                .toLowerCase()}
            </p>
          )}
        </div>
      ) : null}
      {accuracyCorrectionAndRetentionForm.retention.usePIForDecision ===
        YesNoInput.YES ||
      !accuracyCorrectionAndRetentionForm.retention.usePIForDecision ? (
        accuracyCorrectionAndRetentionForm.retention
          .haveApprovedInfoSchedule === YesNoInput.NO ||
        !accuracyCorrectionAndRetentionForm?.retention
          ?.haveApprovedInfoSchedule ? (
          <div className="section__padding-block">
            {!isReadOnly ? (
              <p>
                <strong>
                  {
                    Messages.FormElements.PersonalInformationDecision
                      .describeRetention.Question.en
                  }
                </strong>
              </p>
            ) : (
              <h4>
                {
                  Messages.FormElements.PersonalInformationDecision
                    .describeRetention.Question.en
                }
              </h4>
            )}
            {!isReadOnly ? (
              <MDEditor
                preview="edit"
                defaultTabEnable={true}
                value={
                  accuracyCorrectionAndRetentionForm?.retention
                    ?.describeRetention || undefined
                }
                onChange={(value) =>
                  stateChangeHandler(value, 'retention.describeRetention')
                }
                aria-label="Describe Retention Textarea Input"
              />
            ) : accuracyCorrectionAndRetentionForm.retention
                .describeRetention ? (
              <MDEditor.Markdown
                source={
                  accuracyCorrectionAndRetentionForm.retention.describeRetention
                }
                aria-label="Describe Retention Textarea Input Preview"
              />
            ) : (
              <p>
                <i>Not answered</i>
              </p>
            )}
          </div>
        ) : null
      ) : null}
      {showComments && (
        <ViewComments
          count={
            commentCount?.[
              PiaSections.ACCURACY_CORRECTION_AND_RETENTION_RETENTION
            ]
          }
          path={PiaSections.ACCURACY_CORRECTION_AND_RETENTION_RETENTION}
        />
      )}
    </div>
  </section>
);
