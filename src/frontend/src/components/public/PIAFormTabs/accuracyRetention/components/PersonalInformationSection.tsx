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
}) => {
  // Destructure messages from the Messages object
  const { PersonalInformationDecision } = Messages.FormElements;

  // Define the class name for the section
  const sectionClassName = `drop-shadow card p-4 p-md-5 ${
    selectedSection === PiaSections.ACCURACY_CORRECTION_AND_RETENTION_RETENTION
      ? 'section-focus'
      : ''
  }`;

  return (
    <section className="section__padding-block">
      <h3 className="form__h2">{PersonalInformationDecision.H2Text.en}</h3>
      <div className={sectionClassName}>
        {/* Render the question and helper text */}
        {!isReadOnly ? (
          <p>
            <strong>
              {PersonalInformationDecision.usePIForDecision.Question.en}
            </strong>
          </p>
        ) : (
          <h4>{PersonalInformationDecision.usePIForDecision.Question.en}</h4>
        )}
        {/* Render the radio buttons for willProvideInformation */}
        {!isReadOnly &&
          willProvideInformation.map((radio, index) => (
            <Radio key={index} {...radio} />
          ))}
        {/* Render the answer for willProvideInformation */}
        {isReadOnly && (
          <p>
            {accuracyCorrectionAndRetentionForm.retention?.usePIForDecision?.charAt(
              0,
            )}
            {accuracyCorrectionAndRetentionForm.retention?.usePIForDecision
              ?.slice(1)
              .toLowerCase()}
          </p>
        )}
        {/* Render the section for haveApprovedInfoSchedule */}
        {(accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ===
          YesNoInput.YES ||
          !accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision) && (
          <div className="section__padding-block">
            {!isReadOnly ? (
              <>
                <p>
                  <strong>
                    {
                      PersonalInformationDecision.haveApprovedInfoSchedule
                        .Question.en
                    }
                  </strong>
                </p>
                <p>
                  <a
                    href={
                      PersonalInformationDecision.haveApprovedInfoSchedule
                        .FOIPPALink
                    }
                    rel="noreferrer external"
                    target="_blank"
                  >
                    {
                      PersonalInformationDecision.haveApprovedInfoSchedule
                        .FOIPPAText.en
                    }
                    <FontAwesomeIcon
                      className="helper-text__link-icon"
                      icon={faUpRightFromSquare}
                    />
                  </a>
                  {
                    PersonalInformationDecision.haveApprovedInfoSchedule
                      .HelperTextPartOne.en
                  }
                  <a
                    href={
                      PersonalInformationDecision.haveApprovedInfoSchedule
                        .IMALink
                    }
                    rel="noreferrer external"
                    target="_blank"
                  >
                    {
                      PersonalInformationDecision.haveApprovedInfoSchedule
                        .IMAText.en
                    }
                    <FontAwesomeIcon
                      className="helper-text__link-icon"
                      icon={faUpRightFromSquare}
                    />
                  </a>
                  {
                    PersonalInformationDecision.haveApprovedInfoSchedule
                      .HelperTextPartTwo.en
                  }
                </p>
              </>
            ) : (
              <h4>
                {
                  PersonalInformationDecision.haveApprovedInfoSchedule.Question
                    .en
                }
              </h4>
            )}
            {/* Render the radio buttons for haveApprovedInfoSchedule */}
            {!isReadOnly &&
              haveApprovedInfoSchedule.map((radio, index) => (
                <Radio key={index} {...radio} />
              ))}
            {/* Render the answer for haveApprovedInfoSchedule */}
            {isReadOnly && (
              <p>
                {accuracyCorrectionAndRetentionForm.retention.haveApprovedInfoSchedule?.charAt(
                  0,
                )}
                {accuracyCorrectionAndRetentionForm.retention.haveApprovedInfoSchedule
                  ?.slice(1)
                  .toLowerCase()}
              </p>
            )}
            {/* Render the section for describeRetention */}
            {(accuracyCorrectionAndRetentionForm.retention.usePIForDecision ===
              YesNoInput.YES ||
              !accuracyCorrectionAndRetentionForm.retention.usePIForDecision) &&
              (accuracyCorrectionAndRetentionForm.retention
                .haveApprovedInfoSchedule === YesNoInput.NO ||
                !accuracyCorrectionAndRetentionForm?.retention
                  ?.haveApprovedInfoSchedule) && (
                <div className="section__padding-block">
                  {!isReadOnly ? (
                    <p>
                      <strong>
                        {
                          PersonalInformationDecision.describeRetention.Question
                            .en
                        }
                      </strong>
                    </p>
                  ) : (
                    <h4>
                      {
                        PersonalInformationDecision.describeRetention.Question
                          .en
                      }
                    </h4>
                  )}
                  {/* Render the MDEditor for describeRetention */}
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
                        accuracyCorrectionAndRetentionForm.retention
                          .describeRetention
                      }
                      aria-label="Describe Retention Textarea Input Preview"
                    />
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
              )}
          </div>
        )}
        {/* Render the comments section */}
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
};
