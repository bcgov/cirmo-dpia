import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './helpers/messages';
import {
  IAccuracyCorrectionAndRetention,
  AccuracyCorrectionAndRetentionProps,
} from './accuracy-retention-interface';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import { getHaveProcessInPlace } from './helpers/haveProcessInPlaceHelper';
import { getWillDocument } from './helpers/willDocumentHelper';
import { getWillConductNotifications } from './helpers/willConductNotificationsHelper';
import { getWillProvideInformation } from './helpers/willProvideInformationHelper';
import { getHaveApprovedInfoSchedule } from './helpers/haveApprovedInfoScheduleHelper';
import { AccuracySection } from './components/AccuracySection';
import { CorrectionSection } from './components/CorrectionSection';
import { PersonalInformationSection } from './components/PersonalInformationSection';

export const AccuracyCorrectionAndRetention = ({
  showComments = true,
}: AccuracyCorrectionAndRetentionProps) => {
  // Get the PIA form context
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  // Call the access control function if it exists
  if (accessControl) accessControl();

  // Define the default state for the accuracy, correction, and retention sections
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

  // Get the initial form state from the PIA context
  const initialFormState = useMemo(
    () => pia.accuracyCorrectionAndRetention || defaultState,
    [defaultState, pia.accuracyCorrectionAndRetention],
  );

  // Define the state for the accuracy, correction, and retention sections
  const [
    accuracyCorrectionAndRetentionForm,
    setAccuracyCorrectionAndRetentionForm,
  ] = useState<IAccuracyCorrectionAndRetention>(initialFormState);

  // Define the state change handler function
  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setAccuracyCorrectionAndRetentionForm, path, value);
  };

  // Get the values for the "have process in place", "will document", and "will conduct notifications" fields
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

  // Get the values for the "will provide information" and "have approved information schedule" fields
  const willProvideInformation = getWillProvideInformation(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );
  const haveApprovedInfoSchedule = getHaveApprovedInfoSchedule(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

  // Pass the updated data to the parent for auto-save to work efficiently only if there are changes
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
        {/* Render the page title and description */}
        <h2>{Messages.PageTitle.en}</h2>
        <p>{Messages.PageDescription.en}</p>

        {/* Render the accuracy section */}
        <AccuracySection
          accuracyCorrectionAndRetentionForm={
            accuracyCorrectionAndRetentionForm
          }
          showComments={showComments}
          commentCount={commentCount}
          isReadOnly={isReadOnly}
          selectedSection={selectedSection}
          stateChangeHandler={stateChangeHandler}
        />

        {/* Render the correction section */}
        <CorrectionSection
          accuracyCorrectionAndRetentionForm={
            accuracyCorrectionAndRetentionForm
          }
          showComments={showComments}
          commentCount={commentCount}
          isReadOnly={isReadOnly}
          selectedSection={selectedSection}
          haveProcessinPlace={haveProcessinPlace}
          willDocument={willDocument}
          willConductNotifications={willConductNotifications}
        />

        {/* Render the personal information section */}
        <PersonalInformationSection
          accuracyCorrectionAndRetentionForm={
            accuracyCorrectionAndRetentionForm
          }
          showComments={showComments}
          commentCount={commentCount}
          isReadOnly={isReadOnly}
          selectedSection={selectedSection}
          stateChangeHandler={stateChangeHandler}
          willProvideInformation={willProvideInformation}
          haveApprovedInfoSchedule={haveApprovedInfoSchedule}
        />
      </form>
    </>
  );
};
