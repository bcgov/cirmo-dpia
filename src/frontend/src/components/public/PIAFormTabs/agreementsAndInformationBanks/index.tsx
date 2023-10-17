import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './helper/messages';
import {
  IAgreementsAndInformationBanks,
  PIAAgreementsAndInformationBanksProps,
} from './helper/IAgreementsInfo-interface';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import { InformationSharingAgreementSection } from './components/InformationSharingAgreement';
import PersonalInformationBanksSection from './components/PersonalInformationBanks';
import { getInvolvesRadioHelper } from './helper/involveIsaRadioHelper';
import { getWillResultPIBRadio } from './helper/willResultPIBRadioHelper';

export const PIAAgreementsAndInformationBanks = ({
  showComments = true,
}: PIAAgreementsAndInformationBanksProps) => {
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  // Initialize the default state for agreements and information banks using the useMemo hook
  const defaultState: IAgreementsAndInformationBanks = useMemo(
    () => ({
      personalInformationBanks: {
        willResultInPIB: YesNoInput.YES,
        description: '',
        mainMinistryOrAgencyInvolved: '',
        otherGroupsInvolved: '',
        contactTitle: '',
        contactPhone: '',
      },
      informationSharingAgreement: {
        doesInvolveISA: YesNoInput.YES,
        description: '',
        mainMinistryOrAgencyInvolved: '',
        otherGroupsInvolved: '',
        contactTitle: '',
        contactPhone: '',
        startDate: null,
        endDate: null,
      },
    }),
    [],
  );

  // Create the initial form state for agreements and information banks
  const initialFormState = useMemo(
    () => pia.agreementsAndInformationBanks || defaultState,
    [defaultState, pia.agreementsAndInformationBanks],
  );

  // Initialize the 'agreementsAndInformationBanksForm' state using the initial form state
  const [
    agreementsAndInformationBanksForm,
    setAgreementsAndInformationBanksForm,
  ] = useState<IAgreementsAndInformationBanks>(initialFormState);

  // Define a state change handler function that allows modifying the 'agreementsAndInformationBanksForm'
  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setAgreementsAndInformationBanksForm, path, value);
  };

  // Get the 'InvolvesRadioHelper' and 'WillResultPIBRadio' using helper functions
  const InvolvesRadioHelper = getInvolvesRadioHelper(
    agreementsAndInformationBanksForm,
    stateChangeHandler,
  );

  const WillResultPIBRadio = getWillResultPIBRadio(
    agreementsAndInformationBanksForm,
    stateChangeHandler,
  );

  // pass updated data to the parent for efficient auto-save, but only if there are changes.
  useEffect(() => {
    if (!deepEqual(initialFormState, agreementsAndInformationBanksForm)) {
      piaStateChangeHandler(
        agreementsAndInformationBanksForm,
        'agreementsAndInformationBanks',
      );
    }
  }, [
    piaStateChangeHandler,
    agreementsAndInformationBanksForm,
    initialFormState,
  ]);

  return (
    <>
      <div>
        <h2 className="results-header">
          <b>{Messages.Headings.Title.en}</b>
        </h2>
        <h3 className="pt-4 pb-3">{Messages.InvolveISA.Headings.Title.en}</h3>
        {/* Render the Information Sharing Agreement section*/}
        <InformationSharingAgreementSection
          agreementsAndInformationBanksForm={agreementsAndInformationBanksForm}
          pia={pia}
          selectedSection={selectedSection}
          isReadOnly={isReadOnly}
          stateChangeHandler={stateChangeHandler}
          showComments={showComments}
          commentCount={commentCount}
          InvolvesRadioHelper={InvolvesRadioHelper}
        />
        <h3 className="pt-5">{Messages.ResultingPIB.Headings.Title.en}</h3>
        <p> {Messages.ResultingPIB.Headings.Description.en}</p>
        {/* Render the Personal Information Bank section */}
        <PersonalInformationBanksSection
          agreementsAndInformationBanksForm={agreementsAndInformationBanksForm}
          pia={pia}
          selectedSection={selectedSection}
          isReadOnly={isReadOnly}
          stateChangeHandler={stateChangeHandler}
          showComments={showComments}
          commentCount={commentCount}
          WillResultPIBRadio={WillResultPIBRadio}
        />
      </div>
    </>
  );
};

export default PIAAgreementsAndInformationBanks;
