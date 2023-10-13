import { ChangeEvent, useContext, useState } from 'react';
import { exportIntakeFromPia } from './helper/extract-intake-from-pia.helper';
import { IPiaFormIntake } from './helper/pia-form-intake.interface';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import PIAInformation from './components/PIAInformation';
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
      <PIAInformation isReadOnly={isReadOnly} />

      <IntakeGeneralInformation
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        stateChangeHandler={stateChangeHandler}
        validationMessage={validationMessage}
        selectedSection={selectedSection}
        commentCount={commentCount}
        pia={pia}
        path={selectedSection}
      />

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
