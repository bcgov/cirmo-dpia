import { ChangeEvent, useContext, useState } from 'react';
import { MinistryList } from '../../../../constant/constant';
import Dropdown from '../../../common/Dropdown';
import InputText from '../../../common/InputText/InputText';
import { exportIntakeFromPia } from './helper/extract-intake-from-pia.helper';
import Messages from './helper/messages';
import { IPiaFormIntake } from './pia-form-intake.interface';
import PIAIntakeGeneralInformation from './viewGeneralInformation';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import IntakeGeneralInformation from './components/IntakeGeneralInformation';
import IntakeInitiativeDescription from './components/IntakeInitiativeDescription';
import IntakeInitiativeScope from './components/IntakeInitiativeScope';
import IntakeInitiativeDetails from './components/IntakeInitiativeDetails';
import IntakePersonalInformation from './components/IntakePersonalInformation';

export const PIAFormIntake = () => {
  const {
    pia,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
    validationMessage,
    commentCount,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const [intakeForm, setIntakeForm] = useState<IPiaFormIntake>(
    exportIntakeFromPia(pia),
  );

  const stateChangeHandler = (value: any, key: keyof IPiaFormIntake) => {
    setIntakeForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(value, key);
  };

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.target.value === 'Yes'
      ? stateChangeHandler(true, 'hasAddedPiToDataElements')
      : event.target.value === "I'm not sure"
      ? stateChangeHandler(null, 'hasAddedPiToDataElements')
      : stateChangeHandler(false, 'hasAddedPiToDataElements');

    // ensuring we see the NextSteps page every time user switches from a delegated to a non-delegated flow AND vice-versa
    if (
      ((pia?.hasAddedPiToDataElements === true ||
        pia?.hasAddedPiToDataElements === null) &&
        event.target.value === 'No') ||
      (pia?.hasAddedPiToDataElements === false &&
        (event.target.value === 'Yes' || event.target.value === "I'm not sure"))
    ) {
      piaStateChangeHandler(false, 'isNextStepsSeenForNonDelegatedFlow');
      piaStateChangeHandler(false, 'isNextStepsSeenForDelegatedFlow');
    }
  };

  return (
    <>
      <IntakeGeneralInformation isReadOnly={isReadOnly} />

      <section className="section__padding-block">
        <h3>{Messages.GeneralInfoSection.H2Text.en}</h3>
        {isReadOnly ? (
          <PIAIntakeGeneralInformation
            commentCount={commentCount}
            pia={pia}
            path={selectedSection}
          />
        ) : (
          <div
            className={`drop-shadow card p-4 p-md-5 ${
              selectedSection &&
              selectedSection === PiaSections.INTAKE_GENERAL_INFORMATION
                ? 'section-focus'
                : ''
            }`}
          >
            <div className="row">
              <InputText
                label="Initiative title"
                value={intakeForm?.title}
                onChange={(e) => stateChangeHandler(e.target.value, 'title')}
                required={true}
              />
              {validationMessage.piaTitle && (
                <p className="error-text "> {validationMessage.piaTitle}</p>
              )}
            </div>
            <div className="row">
              <div className="col col-md-6">
                {/* Backend accept either null or valid ministry names. Empty string is not an accepted value. Hence conversions below */}
                <Dropdown
                  id="ministry-select"
                  value={intakeForm?.ministry || ''} // null to empty string conversion
                  label="Ministry"
                  options={MinistryList}
                  changeHandler={
                    (e) =>
                      stateChangeHandler(e?.target?.value || null, 'ministry') // empty string to null conversion
                  }
                  required={true}
                />
                {validationMessage.piaMinistry && (
                  <p className="error-text ">{validationMessage.piaMinistry}</p>
                )}
              </div>
              <div className="col">
                <InputText
                  label="Branch"
                  value={intakeForm?.branch}
                  required={true}
                  onChange={(e) => stateChangeHandler(e.target.value, 'branch')}
                />
                {validationMessage.piaBranch && (
                  <p className="error-text "> {validationMessage.piaBranch}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputText
                  label="Initiative lead name"
                  id="leadName"
                  value={intakeForm?.leadName}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'leadName')
                  }
                  required={false}
                />
              </div>
              <div className="col">
                <InputText
                  label="Initiative lead email"
                  id="leadEmail"
                  value={intakeForm?.leadEmail}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'leadEmail')
                  }
                  required={false}
                  type="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputText
                  label="Initiative lead title"
                  id="leadTitle"
                  value={intakeForm?.leadTitle}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'leadTitle')
                  }
                  required={false}
                />
              </div>
            </div>
            <ViewComments
              count={commentCount?.[PiaSections.INTAKE_GENERAL_INFORMATION]}
              path={PiaSections.INTAKE_GENERAL_INFORMATION}
            />
          </div>
        )}
      </section>

      <IntakeInitiativeDescription
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        stateChangeHandler={stateChangeHandler}
        validationMessage={validationMessage}
        selectedSection={selectedSection}
        commentCount={commentCount}
      />

      <IntakeInitiativeScope
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        stateChangeHandler={stateChangeHandler}
        selectedSection={selectedSection}
        commentCount={commentCount}
      />

      <IntakeInitiativeDetails
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        stateChangeHandler={stateChangeHandler}
        selectedSection={selectedSection}
        commentCount={commentCount}
      />

      <IntakePersonalInformation
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        pia={pia}
        stateChangeHandler={stateChangeHandler}
        commentCount={commentCount}
        handlePIOptionChange={handlePIOptionChange}
      />
    </>
  );
};
