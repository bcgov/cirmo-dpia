import MDEditor from '@uiw/react-md-editor';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Messages from './helper/messages';
import { IAccuracyCorrectionAndRetention } from './accuracy-retention-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';

export const AccuracyCorrectionAndRetention = () => {
  const [pia, piaStateChangeHandler, isReadOnly, accessControl] =
    useOutletContext<
      [IPiaForm, PiaStateChangeHandlerType, boolean, () => void]
    >();

  if (accessControl) accessControl();

  const defaultState: IAccuracyCorrectionAndRetention = useMemo(
    () => ({
      accuracy: {
        description: null,
      },
      correction: {
        haveProcessInPlace: null,
        willDocument: null,
        willConductNotifications: null,
      },
      retention: {
        usePIForDecision: null,
        haveApprovedInfoSchedule: null,
        describeRetention: null,
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

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.Accuracy.H2Text.en}
          </h3>
          <div className="drop-shadow section__padding-inline bg-white section__padding-block ">
            {!isReadOnly ? (
              <>
                <p>
                  <strong>{Messages.FormElements.Accuracy.Question.en}</strong>
                </p>
                <p>{Messages.FormElements.Accuracy.HelperText.en}</p>
              </>
            ) : (
              <h4>{Messages.FormElements.Accuracy.Question.en}</h4>
            )}
            <div>
              {!isReadOnly ? (
                <MDEditor
                  preview="edit"
                  value={
                    accuracyCorrectionAndRetentionForm?.accuracy?.description ||
                    undefined
                  }
                  onChange={(value) =>
                    stateChangeHandler(value, 'accuracy.description')
                  }
                />
              ) : accuracyCorrectionAndRetentionForm.accuracy?.description ? (
                <MDEditor.Markdown
                  source={
                    accuracyCorrectionAndRetentionForm.accuracy?.description
                  }
                />
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.RequestCorrection.H2Text.en}
          </h3>
          <div className="drop-shadow section__padding-inline section__padding-block bg-white">
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
              <>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="haveProcessinPlace"
                    value={YesNoInput.YES}
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.haveProcessInPlace === YesNoInput.YES ||
                      !accuracyCorrectionAndRetentionForm?.correction
                        ?.haveProcessInPlace
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'correction.haveProcessInPlace',
                      )
                    }
                  />
                  Yes
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="haveProcessinPlace"
                    value={YesNoInput.NO}
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.haveProcessInPlace === YesNoInput.NO
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'correction.haveProcessInPlace',
                      )
                    }
                  />
                  No
                </div>
              </>
            ) : (
              <p>
                {accuracyCorrectionAndRetentionForm.correction?.haveProcessInPlace?.charAt(
                  0,
                )}
                {accuracyCorrectionAndRetentionForm.correction?.haveProcessInPlace
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
                        .Question.en
                    }
                  </strong>
                </p>
              ) : (
                <h4>
                  {
                    Messages.FormElements.RequestCorrection.willDocument
                      .Question.en
                  }
                </h4>
              )}
              {!isReadOnly ? (
                <>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="WillDocument"
                      value={YesNoInput.YES}
                      checked={
                        accuracyCorrectionAndRetentionForm?.correction
                          ?.willDocument === YesNoInput.YES ||
                        !accuracyCorrectionAndRetentionForm?.correction
                          ?.willDocument
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'correction.willDocument',
                        )
                      }
                    />
                    Yes
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="WillDocument"
                      value={YesNoInput.NO}
                      checked={
                        accuracyCorrectionAndRetentionForm?.correction
                          ?.willDocument === YesNoInput.NO
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'correction.willDocument',
                        )
                      }
                    />
                    No
                  </div>
                </>
              ) : (
                <p>
                  {accuracyCorrectionAndRetentionForm.correction?.willDocument?.charAt(
                    0,
                  )}
                  {accuracyCorrectionAndRetentionForm.correction?.willDocument
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
                        .willConductNotifications.Question.en
                    }
                  </strong>
                </p>
              ) : (
                <h4>
                  {
                    Messages.FormElements.RequestCorrection
                      .willConductNotifications.Question.en
                  }
                </h4>
              )}
              {!isReadOnly ? (
                <>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="WillconductNotifications"
                      value={YesNoInput.YES}
                      checked={
                        accuracyCorrectionAndRetentionForm?.correction
                          ?.willConductNotifications === YesNoInput.YES ||
                        !accuracyCorrectionAndRetentionForm?.correction
                          ?.willConductNotifications
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'correction.willConductNotifications',
                        )
                      }
                    />
                    Yes
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="WillconductNotifications"
                      value={YesNoInput.NO}
                      checked={
                        accuracyCorrectionAndRetentionForm?.correction
                          ?.willConductNotifications === YesNoInput.NO
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'correction.willConductNotifications',
                        )
                      }
                    />
                    No
                  </div>
                </>
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
          </div>
        </section>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.PersonalInformationDecision.H2Text.en}
          </h3>
          <div className="drop-shadow section__padding-inline section__padding-block bg-white">
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
              <>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="WillProvideInformation"
                    value={YesNoInput.YES}
                    checked={
                      accuracyCorrectionAndRetentionForm?.retention
                        ?.usePIForDecision === YesNoInput.YES ||
                      !accuracyCorrectionAndRetentionForm?.retention
                        ?.usePIForDecision
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'retention.usePIForDecision',
                      )
                    }
                  />
                  Yes
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="WillProvideInformation"
                    value={YesNoInput.NO}
                    checked={
                      accuracyCorrectionAndRetentionForm?.retention
                        ?.usePIForDecision === YesNoInput.NO
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'retention.usePIForDecision',
                      )
                    }
                  />
                  No
                </div>
              </>
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
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="HaveApprovedInfoSchedule"
                        value={YesNoInput.YES}
                        checked={
                          accuracyCorrectionAndRetentionForm?.retention
                            ?.haveApprovedInfoSchedule === YesNoInput.YES ||
                          !accuracyCorrectionAndRetentionForm?.retention
                            ?.haveApprovedInfoSchedule
                        }
                        onChange={(e) =>
                          stateChangeHandler(
                            e.target.value,
                            'retention.haveApprovedInfoSchedule',
                          )
                        }
                      />
                      Yes
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="HaveApprovedInfoSchedule"
                        value={YesNoInput.NO}
                        checked={
                          accuracyCorrectionAndRetentionForm?.retention
                            ?.haveApprovedInfoSchedule === YesNoInput.NO
                        }
                        onChange={(e) =>
                          stateChangeHandler(
                            e.target.value,
                            'retention.haveApprovedInfoSchedule',
                          )
                        }
                      />
                      No
                    </div>
                  </>
                ) : (
                  <p>
                    {accuracyCorrectionAndRetentionForm.retention?.haveApprovedInfoSchedule?.charAt(
                      0,
                    )}
                    {accuracyCorrectionAndRetentionForm.retention?.haveApprovedInfoSchedule
                      ?.slice(1)
                      .toLowerCase()}
                  </p>
                )}
              </div>
            ) : null}
            {accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ===
              YesNoInput.YES ||
            !accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ? (
              accuracyCorrectionAndRetentionForm?.retention
                ?.haveApprovedInfoSchedule === YesNoInput.NO ||
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
                      value={
                        accuracyCorrectionAndRetentionForm?.retention
                          ?.describeRetention || undefined
                      }
                      onChange={(value) =>
                        stateChangeHandler(value, 'retention.describeRetention')
                      }
                    />
                  ) : accuracyCorrectionAndRetentionForm.retention
                      ?.describeRetention ? (
                    <MDEditor.Markdown
                      source={
                        accuracyCorrectionAndRetentionForm.retention
                          .describeRetention
                      }
                    />
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
              ) : null
            ) : null}
          </div>
        </section>
      </form>
    </>
  );
};
