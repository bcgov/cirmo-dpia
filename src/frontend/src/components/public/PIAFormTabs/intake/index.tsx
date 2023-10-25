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
  // Get the PIA form context from the parent component
  const {
    pia,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
    validationMessage,
    commentCount,
  } = useContext<IPiaFormContext>(PiaFormContext);

  // Call the access control function if it exists
  if (accessControl) accessControl();

  // Initialize the intake form state with the exported intake from PIA
  const [intakeForm, setIntakeForm] = useState<IPiaFormIntake>(
    exportIntakeFromPia(pia),
  );

  // Handle changes to the intake form state
  const stateChangeHandler = (value: any, key: keyof IPiaFormIntake) => {
    // Update the intake form state
    setIntakeForm((state) => ({ ...state, [key]: value }));
    // Call the PIA form context state change handler
    piaStateChangeHandler(value, key);
  };

  // Handle changes to the "Has added PI to data elements" option
  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the "Has added PI to data elements" option based on the selected value
    const value =
      event.target.value === 'Yes'
        ? true
        : event.target.value === "I'm not sure"
        ? null
        : false;
    stateChangeHandler(value, 'hasAddedPiToDataElements');
  };

  return (
    <>
      {/* Render the PIA information section */}
      <PIAInformation isReadOnly={isReadOnly} />

      {/* Render the intake general information section */}
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

      {/* Render the intake initiative description section */}
      <IntakeInitiativeDescription
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        stateChangeHandler={stateChangeHandler}
        validationMessage={validationMessage}
        selectedSection={selectedSection}
        commentCount={commentCount}
      />

      {/* Render the intake initiative scope section */}
      <IntakeInitiativeScope
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        stateChangeHandler={stateChangeHandler}
        selectedSection={selectedSection}
        commentCount={commentCount}
      />

      {/* Render the intake initiative details section */}
      <IntakeInitiativeDetails
        isReadOnly={isReadOnly}
        intakeForm={intakeForm}
        stateChangeHandler={stateChangeHandler}
        selectedSection={selectedSection}
        commentCount={commentCount}
      />

      {/* Render the intake personal information section */}
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
