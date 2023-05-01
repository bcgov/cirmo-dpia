import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import { IPPQ, OtherFactor } from './interfaces';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import Checkbox from '../../../common/Checkbox';
import CustomInputDate from '../../../common/CustomInputDate';
import MDEditor from '@uiw/react-md-editor';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { dateToString, stringToDate } from '../../../../utils/date';
import { deepEqual } from '../../../../utils/object-comparison.util';
const PPQ = () => {
  const { pia, piaStateChangeHandler, isReadOnly, accessControl } =
    useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();
  const defaultState: IPPQ = useMemo(
    () => ({
      hasCommonProgram: false,
      hasDataLinking: false,
      hasCloudTechnology: false,
      hasPotentialPublicInterest: false,
      hasContactOrLicenseReview: false,
      hasBcServicesCardOnboarding: false,
      hasAiOrMl: false,
      hasInitiativeOther: false,
      initiativeOtherDetails: '',
      proposedDeadlineAvailable: YesNoInput.YES,
      proposedDeadline: '',
      proposedDeadlineReason: '',
      otherCpoConsideration: '',
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.ppq || defaultState,
    [defaultState, pia.ppq],
  );

  const [ppqForm, setPpqForm] = useState<IPPQ>(initialFormState);

  const stateChangeHandler = (value: any, key: keyof IPPQ) => {
    setNestedReactState(setPpqForm, key, value);
  };

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, ppqForm)) {
      piaStateChangeHandler(ppqForm, 'ppq');
    }
  }, [piaStateChangeHandler, ppqForm, initialFormState]);

  return (
    <>
      <h2 className="results-header pb-4">
        <b>{Messages.Headings.Title.en}</b>
      </h2>
      <p> {Messages.Headings.Description.en}</p>
      <section className="drop-shadow card p-4 p-md-5">
        {!isReadOnly ? (
          <p>
            <strong>{Messages.InitiativeFactorsHeading.en} </strong>
          </p>
        ) : (
          <h4>{Messages.InitiativeFactorsHeading.en}</h4>
        )}
        <div className="row">
          {!isReadOnly
            ? OtherFactor.map((factor, index) => {
                return (
                  <Checkbox
                    key={index}
                    checked={false}
                    isLink={false}
                    value={factor.value}
                    label={factor.label}
                    tooltip={factor.tooltip}
                    tooltipText={factor.tooltipText}
                    onChange={(event) => {
                      stateChangeHandler(
                        event.target.checked,
                        factor.value as keyof IPPQ,
                      );
                    }}
                  />
                );
              })
            : OtherFactor.map((factor, index) => {
                const typedKey = factor.value as keyof IPPQ;
                return (
                  <Checkbox
                    key={index}
                    checked={!!ppqForm?.[typedKey]}
                    value={factor.value}
                    label={factor.label}
                    tooltip={factor.tooltip}
                    tooltipText={factor.tooltipText}
                    isLink={false}
                    readOnly={true}
                  />
                );
              })}
          {!isReadOnly ? (
            ppqForm?.hasInitiativeOther && (
              <MDEditor
                preview="edit"
                defaultTabEnable={true}
                value={ppqForm?.initiativeOtherDetails || ''}
                onChange={(value) =>
                  stateChangeHandler(value, 'initiativeOtherDetails')
                }
              />
            )
          ) : ppqForm.initiativeOtherDetails ? (
            <div className="px-4">
              <MDEditor.Markdown source={ppqForm.initiativeOtherDetails} />
            </div>
          ) : ppqForm?.hasInitiativeOther ? (
            <p>
              <i>Not answered</i>
            </p>
          ) : null}
        </div>

        <div className="form-group ">
          {!isReadOnly ? (
            <p>
              <strong> {Messages.DeadlineDateHeading.en}</strong>
            </p>
          ) : (
            <h4>{Messages.DeadlineDateHeading.en}</h4>
          )}
          {!isReadOnly ? (
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="proposed-deadline-radio"
                  value={YesNoInput.YES}
                  checked={
                    ppqForm?.proposedDeadlineAvailable === YesNoInput.YES
                  }
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.value,
                      'proposedDeadlineAvailable',
                    )
                  }
                />
                Yes
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="proposed-deadline-radio"
                  value={YesNoInput.NO}
                  checked={ppqForm?.proposedDeadlineAvailable === 'NO'}
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.value,
                      'proposedDeadlineAvailable',
                    )
                  }
                />
                No
              </div>
            </div>
          ) : (
            <p>
              {ppqForm?.proposedDeadlineAvailable?.charAt(0)}
              {ppqForm?.proposedDeadlineAvailable?.slice(1).toLowerCase()}
            </p>
          )}
        </div>

        {ppqForm?.proposedDeadlineAvailable === YesNoInput.YES && (
          <>
            <div className="form-group mt-4 col-md-3">
              {!isReadOnly ? (
                <label id="deadline-date-label">
                  {Messages.ProposedDeadLineHeading.en}
                  <span className="error-text "> (required)</span>
                </label>
              ) : (
                <h4> {Messages.ProposedDeadLineHeading.en}</h4>
              )}
              {!isReadOnly ? (
                <CustomInputDate
                  key="proposedDeadlineDate"
                  selected={
                    ppqForm?.proposedDeadline
                      ? stringToDate(ppqForm.proposedDeadline)
                      : null
                  }
                  onChange={(date: any) => {
                    stateChangeHandler(dateToString(date), 'proposedDeadline');
                  }}
                  required
                />
              ) : (
                <div>
                  {pia.ppq?.proposedDeadline &&
                  pia.ppq?.proposedDeadline !== '' ? (
                    pia.ppq?.proposedDeadline
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="form-group mt-4 ">
              {!isReadOnly ? (
                <label id="start-date-label">
                  {Messages.DeadlineReasonHeading.en}
                  <span className="error-text "> (required)</span>
                </label>
              ) : (
                <h4> {Messages.DeadlineReasonHeading.en}</h4>
              )}
              {!isReadOnly ? (
                <MDEditor
                  preview="edit"
                  defaultTabEnable={true}
                  value={ppqForm?.proposedDeadlineReason || ''}
                  onChange={(value) =>
                    stateChangeHandler(value, 'proposedDeadlineReason')
                  }
                />
              ) : ppqForm.proposedDeadlineReason ? (
                <MDEditor.Markdown source={ppqForm.proposedDeadlineReason} />
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </>
        )}

        <div className="form-group mt-4">
          {!isReadOnly ? (
            <label id="additionalInformation">
              {Messages.AdditionalInfoHeading.en}
            </label>
          ) : (
            <h4> {Messages.AdditionalInfoHeading.en}</h4>
          )}
          {!isReadOnly ? (
            <MDEditor
              preview="edit"
              defaultTabEnable={true}
              value={ppqForm?.otherCpoConsideration || ''}
              onChange={(value) =>
                stateChangeHandler(value, 'otherCpoConsideration')
              }
            />
          ) : ppqForm.otherCpoConsideration ? (
            <MDEditor.Markdown source={ppqForm.otherCpoConsideration} />
          ) : (
            <p>
              <i>Not answered</i>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default PPQ;
