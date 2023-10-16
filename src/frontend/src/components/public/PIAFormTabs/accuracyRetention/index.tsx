import MDEditor from '@uiw/react-md-editor';
import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './helpers/messages';
import {
  IAccuracyCorrectionAndRetention,
  AccuracyCorrectionAndRetentionProps,
} from './accuracy-retention-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import Radio from '../../../common/Radio';
import { getHaveProcessInPlace } from './helpers/haveProcessInPlaceHelper';
import { getWillDocument } from './helpers/willDocumentHelper';
import { getWillConductNotifications } from './helpers/willConductNotificationsHelper';
import { getWillProvideInformation } from './helpers/willProvideInformationHelper';
import { getHaveApprovedInfoSchedule } from './helpers/haveApprovedInfoScheduleHelper';

export const AccuracyCorrectionAndRetention = ({
  showComments = true,
}: AccuracyCorrectionAndRetentionProps) => {
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const defaultState: IAccuracyCorrectionAndRetention = useMemo(
    () => ({
      accuracy: {
        description: '',
      },
      correction: {
        haveProcessInPlace: YesNoInput.YES,
        willDocument: YesNoInput.YES,
        willConductNotifications: YesNoInput.YES,
      },
      retention: {
        usePIForDecision: YesNoInput.YES,
        haveApprovedInfoSchedule: YesNoInput.YES,
        describeRetention: '',
      },
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.accuracyCorrectionAndRetention || defaultState,
    [defaultState, pia.accuracyCorrectionAndRetention],
  );
  const [
    accuracyCorrectionAndRetentionForm,
    setAccuracyCorrectionAndRetentionForm,
  ] = useState<IAccuracyCorrectionAndRetention>(initialFormState);

  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setAccuracyCorrectionAndRetentionForm, path, value);
  };

  const haveProcessinPlace = getHaveProcessInPlace(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

  const willDocument = getWillDocument(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

  const willConductNotifications = getWillConductNotifications(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

  const willProvideInformation = getWillProvideInformation(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

  const haveApprovedInfoSchedule = getHaveApprovedInfoSchedule(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, accuracyCorrectionAndRetentionForm)) {
      piaStateChangeHandler(
        accuracyCorrectionAndRetentionForm,
        'accuracyCorrectionAndRetention',
      );
    }
  }, [
    piaStateChangeHandler,
    accuracyCorrectionAndRetentionForm,
    initialFormState,
  ]);

  return (
    <>
      <form>
        <h2>{Messages.PageTitle.en}</h2>
        <p>{Messages.PageDescription.en}</p>

        <section className="section__padding-block ">
          <h3 className="form__h2">
            {Messages.FormElements.Accuracy.H2Text.en}
          </h3>
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
                  source={
                    accuracyCorrectionAndRetentionForm.accuracy?.description
                  }
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
                  Messages.FormElements.RequestCorrection.haveProcessinPlace
                    .Question.en
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
                      Messages.FormElements.RequestCorrection.willDocument
                        .Question.PartOne.en
                    }
                    <a
                      href={
                        Messages.FormElements.RequestCorrection.willDocument
                          .Question.LinkHref
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        Messages.FormElements.RequestCorrection.willDocument
                          .Question.LinkText.en
                      }
                      <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </a>
                    {
                      Messages.FormElements.RequestCorrection.willDocument
                        .Question.PartTwo.en
                    }
                  </strong>
                </p>
              ) : (
                <h4>
                  {
                    Messages.FormElements.RequestCorrection.willDocument
                      .Question.PartOne.en
                  }
                  <a
                    href={
                      Messages.FormElements.RequestCorrection.willDocument
                        .Question.LinkHref
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {
                      Messages.FormElements.RequestCorrection.willDocument
                        .Question.LinkText.en
                    }
                    <FontAwesomeIcon icon={faUpRightFromSquare} />
                  </a>
                  {
                    Messages.FormElements.RequestCorrection.willDocument
                      .Question.PartTwo.en
                  }
                </h4>
              )}
              {!isReadOnly ? (
                willDocument.map((radio, index) => (
                  <Radio key={index} {...radio} />
                ))
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
                      Messages.FormElements.RequestCorrection
                        .willConductNotifications.Question.PartOne.en
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
                      Messages.FormElements.RequestCorrection
                        .willConductNotifications.Question.PartTwo.en
                    }
                  </strong>
                </p>
              ) : (
                <h4>
                  {
                    Messages.FormElements.RequestCorrection
                      .willConductNotifications.Question.PartOne.en
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
                    Messages.FormElements.RequestCorrection
                      .willConductNotifications.Question.PartTwo.en
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
                    Messages.FormElements.PersonalInformationDecision
                      .usePIForDecision.Question.en
                  }
                </strong>
              </p>
            ) : (
              <h4>
                {
                  Messages.FormElements.PersonalInformationDecision
                    .usePIForDecision.Question.en
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
      </form>
    </>
  );
};
