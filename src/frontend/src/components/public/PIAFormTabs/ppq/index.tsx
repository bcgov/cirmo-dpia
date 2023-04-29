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

  const [checkedPIItems, setCheckedPIItems] = useState({
    hasOtherRelatedPIAInformation: false,
    hasProgramAgreement: false,
    hasDataLinking: false,
    hasCloudTechnology: false,
    hasPotentialPublicInterest: false,
    hasAssociatedContractOrLicenseAgreementReview: false,
    hasBcServicesCardOnboarding: false,
    hasAiOrMl: false,
  });

  const handlePIItemsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedPIItems({
      ...checkedPIItems,
      [event.target.value]: event.target.checked,
    });
  };
  const defaultState: IPPQ = useMemo(
    () => ({
      checkedPIItems: {
        hasOtherRelatedPIAInformation: false,
        hasProgramAgreement: false,
        hasDataLinking: false,
        hasCloudTechnology: false,
        hasPotentialPublicInterest: false,
        hasAssociatedContractOrLicenseAgreementReview: false,
        hasBcServicesCardOnboarding: false,
        hasAiOrMl: false,
      },
      willProposeDeadlineForReview: YesNoInput.YES,
      proposedDeadlineDate: '',
      proposeDeadlineReason: '',
      anyRelatedPIAInformation: '',
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
                    value={factor.value}
                    label={factor.label}
                    tooltip={factor.tooltip}
                    tooltipText={factor.tooltipText}
                    onChange={handlePIItemsChange}
                  />
                );
              })
            : OtherFactor.map((factor, index) => {
                const typedKey = factor.value as keyof IPPQ['checkedPIItems'];
                return (
                  <Checkbox
                    key={index}
                    checked={ppqForm?.checkedPIItems?.[typedKey]}
                    value={factor.value}
                    label={factor.label}
                    tooltip={factor.tooltip}
                    tooltipText={factor.tooltipText}
                    readOnly={true}
                  />
                );
              })}
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
                    ppqForm?.willProposeDeadlineForReview === YesNoInput.YES
                  }
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.value,
                      'willProposeDeadlineForReview',
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
                  checked={ppqForm?.willProposeDeadlineForReview === 'NO'}
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.value,
                      'willProposeDeadlineForReview',
                    )
                  }
                />
                No
              </div>
            </div>
          ) : (
            <p>
              {ppqForm?.willProposeDeadlineForReview?.charAt(0)}
              {ppqForm?.willProposeDeadlineForReview?.slice(1).toLowerCase()}
            </p>
          )}
        </div>

        {ppqForm?.willProposeDeadlineForReview === YesNoInput.YES && (
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
                    ppqForm?.proposedDeadlineDate
                      ? stringToDate(ppqForm.proposedDeadlineDate)
                      : null
                  }
                  onChange={(date: any) => {
                    stateChangeHandler(
                      dateToString(date),
                      'proposedDeadlineDate',
                    );
                  }}
                  required
                />
              ) : (
                <div>
                  {pia.ppq?.proposedDeadlineDate &&
                  pia.ppq?.proposedDeadlineDate !== '' ? (
                    pia.ppq?.proposedDeadlineDate
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
                  value={ppqForm?.proposeDeadlineReason || ''}
                  onChange={(value) =>
                    stateChangeHandler(value, 'proposeDeadlineReason')
                  }
                />
              ) : ppqForm.proposeDeadlineReason ? (
                <MDEditor.Markdown source={ppqForm.proposeDeadlineReason} />
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
            <p>
              <strong>{Messages.AdditionalInfoHeading.en}</strong>
            </p>
          ) : (
            <h4> {Messages.AdditionalInfoHeading.en}</h4>
          )}
          {!isReadOnly ? (
            <MDEditor
              preview="edit"
              defaultTabEnable={true}
              value={ppqForm?.anyRelatedPIAInformation || ''}
              onChange={(value) =>
                stateChangeHandler(value, 'anyRelatedPIAInformation')
              }
            />
          ) : ppqForm.anyRelatedPIAInformation ? (
            <MDEditor.Markdown source={ppqForm.anyRelatedPIAInformation} />
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
