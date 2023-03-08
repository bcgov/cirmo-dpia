import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Messages from './helper/messages';
import { IAccuracyCorrectionAndRetention } from './accuracy-retention-interface';

export const AccuracyCorrectionAndRetention = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const defaultState: IAccuracyCorrectionAndRetention = {
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
  };

  const [
    accuracyCorrectionAndRetentionForm,
    setAccuracyCorrectionAndRetentionForm,
  ] = useState<IAccuracyCorrectionAndRetention>(
    pia.accuracyCorrectionAndRetention || defaultState,
  );

  const stateChangeHandler = (value: any, nestedkey: string) => {
    if (nestedkey) {
      const keyString = nestedkey.split('.');
      if (keyString.length > 1) {
        const Key1 = keyString[0];
        const Key2 = keyString[1];
        if (Key1 === 'accuracy') {
          setAccuracyCorrectionAndRetentionForm((state) => ({
            ...state,
            accuracy: {
              ...state.accuracy,
              [Key2]: value,
            },
          }));
        } else if (Key1 === 'correction') {
          setAccuracyCorrectionAndRetentionForm((state) => ({
            ...state,
            correction: {
              ...state.correction,
              [Key2]: value,
            },
          }));
        } else if (Key1 === 'retention') {
          setAccuracyCorrectionAndRetentionForm((state) => ({
            ...state,
            retention: {
              ...state.retention,
              [Key2]: value,
            },
          }));
        }
      }
    }
    piaStateChangeHandler(
      accuracyCorrectionAndRetentionForm,
      'accuracyCorrectionAndRetention',
    );
  };

  return (
    <>
      <form className="">
        <h2 className="">{Messages.PageTitle.en}</h2>
        <p>{Messages.PageDescription.en}</p>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.Accuracy.H2Text.en}
          </h3>
          <div className="drop-shadow section__padding-inline bg-white section__padding-block ">
            <p>
              <strong>{Messages.FormElements.Accuracy.Question.en}</strong>
            </p>
            <p>{Messages.FormElements.Accuracy.HelperText.en}</p>
            <div className="">
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
            </div>
          </div>
        </section>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.RequestCorrection.H2Text.en}
          </h3>
          <div className="drop-shadow section__padding-inline section__padding-block bg-white">
            <div>
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
              <div className="">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="haveProcessinPlace"
                    value="YES"
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.haveProcessInPlace === 'YES' ||
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
                    value="NO"
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.haveProcessInPlace === 'NO'
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
              </div>
            </div>

            <div className="section__padding-block">
              <p>
                <strong>
                  {
                    Messages.FormElements.RequestCorrection.willDocument
                      .Question.en
                  }
                </strong>
              </p>
              <div className="">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="WillDocument"
                    value="YES"
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.willDocument === 'YES' ||
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
                    value="NO"
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.willDocument === 'NO'
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
              </div>
            </div>

            <div className="section__padding-block">
              <p>
                <strong>
                  {
                    Messages.FormElements.RequestCorrection
                      .willConductNotifications.Question.en
                  }
                </strong>
              </p>
              <div className="">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="WillconductNotifications"
                    value="YES"
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.willConductNotifications === 'YES' ||
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
                    value="NO"
                    checked={
                      accuracyCorrectionAndRetentionForm?.correction
                        ?.willConductNotifications === 'NO'
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
              </div>
            </div>
          </div>
        </section>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.PersonalInformationDecision.H2Text.en}
          </h3>
          <div className="drop-shadow section__padding-inline section__padding-block bg-white">
            <div className="section__padding-block">
              <p>
                <strong>
                  {
                    Messages.FormElements.PersonalInformationDecision
                      .usePIForDecision.Question.en
                  }
                </strong>
              </p>
              <div className="">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="WillProvideInformation"
                    value="YES"
                    checked={
                      accuracyCorrectionAndRetentionForm?.retention
                        ?.usePIForDecision === 'YES' ||
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
                    value="NO"
                    checked={
                      accuracyCorrectionAndRetentionForm?.retention
                        ?.usePIForDecision === 'NO'
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
              </div>
            </div>
            {accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ===
              'YES' ||
            !accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ? (
              <div className="section__padding-block">
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
                  </a>

                  {
                    Messages.FormElements.PersonalInformationDecision
                      .haveApprovedInfoSchedule.HelperTextPartTwo.en
                  }
                </p>
                <div className="">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="HaveApprovedInfoSchedule"
                      value="YES"
                      checked={
                        accuracyCorrectionAndRetentionForm?.retention
                          ?.haveApprovedInfoSchedule === 'YES' ||
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
                      value="NO"
                      checked={
                        accuracyCorrectionAndRetentionForm?.retention
                          ?.haveApprovedInfoSchedule === 'NO'
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
                </div>
              </div>
            ) : null}
            {accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ===
              'YES' ||
            !accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ? (
              accuracyCorrectionAndRetentionForm?.retention
                ?.haveApprovedInfoSchedule === 'NO' ||
              !accuracyCorrectionAndRetentionForm?.retention
                ?.haveApprovedInfoSchedule ? (
                <div className="section__padding-block">
                  <p>
                    <strong>
                      {
                        Messages.FormElements.PersonalInformationDecision
                          .describeRetention.Question.en
                      }
                    </strong>
                  </p>
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
                </div>
              ) : null
            ) : null}
          </div>
        </section>
      </form>
    </>
  );
};
