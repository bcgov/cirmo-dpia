import MDEditor from '@uiw/react-md-editor';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { isMPORole } from '../../../../utils/helper.util';
import { deepEqual } from '../../../../utils/object-comparison.util';
import Radio from '../../../common/Radio';
import { IStoringPersonalInformation } from './interfaces';
import Messages from './messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { ColumnMetaData, Table } from '../../../common/Table';

const StoringPersonalInformation = () => {
  const [pia, piaStateChangeHandler, isReadOnly, accessControl] =
    useOutletContext<
      [IPiaForm, PiaStateChangeHandlerType, boolean, () => void]
    >();

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
        serviceProviderList: [
          { name: '', cloudInfraName: '', details: '' },
          { name: '', cloudInfraName: '', details: '' },
          { name: '', cloudInfraName: '', details: '' },
          { name: '', cloudInfraName: '', details: '' },
        ],
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
          {
            risk: '',
            impact: '',
            likelihoodOfUnauthorizedAccess: '',
            levelOfPrivacyRisk: '',
            riskResponse: '',
            outstandingRisk: '',
          },
          {
            risk: '',
            impact: '',
            likelihoodOfUnauthorizedAccess: '',
            levelOfPrivacyRisk: '',
            riskResponse: '',
            outstandingRisk: '',
          },
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
        displayName:
          Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
            .Name.en,
      },
      {
        key: 'cloudInfraName',
        displayName:
          Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
            .CloudInfrastructure.en,
      },
      {
        key: 'details',
        displayName:
          Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
            .StorageDetails.en,
      },
    ];

  const disclosuresOutsideCanadaRisksPrivacyRisksColumns: Array<ColumnMetaData> =
    [
      {
        key: 'risk',
        displayName: Messages.Risks.RisksTableColumnHeaders.PrivacyRisk.en,
      },
      {
        key: 'impact',
        displayName: Messages.Risks.RisksTableColumnHeaders.Impact.en,
      },
      {
        key: 'likelihoodOfUnauthorizedAccess',
        displayName:
          Messages.Risks.RisksTableColumnHeaders.LikelihoodOfUnauthorized.en,
      },
      {
        key: 'levelOfPrivacyRisk',
        displayName:
          Messages.Risks.RisksTableColumnHeaders.LevelOfPrivacyRisk.en,
      },
      {
        key: 'riskResponse',
        displayName: Messages.Risks.RisksTableColumnHeaders.RiskResponse.en,
      },
      {
        key: 'outstandingRisk',
        displayName: Messages.Risks.RisksTableColumnHeaders.OutstandingRisk.en,
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
        <div className="card-wrapper py-5 px-5">
          <div>
            <p>{Messages.PersonalInformation.StoredOutsideCanada.en}</p>
            {piOutsideOfCanadaRadios.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))}
          </div>
          {storingPersonalInformationForm.personalInformation
            .storedOutsideCanada === YesNoInput.YES && (
            <div className="pt-5">
              <p>{Messages.PersonalInformation.StoredWhere.en}</p>
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
          <div className="card-wrapper py-5 px-5">
            <div>
              <p>{Messages.SensitivePersonalInformation.DoesInvolve.en}</p>
              {sensitivePiInvolved.map((radio, index) => (
                <Radio key={index} {...radio} />
              ))}
            </div>
            {storingPersonalInformationForm.sensitivePersonalInformation
              .doesInvolve === YesNoInput.YES && (
              <div className="pt-5 form__md-question">
                <p>
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
                  ?
                </p>
                {sensitivePiDisclosedOutsideCanada.map((radio, index) => (
                  <Radio key={index} {...radio} />
                ))}
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
              <div className="card-wrapper py-5 px-5">
                <div>
                  <p>
                    {
                      Messages.AssessmentOfDisclosures
                        .SensitivePersonalInformationStoredByServiceProvider.en
                    }
                  </p>
                  {sensitivePiStoredByServiceProvider.map((radio, index) => (
                    <Radio key={index} {...radio} />
                  ))}
                </div>
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
                    />
                  </div>
                )}
                <div className="pt-5">
                  <p>{Messages.AssessmentOfDisclosures.DisclosureDetails.en}</p>
                  <MDEditor
                    preview={isMPORole() ? 'edit' : 'preview'}
                    value={
                      storingPersonalInformationForm.disclosuresOutsideCanada
                        .storage.disclosureDetails
                    }
                    defaultTabEnable={true}
                    onChange={(value) =>
                      stateChangeHandler(
                        value || '',
                        'disclosuresOutsideCanada.storage.disclosureDetails',
                      )
                    }
                  />
                </div>
                <div className="pt-5">
                  <div>
                    <p>
                      {Messages.AssessmentOfDisclosures.ContractualTerms.en}
                    </p>
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
                </div>
              </div>
            </section>
            <section className="form__section my-4">
              <div className="card-wrapper py-5 px-5">
                <div>
                  <p>{Messages.Contract.RelyingOnExistingContract.en}</p>
                  {relyingOnExistingContract.map((radio, index) => (
                    <Radio key={index} {...radio} />
                  ))}
                </div>
                {storingPersonalInformationForm.disclosuresOutsideCanada
                  .contract.relyOnExistingContract === YesNoInput.YES && (
                  <div className="pt-5">
                    <p>{Messages.Contract.EnterpriseService.en}</p>
                    {Messages.Contract.EnterpriseService.HelperText.en}
                    <MDEditor
                      preview={isMPORole() ? 'edit' : 'preview'}
                      value={
                        storingPersonalInformationForm.disclosuresOutsideCanada
                          .contract.enterpriseServiceAccessDetails || ''
                      }
                      defaultTabEnable={true}
                      onChange={(value) =>
                        stateChangeHandler(
                          value || '',
                          'disclosuresOutsideCanada.contract.enterpriseServiceAccessDetails',
                        )
                      }
                    />
                  </div>
                )}
              </div>
            </section>
            <section className="form__section my-4">
              <div className="card-wrapper py-5 px-5">
                <p>{Messages.Controls.WhatControlsAreInPlace.en}</p>
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
              </div>
            </section>
            <section className="form__section my-4">
              <div className="card-wrapper py-5 px-5">
                <p>{Messages.TrackAccess.TrackAccessDetails.en}</p>
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
              </div>
            </section>
            <section className="form__section my-4">
              <div className="card-wrapper py-5 px-5">
                <div>
                  <p>{Messages.Risks.DescribePrivacyRisks.en}</p>
                  <MDEditor.Markdown
                    source={Messages.Risks.DescribePrivacyRisks.HelperText.en}
                  />
                </div>
                <div>
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
