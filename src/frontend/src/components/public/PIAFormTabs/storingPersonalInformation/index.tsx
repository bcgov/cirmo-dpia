import { useContext, useEffect, useMemo, useState } from 'react';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { isMPORole } from '../../../../utils/user';
import { deepEqual } from '../../../../utils/object-comparison.util';
import Radio from '../../../common/Radio';
import {
  IStoringPersonalInformation,
  StoringPersonalInformationProps,
} from './interfaces';
import Messages from './messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { Table } from '../../../common/Table';
import { ColumnMetaData } from '../../../common/Table/interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import Callout from '../../../common/Callout';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

const StoringPersonalInformation = ({
  showComments = true,
}: StoringPersonalInformationProps) => {
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const personalInformation = useMemo(
    () => ({
      storedOutsideCanada: YesNoInput.YES,
      whereDetails: { content: '' },
    }),
    [],
  );

  const sensitivePersonalInformation = useMemo(
    () => ({
      doesInvolve: YesNoInput.YES,
      disclosedOutsideCanada: YesNoInput.YES,
    }),
    [],
  );

  const disclosuresOutsideCanada = useMemo(
    () => ({
      storage: {
        sensitiveInfoStoredByServiceProvider: YesNoInput.YES,
        serviceProviderList: [{ name: '', cloudInfraName: '', details: '' }],
        disclosureDetails: { content: '' },
        contractualTerms: { content: '' },
      },
      contract: {
        relyOnExistingContract: YesNoInput.YES,
        enterpriseServiceAccessDetails: { content: '' },
      },
      controls: {
        unauthorizedAccessMeasures: { content: '' },
      },
      trackAccess: {
        trackAccessDetails: { content: '' },
      },
      risks: {
        privacyRisks: [
          {
            risk: '',
            impact: '',
            likelihoodOfUnauthorizedAccess: '',
            levelOfPrivacyRisk: '',
            riskResponse: '',
            outstandingRisk: '',
          },
        ],
      },
    }),
    [],
  );

  const defaultState: IStoringPersonalInformation = useMemo(
    () => ({
      personalInformation: personalInformation,
      sensitivePersonalInformation: sensitivePersonalInformation,
      disclosuresOutsideCanada: disclosuresOutsideCanada,
    }),
    [
      disclosuresOutsideCanada,
      personalInformation,
      sensitivePersonalInformation,
    ],
  );

  const initialFormState = useMemo(
    () => pia.storingPersonalInformation || defaultState,
    [defaultState, pia.storingPersonalInformation],
  );

  const [storingPersonalInformationForm, setStoringPersonalInformationForm] =
    useState<IStoringPersonalInformation>(initialFormState);

  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setStoringPersonalInformationForm, path, value);
  };

  // State for rich text editors.
  const [whereDetails, setWhereDetails] = useState(
    storingPersonalInformationForm?.personalInformation.whereDetails?.content ??
      '',
  );
  const [disclosureDetails, setDisclosureDetails] = useState(
    storingPersonalInformationForm?.disclosuresOutsideCanada?.storage
      .disclosureDetails?.content ?? '',
  );
  const [contractualTerms, setContractualTerms] = useState(
    storingPersonalInformationForm?.disclosuresOutsideCanada?.storage
      .contractualTerms?.content ?? '',
  );
  const [enterpriseServiceAccessDetails, setEnterpriseServiceAccessDetails] =
    useState(
      storingPersonalInformationForm?.disclosuresOutsideCanada?.contract
        .enterpriseServiceAccessDetails?.content ?? '',
    );
  const [unauthorizedAccessMeasures, setUnauthorizedAccessMeasures] = useState(
    storingPersonalInformationForm?.disclosuresOutsideCanada?.controls
      .unauthorizedAccessMeasures?.content ?? '',
  );
  const [trackAccessDetails, setTrackAccessDetails] = useState(
    storingPersonalInformationForm?.disclosuresOutsideCanada?.trackAccess
      .trackAccessDetails.content ?? '',
  );

  // Update form state on rich text editor changes.
  useEffect(() => {
    stateChangeHandler(
      whereDetails,
      'personalInformation.whereDetails.content',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whereDetails]);
  useEffect(() => {
    stateChangeHandler(
      disclosureDetails,
      'disclosuresOutsideCanada.storage.disclosureDetails.content',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disclosureDetails]);
  useEffect(() => {
    stateChangeHandler(
      contractualTerms,
      'disclosuresOutsideCanada.storage.contractualTerms.content',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractualTerms]);
  useEffect(() => {
    stateChangeHandler(
      enterpriseServiceAccessDetails,
      'disclosuresOutsideCanada.contract.enterpriseServiceAccessDetails.content',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterpriseServiceAccessDetails]);
  useEffect(() => {
    stateChangeHandler(
      unauthorizedAccessMeasures,
      'disclosuresOutsideCanada.controls.unauthorizedAccessMeasures.content',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unauthorizedAccessMeasures]);
  useEffect(() => {
    stateChangeHandler(
      trackAccessDetails,
      'disclosuresOutsideCanada.trackAccess.trackAccessDetails.content',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackAccessDetails]);

  // Show the editor unless isReadOnly and whereDetails is empty.
  const showEditorWhereDetails = !(isReadOnly && whereDetails === '');
  //Show the editor unless isReadOnly and disclosureDetails is empty.
  const showEditorDisclosureDetails = !(isReadOnly && disclosureDetails === '');
  // Show the editor unless isReadOnly and contractualTerm is empty.
  const showEditorContractualTerms = !(isReadOnly && contractualTerms === '');
  // Show the editor unless isReadOnly and EnterpriseServiceAccessDetail is empty.
  const showEditorEnterpriseServiceAccessDetails = !(
    isReadOnly && enterpriseServiceAccessDetails === ''
  );
  // Show the editor unless isReadOnly and disclosureDetails is empty.
  const showEditorUnauthorizedAccessMeasures = !(
    isReadOnly && unauthorizedAccessMeasures === ''
  );
  // Show the editor unless isReadOnly and disclosureDetails is empty.
  const showEditorTrackAccessDetails = !(
    isReadOnly && trackAccessDetails === ''
  );

  const disclosuresOutsideCanadaStorageServiceProviderListColumns: Array<ColumnMetaData> =
    [
      {
        key: 'name',
        label:
          Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
            .Name.en,
      },
      {
        key: 'cloudInfraName',
        label:
          Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
            .CloudInfrastructure.en,
      },
      {
        key: 'details',
        label:
          Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
            .StorageDetails.en,
      },
    ];

  const disclosuresOutsideCanadaRisksPrivacyRisksColumns: Array<ColumnMetaData> =
    [
      {
        key: 'risk',
        label: Messages.Risks.RisksTableColumnHeaders.PrivacyRisk.en,
      },
      {
        key: 'impact',
        label: Messages.Risks.RisksTableColumnHeaders.Impact.en,
      },
      {
        key: 'likelihoodOfUnauthorizedAccess',
        label:
          Messages.Risks.RisksTableColumnHeaders.LikelihoodOfUnauthorized.en,
      },
      {
        key: 'levelOfPrivacyRisk',
        label: Messages.Risks.RisksTableColumnHeaders.LevelOfPrivacyRisk.en,
      },
      {
        key: 'riskResponse',
        label: Messages.Risks.RisksTableColumnHeaders.RiskResponse.en,
      },
      {
        key: 'outstandingRisk',
        label: Messages.Risks.RisksTableColumnHeaders.OutstandingRisk.en,
      },
    ];

  const piOutsideOfCanadaRadios = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'pi-outside-canada',
      groupLabel: 'Is any personal information stored outside of Canada?',
      isDefault:
        storingPersonalInformationForm.personalInformation
          .storedOutsideCanada === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'personalInformation.storedOutsideCanada',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'pi-outside-canada',
      groupLabel: 'Is any personal information stored outside of Canada?',
      isDefault:
        storingPersonalInformationForm.personalInformation
          .storedOutsideCanada === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'personalInformation.storedOutsideCanada',
        ),
    },
  ];

  const sensitivePiInvolved = [
    {
      index: 1,
      value: YesNoInput.YES,
      isDefault:
        storingPersonalInformationForm.sensitivePersonalInformation
          .doesInvolve === YesNoInput.YES,
      groupName: 'sensitive-pi-involved',
      groupLabel:
        'Does your initiative involve sensitive personal information?',
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'sensitivePersonalInformation.doesInvolve',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-involved',
      groupLabel:
        'Does your initiative involve sensitive personal information?',
      isDefault:
        storingPersonalInformationForm.sensitivePersonalInformation
          .doesInvolve === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'sensitivePersonalInformation.doesInvolve',
        ),
    },
  ];

  const sensitivePiDisclosedOutsideCanada = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'sensitive-pi-disclosed-outside-canada',
      groupLabel:
        'Is the sensitive personal information being disclosed outside of Canada under FOIPPA section 33(2)(f)?',
      isDefault:
        storingPersonalInformationForm.sensitivePersonalInformation
          .disclosedOutsideCanada === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'sensitivePersonalInformation.disclosedOutsideCanada',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-disclosed-outside-canada',
      groupLabel:
        'Is the sensitive personal information being disclosed outside of Canada under FOIPPA section 33(2)(f)?',
      isDefault:
        storingPersonalInformationForm.sensitivePersonalInformation
          .disclosedOutsideCanada === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'sensitivePersonalInformation.disclosedOutsideCanada',
        ),
    },
  ];

  const relyingOnExistingContract = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'relying-on-existing-contract',
      groupLabel:
        'Are you relying on an existing contract, such as an enterprise offering from the Office of the Chief Information Officer (OCIO)?',
      isDefault:
        storingPersonalInformationForm.disclosuresOutsideCanada.contract
          .relyOnExistingContract === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'disclosuresOutsideCanada.contract.relyOnExistingContract',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'relying-on-existing-contract',
      groupLabel:
        'Are you relying on an existing contract, such as an enterprise offering from the Office of the Chief Information Officer (OCIO)?',
      isDefault:
        storingPersonalInformationForm.disclosuresOutsideCanada.contract
          .relyOnExistingContract === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'disclosuresOutsideCanada.contract.relyOnExistingContract',
        ),
    },
  ];

  const sensitivePiStoredByServiceProvider = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'sensitive-pi-stored-by-service-provider',
      groupLabel:
        'Is the sensitive personal information stored by a service provider?',
      isDefault:
        storingPersonalInformationForm.disclosuresOutsideCanada.storage
          .sensitiveInfoStoredByServiceProvider === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'disclosuresOutsideCanada.storage.sensitiveInfoStoredByServiceProvider',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-stored-by-service-provider',
      groupLabel:
        'Is the sensitive personal information stored by a service provider?',
      isDefault:
        storingPersonalInformationForm.disclosuresOutsideCanada.storage
          .sensitiveInfoStoredByServiceProvider === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'disclosuresOutsideCanada.storage.sensitiveInfoStoredByServiceProvider',
        ),
    },
  ];

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, storingPersonalInformationForm)) {
      piaStateChangeHandler(
        storingPersonalInformationForm,
        'storingPersonalInformation',
      );
    }
  }, [piaStateChangeHandler, storingPersonalInformationForm, initialFormState]);

  return (
    <>
      <h2>{Messages.Heading.H2Text.en}</h2>
      <p>{Messages.Heading.PText.en}</p>
      <section className="form__section">
        <h3 className="py-3">{Messages.PersonalInformation.H3Text.en}</h3>
        <div
          className={`drop-shadow card p-4 p-md-5 ${
            selectedSection &&
            selectedSection ===
              PiaSections.STORING_PERSONAL_INFORMATION_PERSONAL_INFORMATION
              ? 'section-focus'
              : ''
          }`}
        >
          {!isReadOnly ? (
            <p className="text__font-weight--700">
              {Messages.PersonalInformation.StoredOutsideCanada.en}
            </p>
          ) : (
            <h4>{Messages.PersonalInformation.StoredOutsideCanada.en}</h4>
          )}
          {!isReadOnly ? (
            piOutsideOfCanadaRadios.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))
          ) : (
            <p>
              {storingPersonalInformationForm.personalInformation.storedOutsideCanada.charAt(
                0,
              )}
              {storingPersonalInformationForm.personalInformation.storedOutsideCanada
                .slice(1)
                .toLowerCase()}
            </p>
          )}
          {storingPersonalInformationForm.personalInformation
            .storedOutsideCanada === YesNoInput.YES && (
            <div className="pt-5">
              {!isReadOnly ? (
                <p className="text__font-weight--700">
                  {Messages.PersonalInformation.StoredWhere.en}
                </p>
              ) : (
                <h4>{Messages.PersonalInformation.StoredWhere.en}</h4>
              )}
              <div className="richText" id="PersonalInformationStorage">
                {showEditorWhereDetails ? (
                  <RichTextEditor
                    content={whereDetails}
                    setContent={setWhereDetails}
                    readOnly={isReadOnly}
                    textOnlyReadOnly={true}
                    aria-label="Personal Information storage location details"
                  />
                ) : (
                  <i>Not answered</i>
                )}
              </div>
            </div>
          )}
          {showComments && (
            <ViewComments
              count={
                commentCount?.[
                  PiaSections.STORING_PERSONAL_INFORMATION_PERSONAL_INFORMATION
                ]
              }
              path={
                PiaSections.STORING_PERSONAL_INFORMATION_PERSONAL_INFORMATION
              }
            />
          )}
        </div>
      </section>
      {storingPersonalInformationForm.personalInformation
        .storedOutsideCanada === YesNoInput.YES && (
        <section className="form__section">
          <h3 className="py-3">
            {Messages.SensitivePersonalInformation.H3Text.en}
          </h3>
          <div
            className={`drop-shadow card p-4 p-md-5  ${
              selectedSection &&
              selectedSection ===
                PiaSections.STORING_PERSONAL_INFORMATION_SENSITIVE_PERSONAL_INFORMATION
                ? 'section-focus'
                : ''
            }`}
          >
            {!isReadOnly ? (
              <p className="text__font-weight--700">
                {Messages.SensitivePersonalInformation.DoesInvolve.en}
              </p>
            ) : (
              <h4>{Messages.SensitivePersonalInformation.DoesInvolve.en}</h4>
            )}
            {!isReadOnly ? (
              sensitivePiInvolved.map((radio, index) => (
                <Radio key={index} {...radio} />
              ))
            ) : (
              <p>
                {storingPersonalInformationForm.sensitivePersonalInformation.doesInvolve.charAt(
                  0,
                )}
                {storingPersonalInformationForm.sensitivePersonalInformation.doesInvolve
                  .slice(1)
                  .toLowerCase()}
              </p>
            )}
            {storingPersonalInformationForm.sensitivePersonalInformation
              .doesInvolve === YesNoInput.YES && (
              <div className="pt-5 form__md-question">
                {!isReadOnly ? (
                  <p className="text__font-weight--700">
                    {
                      Messages.SensitivePersonalInformation
                        .SensitivePersonalInformationDisclosedUnderFOIPPA.en
                    }
                    <a
                      href={
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDisclosedUnderFOIPPA.Link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDisclosedUnderFOIPPA
                          .LinkText.en
                      }
                      <FontAwesomeIcon
                        icon={faUpRightFromSquare}
                        className="helper-text__link-icon"
                      />
                    </a>
                    &nbsp;?
                  </p>
                ) : (
                  <h4>
                    {
                      Messages.SensitivePersonalInformation
                        .SensitivePersonalInformationDisclosedUnderFOIPPA.en
                    }
                    <a
                      href={
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDisclosedUnderFOIPPA.Link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDisclosedUnderFOIPPA
                          .LinkText.en
                      }
                      <FontAwesomeIcon
                        icon={faUpRightFromSquare}
                        className="helper-text__link-icon"
                      />
                    </a>
                    &nbsp;?
                  </h4>
                )}
                {!isReadOnly ? (
                  sensitivePiDisclosedOutsideCanada.map((radio, index) => (
                    <Radio key={index} {...radio} />
                  ))
                ) : (
                  <p>
                    {storingPersonalInformationForm.sensitivePersonalInformation.disclosedOutsideCanada.charAt(
                      0,
                    )}
                    {storingPersonalInformationForm.sensitivePersonalInformation.disclosedOutsideCanada
                      .slice(1)
                      .toLowerCase()}
                  </p>
                )}
              </div>
            )}
            {showComments && (
              <ViewComments
                count={
                  commentCount?.[
                    PiaSections
                      .STORING_PERSONAL_INFORMATION_SENSITIVE_PERSONAL_INFORMATION
                  ]
                }
                path={
                  PiaSections.STORING_PERSONAL_INFORMATION_SENSITIVE_PERSONAL_INFORMATION
                }
              />
            )}
          </div>
        </section>
      )}
      {storingPersonalInformationForm.sensitivePersonalInformation
        .disclosedOutsideCanada === YesNoInput.NO &&
        storingPersonalInformationForm.personalInformation
          .storedOutsideCanada === YesNoInput.YES &&
        storingPersonalInformationForm.sensitivePersonalInformation
          .doesInvolve === YesNoInput.YES && (
          <>
            <section className="form__section">
              <div className="py-3 form__section-header">
                <h3>{Messages.AssessmentOfDisclosures.H3Text.en}</h3>
                {Messages.AssessmentOfDisclosures.HelperText.en}
                <a
                  href={Messages.AssessmentOfDisclosures.HelperText.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Messages.AssessmentOfDisclosures.HelperText.LinkText.en}
                  <FontAwesomeIcon
                    icon={faUpRightFromSquare}
                    className="helper-text__link-icon"
                  />
                </a>
                .
              </div>
              <div
                className={`drop-shadow card p-4 p-md-5 ${
                  selectedSection &&
                  selectedSection ===
                    PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_STORAGE
                    ? 'section-focus'
                    : ''
                }`}
              >
                {!isReadOnly ? (
                  <p className="text__font-weight--700">
                    {
                      Messages.AssessmentOfDisclosures
                        .SensitivePersonalInformationStoredByServiceProvider.en
                    }
                  </p>
                ) : (
                  <h4>
                    {
                      Messages.AssessmentOfDisclosures
                        .SensitivePersonalInformationStoredByServiceProvider.en
                    }
                  </h4>
                )}
                {!isReadOnly ? (
                  sensitivePiStoredByServiceProvider.map((radio, index) => (
                    <Radio key={index} {...radio} />
                  ))
                ) : (
                  <p>
                    {storingPersonalInformationForm.disclosuresOutsideCanada.storage.sensitiveInfoStoredByServiceProvider.charAt(
                      0,
                    )}
                    {storingPersonalInformationForm.disclosuresOutsideCanada.storage.sensitiveInfoStoredByServiceProvider
                      .slice(1)
                      .toLowerCase()}
                  </p>
                )}
                {storingPersonalInformationForm.disclosuresOutsideCanada.storage
                  .sensitiveInfoStoredByServiceProvider === YesNoInput.YES && (
                  <div className="pt-5">
                    <Table
                      data={
                        storingPersonalInformationForm.disclosuresOutsideCanada
                          .storage.serviceProviderList
                      }
                      columnsMeta={
                        disclosuresOutsideCanadaStorageServiceProviderListColumns
                      }
                      onChangeHandler={(updatedValue) =>
                        stateChangeHandler(
                          updatedValue,
                          'disclosuresOutsideCanada.storage.serviceProviderList',
                        )
                      }
                      format="row"
                      readOnly={isReadOnly}
                    />
                  </div>
                )}
                {storingPersonalInformationForm.disclosuresOutsideCanada.storage
                  .sensitiveInfoStoredByServiceProvider === YesNoInput.NO && (
                  <div className="pt-5">
                    {!isReadOnly ? (
                      <p className="text__font-weight--700">
                        {Messages.AssessmentOfDisclosures.DisclosureDetails.en}
                      </p>
                    ) : (
                      <h4>
                        {Messages.AssessmentOfDisclosures.DisclosureDetails.en}
                      </h4>
                    )}
                    <div className="richText" id="DisclosureDetails">
                      {showEditorDisclosureDetails ? (
                        <RichTextEditor
                          content={disclosureDetails}
                          setContent={setDisclosureDetails}
                          readOnly={!isMPORole() || isReadOnly}
                          textOnlyReadOnly={true}
                          aria-label="Disclosures Details Input Preview"
                        />
                      ) : (
                        <i>Not answered</i>
                      )}
                    </div>
                  </div>
                )}
                <div className="pt-5">
                  {!isReadOnly ? (
                    <>
                      <p className="text__font-weight--700">
                        {Messages.AssessmentOfDisclosures.ContractualTerms.en}
                      </p>
                      <div className="pb-4">
                        {
                          Messages.AssessmentOfDisclosures.ContractualTerms
                            .HelperText.PartOne.en
                        }
                        <a
                          href={
                            Messages.AssessmentOfDisclosures.ContractualTerms
                              .HelperText.PrivacyProtectionLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {
                            Messages.AssessmentOfDisclosures.ContractualTerms
                              .HelperText.PrivacyProtectionLinkText.en
                          }
                          <FontAwesomeIcon
                            icon={faUpRightFromSquare}
                            className="helper-text__link-icon"
                          />
                        </a>
                        {
                          Messages.AssessmentOfDisclosures.ContractualTerms
                            .HelperText.PartTwo.en
                        }
                        <a
                          href={
                            Messages.AssessmentOfDisclosures.ContractualTerms
                              .HelperText.PrivacyHelplineEmailLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {
                            Messages.AssessmentOfDisclosures.ContractualTerms
                              .HelperText.PrivacyHelplineEmailLinkText.en
                          }
                        </a>
                        {
                          Messages.AssessmentOfDisclosures.ContractualTerms
                            .HelperText.PartThree.en
                        }
                        <a
                          href={
                            Messages.AssessmentOfDisclosures.ContractualTerms
                              .HelperText.PrivacyHelplinePhoneLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {
                            Messages.AssessmentOfDisclosures.ContractualTerms
                              .HelperText.PrivacyHelplinePhoneLinkText.en
                          }
                        </a>
                        {
                          Messages.AssessmentOfDisclosures.ContractualTerms
                            .HelperText.PartFour.en
                        }
                      </div>
                    </>
                  ) : (
                    <h4>
                      {Messages.AssessmentOfDisclosures.ContractualTerms.en}
                    </h4>
                  )}
                  <div className="richText" id="ContractualTerms">
                    {showEditorContractualTerms ? (
                      <RichTextEditor
                        content={contractualTerms}
                        setContent={setContractualTerms}
                        readOnly={isReadOnly}
                        textOnlyReadOnly={true}
                        aria-label="Contractual Terms Textarea Input"
                      />
                    ) : (
                      <i>Not answered</i>
                    )}
                  </div>
                </div>
                {showComments && (
                  <ViewComments
                    count={
                      commentCount?.[
                        PiaSections
                          .STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_STORAGE
                      ]
                    }
                    path={
                      PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_STORAGE
                    }
                  />
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div
                className={`drop-shadow card p-4 p-md-5 ${
                  selectedSection &&
                  selectedSection ===
                    PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTRACT
                    ? 'section-focus'
                    : ''
                }`}
              >
                {!isReadOnly ? (
                  <p className="text__font-weight--700">
                    {Messages.Contract.RelyingOnExistingContract.en}
                  </p>
                ) : (
                  <h4>{Messages.Contract.RelyingOnExistingContract.en}</h4>
                )}
                {!isReadOnly ? (
                  relyingOnExistingContract.map((radio, index) => (
                    <Radio key={index} {...radio} />
                  ))
                ) : (
                  <p>
                    {storingPersonalInformationForm.disclosuresOutsideCanada.contract.relyOnExistingContract.charAt(
                      0,
                    )}
                    {storingPersonalInformationForm.disclosuresOutsideCanada.contract.relyOnExistingContract
                      .slice(1)
                      .toLowerCase()}
                  </p>
                )}
                {storingPersonalInformationForm.disclosuresOutsideCanada
                  .contract.relyOnExistingContract === YesNoInput.YES && (
                  <div className="pt-5">
                    {!isReadOnly ? (
                      <>
                        <p className="text__font-weight--700">
                          {Messages.Contract.EnterpriseService.en}
                        </p>
                        <div className="pb-4">
                          {Messages.Contract.EnterpriseService.HelperText.en}
                        </div>
                      </>
                    ) : (
                      <h4>{Messages.Contract.EnterpriseService.en}</h4>
                    )}
                    <div className="richText" id="EnterpriseServiceAccess">
                      {showEditorEnterpriseServiceAccessDetails ? (
                        <RichTextEditor
                          content={enterpriseServiceAccessDetails}
                          setContent={setEnterpriseServiceAccessDetails}
                          readOnly={isReadOnly}
                          textOnlyReadOnly={true}
                          aria-label="Enterprise Service Access Details Preview"
                        />
                      ) : (
                        <i>Not answered</i>
                      )}
                    </div>
                    {showComments && (
                      <ViewComments
                        count={
                          commentCount?.[
                            PiaSections
                              .STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTRACT
                          ]
                        }
                        path={
                          PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTRACT
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div
                className={`drop-shadow card p-4 p-md-5 ${
                  selectedSection &&
                  selectedSection ===
                    PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTROLS
                    ? 'section-focus'
                    : ''
                }`}
              >
                {!isReadOnly ? (
                  <p className="text__font-weight--700">
                    {Messages.Controls.WhatControlsAreInPlace.en}
                  </p>
                ) : (
                  <h4>{Messages.Controls.WhatControlsAreInPlace.en}</h4>
                )}
                <div className="richText" id="UnauthorizedAccessControls">
                  {showEditorUnauthorizedAccessMeasures ? (
                    <RichTextEditor
                      content={unauthorizedAccessMeasures}
                      setContent={setUnauthorizedAccessMeasures}
                      readOnly={isReadOnly}
                      textOnlyReadOnly={true}
                      aria-label="Unauthorized Access Controls for Sensitive Personal Information?"
                    />
                  ) : (
                    <i>Not answered</i>
                  )}
                </div>
                {showComments && (
                  <ViewComments
                    count={
                      commentCount?.[
                        PiaSections
                          .STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTROLS
                      ]
                    }
                    path={
                      PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTROLS
                    }
                  />
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div
                className={`drop-shadow card p-4 p-md-5  ${
                  selectedSection &&
                  selectedSection ===
                    PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_TRACK_ACCESS
                    ? 'section-focus'
                    : ''
                }`}
              >
                {!isReadOnly ? (
                  <p className="text__font-weight--700">
                    {Messages.TrackAccess.TrackAccessDetails.en}
                  </p>
                ) : (
                  <h4>{Messages.TrackAccess.TrackAccessDetails.en}</h4>
                )}
                <div className="richText" id="TrackAccessDetails">
                  {showEditorTrackAccessDetails ? (
                    <RichTextEditor
                      content={trackAccessDetails}
                      setContent={setTrackAccessDetails}
                      readOnly={isReadOnly}
                      textOnlyReadOnly={true}
                      aria-label="Track Access Details Preview"
                    />
                  ) : (
                    <i>Not answered</i>
                  )}
                </div>
                {showComments && (
                  <ViewComments
                    count={
                      commentCount?.[
                        PiaSections
                          .STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_TRACK_ACCESS
                      ]
                    }
                    path={
                      PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_TRACK_ACCESS
                    }
                  />
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div
                className={`drop-shadow card p-4 p-md-5 ${
                  selectedSection &&
                  selectedSection ===
                    PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_RISKS
                    ? 'section-focus'
                    : ''
                }`}
              >
                {!isReadOnly ? (
                  <>
                    <p className="text__font-weight--700">
                      {Messages.Risks.DescribePrivacyRisks.en}
                    </p>
                    <div className="pb-4">
                      source={Messages.Risks.DescribePrivacyRisks.HelperText.en}
                    </div>
                  </>
                ) : (
                  <h4>{Messages.Risks.DescribePrivacyRisks.en}</h4>
                )}
                <div className="pt-5">
                  <Table
                    data={
                      storingPersonalInformationForm.disclosuresOutsideCanada
                        .risks.privacyRisks
                    }
                    columnsMeta={
                      disclosuresOutsideCanadaRisksPrivacyRisksColumns
                    }
                    onChangeHandler={(updatedValue) =>
                      stateChangeHandler(
                        updatedValue,
                        'disclosuresOutsideCanada.risks.privacyRisks',
                      )
                    }
                    format="row"
                    readOnly={isReadOnly}
                  />
                </div>
                {showComments && (
                  <ViewComments
                    count={
                      commentCount?.[
                        PiaSections
                          .STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_RISKS
                      ]
                    }
                    path={
                      PiaSections.STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_RISKS
                    }
                  />
                )}
              </div>
              <div className="mt-5">
                <Callout
                  text={Messages.AssessmentOfDisclosures.CallOutText.en}
                  bgWhite
                />
              </div>
            </section>
          </>
        )}
    </>
  );
};

export default StoringPersonalInformation;
