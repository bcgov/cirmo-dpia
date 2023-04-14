import MDEditor from '@uiw/react-md-editor';
import { useContext, useEffect, useMemo, useState } from 'react';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { isMPORole } from '../../../../utils/helper.util';
import { deepEqual } from '../../../../utils/object-comparison.util';
import Radio from '../../../common/Radio';
import { IStoringPersonalInformation } from './interfaces';
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

const StoringPersonalInformation = () => {
  const { pia, piaStateChangeHandler, isReadOnly, accessControl } =
    useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const personalInformation = useMemo(
    () => ({
      storedOutsideCanada: YesNoInput.YES,
      whereDetails: '',
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
        disclosureDetails: '',
        contractualTerms: '',
      },
      contract: {
        relyOnExistingContract: YesNoInput.YES,
        enterpriseServiceAccessDetails: '',
      },
      controls: {
        unauthorizedAccessMeasures: '',
      },
      trackAccess: {
        trackAccessDetails: '',
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

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, storingPersonalInformationForm)) {
      piaStateChangeHandler(
        storingPersonalInformationForm,
        'storingPersonalInformation',
      );
    }
  }, [piaStateChangeHandler, storingPersonalInformationForm, initialFormState]);

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

  return (
    <form>
      <h2>{Messages.Heading.H2Text.en}</h2>
      <p>{Messages.Heading.PText.en}</p>
      <section className="form__section">
        <h3 className="py-3">{Messages.PersonalInformation.H3Text.en}</h3>
        <div className="drop-shadow card p-4 p-md-5">
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
              {!isReadOnly ? (
                <MDEditor
                  preview={isMPORole() ? 'edit' : 'preview'}
                  value={
                    storingPersonalInformationForm.personalInformation
                      .whereDetails
                  }
                  defaultTabEnable={true}
                  onChange={(value) =>
                    stateChangeHandler(
                      value || '',
                      'personalInformation.whereDetails',
                    )
                  }
                />
              ) : storingPersonalInformationForm.personalInformation
                  .whereDetails ? (
                <MDEditor.Markdown
                  source={
                    storingPersonalInformationForm.personalInformation
                      .whereDetails
                  }
                />
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          )}
        </div>
      </section>
      {storingPersonalInformationForm.personalInformation
        .storedOutsideCanada === YesNoInput.YES && (
        <section className="form__section">
          <h3 className="py-3">
            {Messages.SensitivePersonalInformation.H3Text.en}
          </h3>
          <div className="drop-shadow card p-4 p-md-5">
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
                        .SensitivePersonalInformationDislosedUnderFOIPPA.en
                    }
                    <a
                      href={
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDislosedUnderFOIPPA.Link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDislosedUnderFOIPPA
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
                        .SensitivePersonalInformationDislosedUnderFOIPPA.en
                    }
                    <a
                      href={
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDislosedUnderFOIPPA.Link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        Messages.SensitivePersonalInformation
                          .SensitivePersonalInformationDislosedUnderFOIPPA
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
              <div className="drop-shadow card p-4 p-md-5">
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
                    {!isReadOnly ? (
                      <MDEditor
                        preview={isMPORole() ? 'edit' : 'preview'}
                        value={
                          storingPersonalInformationForm
                            .disclosuresOutsideCanada.storage.disclosureDetails
                        }
                        defaultTabEnable={true}
                        onChange={(value) =>
                          stateChangeHandler(
                            value || '',
                            'disclosuresOutsideCanada.storage.disclosureDetails',
                          )
                        }
                      />
                    ) : storingPersonalInformationForm.disclosuresOutsideCanada
                        .storage.disclosureDetails ? (
                      <MDEditor.Markdown
                        source={
                          storingPersonalInformationForm
                            .disclosuresOutsideCanada.storage.disclosureDetails
                        }
                      />
                    ) : (
                      <p>
                        <i>Not answered</i>
                      </p>
                    )}
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
                  {!isReadOnly ? (
                    <MDEditor
                      preview={isMPORole() ? 'edit' : 'preview'}
                      value={
                        storingPersonalInformationForm.disclosuresOutsideCanada
                          .storage.contractualTerms
                      }
                      defaultTabEnable={true}
                      onChange={(value) =>
                        stateChangeHandler(
                          value || '',
                          'disclosuresOutsideCanada.storage.contractualTerms',
                        )
                      }
                    />
                  ) : storingPersonalInformationForm.disclosuresOutsideCanada
                      .storage.contractualTerms ? (
                    <MDEditor.Markdown
                      source={
                        storingPersonalInformationForm.disclosuresOutsideCanada
                          .storage.contractualTerms
                      }
                    />
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section className="form__section my-4">
              <div className="drop-shadow card p-4 p-md-5">
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
                    {!isReadOnly ? (
                      <MDEditor
                        preview={isMPORole() ? 'edit' : 'preview'}
                        value={
                          storingPersonalInformationForm
                            .disclosuresOutsideCanada.contract
                            .enterpriseServiceAccessDetails || ''
                        }
                        defaultTabEnable={true}
                        onChange={(value) =>
                          stateChangeHandler(
                            value || '',
                            'disclosuresOutsideCanada.contract.enterpriseServiceAccessDetails',
                          )
                        }
                      />
                    ) : storingPersonalInformationForm.disclosuresOutsideCanada
                        .contract.enterpriseServiceAccessDetails ? (
                      <MDEditor.Markdown
                        source={
                          storingPersonalInformationForm
                            .disclosuresOutsideCanada.contract
                            .enterpriseServiceAccessDetails || ''
                        }
                      />
                    ) : (
                      <p>
                        <i>Not answered</i>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div className="drop-shadow card p-4 p-md-5">
                {!isReadOnly ? (
                  <p className="text__font-weight--700">
                    {Messages.Controls.WhatControlsAreInPlace.en}
                  </p>
                ) : (
                  <h4>{Messages.Controls.WhatControlsAreInPlace.en}</h4>
                )}
                {!isReadOnly ? (
                  <MDEditor
                    preview={isMPORole() ? 'edit' : 'preview'}
                    value={
                      storingPersonalInformationForm.disclosuresOutsideCanada
                        .controls.unauthorizedAccessMeasures
                    }
                    defaultTabEnable={true}
                    onChange={(value) =>
                      stateChangeHandler(
                        value || '',
                        'disclosuresOutsideCanada.controls.unauthorizedAccessMeasures',
                      )
                    }
                  />
                ) : storingPersonalInformationForm.disclosuresOutsideCanada
                    .controls.unauthorizedAccessMeasures ? (
                  <MDEditor.Markdown
                    source={
                      storingPersonalInformationForm.disclosuresOutsideCanada
                        .controls.unauthorizedAccessMeasures
                    }
                  />
                ) : (
                  <p>
                    <i>Not answered</i>
                  </p>
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div className="drop-shadow card p-4 p-md-5">
                {!isReadOnly ? (
                  <p className="text__font-weight--700">
                    {Messages.TrackAccess.TrackAccessDetails.en}
                  </p>
                ) : (
                  <h4>{Messages.TrackAccess.TrackAccessDetails.en}</h4>
                )}
                {!isReadOnly ? (
                  <MDEditor
                    preview={isMPORole() ? 'edit' : 'preview'}
                    value={
                      storingPersonalInformationForm.disclosuresOutsideCanada
                        .trackAccess.trackAccessDetails
                    }
                    defaultTabEnable={true}
                    onChange={(value) =>
                      stateChangeHandler(
                        value || '',
                        'disclosuresOutsideCanada.trackAccess.trackAccessDetails',
                      )
                    }
                  />
                ) : storingPersonalInformationForm.disclosuresOutsideCanada
                    .trackAccess.trackAccessDetails ? (
                  <MDEditor.Markdown
                    source={
                      storingPersonalInformationForm.disclosuresOutsideCanada
                        .trackAccess.trackAccessDetails
                    }
                  />
                ) : (
                  <p>
                    <i>Not answered</i>
                  </p>
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div className="drop-shadow card p-4 p-md-5">
                {!isReadOnly ? (
                  <>
                    <p className="text__font-weight--700">
                      {Messages.Risks.DescribePrivacyRisks.en}
                    </p>
                    <MDEditor.Markdown
                      source={Messages.Risks.DescribePrivacyRisks.HelperText.en}
                    />
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
              </div>
            </section>
          </>
        )}
    </form>
  );
};

export default StoringPersonalInformation;
