import MDEditor from '@uiw/react-md-editor';
import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './helpers/messages';
import {
  IAccuracyCorrectionAndRetention,
  AccuracyCorrectionAndRetentionProps,
} from './accuracy-retention-interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import Radio from '../../../common/Radio';
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
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

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

  const willProvideInformation = getWillProvideInformation(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

  const haveApprovedInfoSchedule = getHaveApprovedInfoSchedule(
    accuracyCorrectionAndRetentionForm,
    stateChangeHandler,
  );

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
