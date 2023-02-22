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

  const [
    accuracyCorrectionAndRetentionForm,
    setAccuracyCorrectionAndRetentionForm,
  ] = useState<IAccuracyCorrectionAndRetention>(
    pia.accuracyCorrectionAndRetention || {},
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

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('change');
  };

  return (
    <>
      <form className="needs-validation">
        <h1 className="form__title">{Messages.PageTitle.en}</h1>
        <p>{Messages.PageDescription.en}</p>

        <h2 className="form__h2">{Messages.FormElements.Accuracy.H2Text.en}</h2>
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
          <p>
            <strong>{Messages.FormElements.Accuracy.Question.en}</strong>
          </p>
          <p>{Messages.FormElements.Accuracy.HelperText.en}</p>
          <div className="">
            <MDEditor
              preview="edit"
              value={accuracyCorrectionAndRetentionForm?.accuracy?.description}
              onChange={(value) =>
                stateChangeHandler(value, 'accuracy.description')
              }
            />
          </div>
        </section>

        <h2 className="form__h2">
          {Messages.FormElements.RequestCorrection.H2Text.en}
        </h2>
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
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
                  value="Yes"
                  checked={
                    accuracyCorrectionAndRetentionForm?.correction
                      ?.haveProcessInPlace === 'Yes' ||
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
                  value="No"
                  checked={
                    accuracyCorrectionAndRetentionForm?.correction
                      ?.haveProcessInPlace === 'No'
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
                  Messages.FormElements.RequestCorrection.willDocument.Question
                    .en
                }
              </strong>
            </p>
            <div className="">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="WillDocument"
                  value="Yes"
                  checked={
                    accuracyCorrectionAndRetentionForm?.correction
                      ?.willDocument === 'Yes' ||
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
                  value="No"
                  checked={
                    accuracyCorrectionAndRetentionForm?.correction
                      ?.willDocument === 'No'
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
                  value="Yes"
                  checked={
                    accuracyCorrectionAndRetentionForm?.correction
                      ?.willConductNotifications === 'Yes' ||
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
                  value="No"
                  checked={
                    accuracyCorrectionAndRetentionForm?.correction
                      ?.willConductNotifications === 'No'
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
        </section>

        <h2 className="form__h2">
          {Messages.FormElements.PersonalInformationDecision.H2Text.en}
        </h2>
        <section className="drop-shadow section__padding-inline section__margin-block section__padding-block bg-white">
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
                  value="Yes"
                  checked={
                    accuracyCorrectionAndRetentionForm?.retention
                      ?.usePIForDecision === 'Yes' ||
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
                  value="No"
                  checked={
                    accuracyCorrectionAndRetentionForm?.retention
                      ?.usePIForDecision === 'No'
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
            'Yes' ||
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
                {
                  Messages.FormElements.PersonalInformationDecision
                    .haveApprovedInfoSchedule.HelperText.en
                }
              </p>
              <div className="">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="HaveApprovedInfoSchedule"
                    value="Yes"
                    checked={
                      accuracyCorrectionAndRetentionForm?.retention
                        ?.haveApprovedInfoSchedule === 'Yes' ||
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
                    value="No"
                    checked={
                      accuracyCorrectionAndRetentionForm?.retention
                        ?.haveApprovedInfoSchedule === 'No'
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
            'Yes' ||
          !accuracyCorrectionAndRetentionForm?.retention?.usePIForDecision ? (
            accuracyCorrectionAndRetentionForm?.retention
              ?.haveApprovedInfoSchedule === 'Yes' ||
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
                      ?.describeRetention
                  }
                  onChange={(value) =>
                    stateChangeHandler(value, 'retention.describeRetention')
                  }
                />
              </div>
            ) : null
          ) : null}
        </section>
      </form>
    </>
  );
};
