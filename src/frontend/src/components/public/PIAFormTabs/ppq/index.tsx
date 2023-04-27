import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import { IPPQ } from './interfaces';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import { OtherFactor, YesNoInputOptions } from '../../../../constant/constant';
import Checkbox from '../../../common/Checkbox';
import CustomInputDate from '../../../common/CustomInputDate';
import MDEditor from '@uiw/react-md-editor';
const PPQ = () => {
  const {
    pia,
    commentCount,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const [containsStartDate, setContainsStartDate] = useState('Yes');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [checkedPIItems, setCheckedPIItems] = useState({
    hasSensitivePersonalInformation: false,
    hasSharingOfPersonalInformation: false,
    hasProgramAgreement: false,
    hasOthersAccessToPersonalInformation: false,
    hasCloudTechnology: false,
    hasPotentialPublicInterest: false,
    hasDisclosureOutsideOfCanada: false,
    hasBcServicesCardOnboarding: false,
    hasAiOrMl: false,
    hasPartnershipNonMinistry: false,
  });

  const chooseStartDate = (event: any) => {
    setContainsStartDate(event.target.value);
  };

  const handleDescriptionChange = (newMessage: any) => {
    setDescription(newMessage);
  };
  const handlePIItemsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedPIItems({
      ...checkedPIItems,
      [event.target.value]: event.target.checked,
    });
  };
  const defaultState: IPPQ = useMemo(
    () => ({
      checkedPIItems: '',
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.additionalRisks || defaultState,
    [defaultState, pia.additionalRisks],
  );

  const [ppqForm, setPpqForm] = useState<IPPQ>();

  const stateChangeHandler = (value: any, key: keyof IPPQ) => {
    setNestedReactState(setPpqForm, key, value);
  };

  return (
    <>
      <h2 className="results-header pb-4">
        <b>{Messages.Headings.Title.en}</b>
      </h2>

      <section className="drop-shadow card p-4 p-md-5">
        <div className="form-group">
          <h2>{Messages.InitiativeFactorsHeading.en}</h2>
          <div className="other-factors-container">
            {OtherFactor.map((factor, index) => {
              return (
                <Checkbox
                  key={index}
                  checked={false}
                  value={factor.value}
                  label={factor.label}
                  tooltip={factor.tooltip}
                  tooltipText={factor.tooltipText}
                  isLink={factor.isLink}
                  linkURL={factor.linkURL}
                  onChange={handlePIItemsChange}
                />
              );
            })}
          </div>
        </div>
        <div className="form-group">
          <div className="start-date-container">
            <div className="form-group col-md-6">
              <div>
                {YesNoInputOptions.map((option, index) => {
                  return YesNoInputOptions[0] === option ? (
                    <div key={index} onChange={chooseStartDate}>
                      <label className="input-label">
                        <input
                          key={index}
                          type="radio"
                          name="start-initiative-radio"
                          value={option}
                          defaultChecked
                        />
                        {option}
                      </label>
                    </div>
                  ) : (
                    <div key={index} onChange={chooseStartDate}>
                      <label className="input-label">
                        <input
                          key={index}
                          type="radio"
                          name="start-initiative-radio"
                          value={option}
                        />
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {containsStartDate === 'Yes' && (
              <div className="form-group">
                <label id="start-date-label">
                  Proposed go-live or start date
                </label>
                <CustomInputDate
                  key="startDate"
                  selected={startDate === null ? null : startDate}
                  onChange={(date: any) => setStartDate(date)}
                  required
                />
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <h2>{Messages.AdditionalInfoHeading.en}</h2>
          <MDEditor
            preview="edit"
            defaultTabEnable={true}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </section>
    </>
  );
};

export default PPQ;
