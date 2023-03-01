import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { isMPORole } from '../../../../utils/helper.util';
import List, { InputTextProps } from '../../../common/List';
import Radio from '../../../common/Radio';
import {
  IStoredPersonalInformation,
  PrivacyRisk,
  ServiceProviderDetails,
} from './interfaces';
import Messages from './messages';

const StoredPersonalInformation = () => {
  const navigate = useNavigate();

  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [storingPersonalInformationForm, setstoringPersonalInformationForm] =
    useState(
      pia?.storedPersonalInformation || {
        personalInformation: {
          storedOutsideCanada: YesNoInput.YES,
          whereDetails: '',
        },
        sensitivePersonalInformation: {
          doesInvolve: YesNoInput.YES,
          disclosedOutsideCanada: YesNoInput.YES,
        },
        disclosuresOutsideCanada: {
          storage: {
            sensitiveInfoStoredByServiceProvider: YesNoInput.YES,
            serviceProviderList: [],
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
            privacyRisks: [],
          },
        },
      },
    );

  const stateChangeHandler = (
    value: any,
    key: keyof IStoredPersonalInformation,
  ) => {
    setstoringPersonalInformationForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(
      storingPersonalInformationForm,
      'storedPersonalInformation',
    );
  };

  const [personalInformation, setPersonalInformation] = useState({
    storedOutsideCanada: YesNoInput.YES,
    whereDetails: '',
  });

  const [sensitivePersonalInformation, setSensitivePersonalInformation] =
    useState({
      doesInvolve: YesNoInput.YES,
      disclosedOutsideCanada: YesNoInput.YES,
    });

  const [disclosuresOutsideCanada, setDisclosuresOutsideCanada] = useState({
    storage: {
      sensitiveInfoStoredByServiceProvider: YesNoInput.YES,
      serviceProviderList: [],
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
      privacyRisks: [],
    },
  });

  const [serviceProviders, setServiceProviders] = useState<
    Array<ServiceProviderDetails>
  >(
    storingPersonalInformationForm?.disclosuresOutsideCanada.storage
      .serviceProviderList.length > 0
      ? storingPersonalInformationForm?.disclosuresOutsideCanada.storage
          .serviceProviderList
      : [
          {
            name: '',
            cloudInfraName: '',
            details: '',
          },
          {
            name: '',
            cloudInfraName: '',
            details: '',
          },
          {
            name: '',
            cloudInfraName: '',
            details: '',
          },
          {
            name: '',
            cloudInfraName: '',
            details: '',
          },
        ],
  );

  const [listServiceProvidersRows, setListServiceProvidersRows] = useState<
    Array<InputTextProps[]>
  >(
    serviceProviders.map((provider) => [
      {
        value: provider.name,
        id: 'one',
      },
      {
        value: provider.cloudInfraName,
        id: 'two',
      },
      {
        value: provider.details,
        id: 'three',
      },
    ]),
  );

  const addServiceProvidersRow = () => {
    setListServiceProvidersRows([
      ...listServiceProvidersRows,
      [
        { value: '', id: 'one' },
        { value: '', id: 'two' },
        { value: '', id: 'three' },
      ],
    ]);
    setServiceProviders([
      ...serviceProviders,
      {
        name: '',
        cloudInfraName: '',
        details: '',
      },
    ]);
  };

  const removeServiceProvidersRow = (index: number) => {
    const newData = [...listServiceProvidersRows];
    newData.splice(index, 1);
    setListServiceProvidersRows(newData);
    serviceProviders.splice(index, 1);
    setServiceProviders(serviceProviders);
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const listServiceProvidersHeaders = [
    {
      name: Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
        .Name.en,
    },
    {
      name: Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
        .CloudInfrastructure.en,
    },
    {
      name: Messages.AssessmentOfDisclosures.ServiceProviderTableColumnHeaders
        .StorageDetails.en,
    },
  ];

  const [risks, setRisks] = useState<Array<PrivacyRisk>>(
    storingPersonalInformationForm?.disclosuresOutsideCanada.risks.privacyRisks
      .length > 0
      ? storingPersonalInformationForm?.disclosuresOutsideCanada.risks
          .privacyRisks
      : [
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
  );

  const [listRisksRows, setListRisksRows] = useState<Array<InputTextProps[]>>(
    risks.map((risk) => [
      { value: risk.risk, id: 'one' },
      { value: risk.impact, id: 'two' },
      { value: risk.likelihoodOfUnauthorizedAccess, id: 'three' },
      { value: risk.levelOfPrivacyRisk, id: 'four' },
      { value: risk.riskResponse, id: 'five' },
      { value: risk.outstandingRisk, id: 'six' },
    ]),
  );

  const addRisksRow = () => {
    setListRisksRows([
      ...listRisksRows,
      [
        { value: '', id: 'one' },
        { value: '', id: 'two' },
        { value: '', id: 'three' },
        { value: '', id: 'four' },
      ],
    ]);
    setRisks([
      ...risks,
      {
        risk: '',
        impact: '',
        likelihoodOfUnauthorizedAccess: '',
        levelOfPrivacyRisk: '',
        riskResponse: '',
        outstandingRisk: '',
      },
    ]);
  };

  const removeRisksRow = (index: number) => {
    const newData = [...listServiceProvidersRows];
    newData.splice(index, 1);
    setListRisksRows(newData);
    risks.splice(index, 1);
    setRisks(risks);
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const listRisksHeaders = [
    { name: Messages.Risks.RisksTableColumnHeaders.PrivacyRisk.en },
    { name: Messages.Risks.RisksTableColumnHeaders.Impact.en },
    {
      name: Messages.Risks.RisksTableColumnHeaders.LikelihoodOfUnauthorized.en,
    },
    { name: Messages.Risks.RisksTableColumnHeaders.LevelOfPrivacyRisk.en },
    { name: Messages.Risks.RisksTableColumnHeaders.RiskResponse.en },
    { name: Messages.Risks.RisksTableColumnHeaders.OutstandingRisk.en },
  ];

  const handlePiOutsideCanadaChange = (e: any) => {
    setPersonalInformation({
      ...personalInformation,
      storedOutsideCanada: e.target.value,
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      personalInformation,
    });
    stateChangeHandler(personalInformation, 'personalInformation');
  };

  const handlePiWhereDetailsChange = (value: string) => {
    setPersonalInformation({
      ...personalInformation,
      whereDetails: value,
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      personalInformation,
    });
    stateChangeHandler(personalInformation, 'personalInformation');
  };

  const handleSensitivePersonalInformationDoesInvolveChange = (e: any) => {
    setSensitivePersonalInformation({
      ...sensitivePersonalInformation,
      doesInvolve: e.target.value,
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      sensitivePersonalInformation,
    });
    stateChangeHandler(
      sensitivePersonalInformation,
      'sensitivePersonalInformation',
    );
  };

  const handleDisclosuresOutsideCanadaStorageSensitiveInfoStoredByServiceProviderChange =
    (e: any) => {
      setDisclosuresOutsideCanada({
        ...disclosuresOutsideCanada,
        storage: {
          ...disclosuresOutsideCanada.storage,
          sensitiveInfoStoredByServiceProvider: e.target.value,
        },
      });
      setstoringPersonalInformationForm({
        ...storingPersonalInformationForm,
        disclosuresOutsideCanada,
      });
      stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
    };

  const handleDisclosuresOutsideCanadaStorageServiceProviderListChange = (
    e: any,
  ) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      storage: {
        ...disclosuresOutsideCanada.storage,
        serviceProviderList: e.target.value,
      },
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaStorageDisclosureDetailsChange = (
    value: string,
  ) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      storage: {
        ...disclosuresOutsideCanada.storage,
        disclosureDetails: value,
      },
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaStorageContractualTermsChange = (
    value: string,
  ) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      storage: {
        ...disclosuresOutsideCanada.storage,
        contractualTerms: value,
      },
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaContractRelyOnExistingChange = (
    e: any,
  ) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      contract: {
        ...disclosuresOutsideCanada.contract,
        relyOnExistingContract: e.target.value,
      },
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaContractEnterpriseServiceAccessDetailsChange =
    (value: string) => {
      setDisclosuresOutsideCanada({
        ...disclosuresOutsideCanada,
        contract: {
          ...disclosuresOutsideCanada.contract,
          enterpriseServiceAccessDetails: value,
        },
      });
      setstoringPersonalInformationForm({
        ...storingPersonalInformationForm,
        disclosuresOutsideCanada,
      });
      stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
    };

  const handleDisclosuresOutsideCanadaControlsChange = (value: string) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      controls: {
        ...disclosuresOutsideCanada.controls,
        unauthorizedAccessMeasures: value,
      },
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaTrackAccessChange = (value: string) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      trackAccess: {
        ...disclosuresOutsideCanada.trackAccess,
        trackAccessDetails: value,
      },
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaRisksChange = (e: any) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      risks: {
        ...disclosuresOutsideCanada.risks,
        privacyRisks: e.target.value,
      },
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleSensitivePersonalInformationDisclosedOutsideCanadaChange = (
    e: any,
  ) => {
    setSensitivePersonalInformation({
      ...sensitivePersonalInformation,
      disclosedOutsideCanada: e.target.value,
    });
    setstoringPersonalInformationForm({
      ...storingPersonalInformationForm,
      sensitivePersonalInformation,
    });
    stateChangeHandler(
      sensitivePersonalInformation,
      'sensitivePersonalInformation',
    );
  };

  const piOutsideOfCanadaRadios = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'pi-outside-canada',
      isDefault:
        storingPersonalInformationForm.personalInformation
          .storedOutsideCanada === YesNoInput.YES,
      changeHandler: (newValue: YesNoInput) =>
        handlePiOutsideCanadaChange(newValue),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'pi-outside-canada',
      isDefault:
        storingPersonalInformationForm.personalInformation
          .storedOutsideCanada === YesNoInput.NO,
      changeHandler: (newValue: YesNoInput) =>
        handlePiOutsideCanadaChange(newValue),
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
      changeHandler: (newValue: YesNoInput) =>
        handleSensitivePersonalInformationDoesInvolveChange(newValue),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-involved',
      isDefault:
        storingPersonalInformationForm.sensitivePersonalInformation
          .doesInvolve === YesNoInput.NO,
      changeHandler: (newValue: YesNoInput) =>
        handleSensitivePersonalInformationDoesInvolveChange(newValue),
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
      changeHandler: (newValue: YesNoInput) =>
        handleSensitivePersonalInformationDisclosedOutsideCanadaChange(
          newValue,
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-disclosed-outside-canada',
      isDefault:
        storingPersonalInformationForm.sensitivePersonalInformation
          .disclosedOutsideCanada === YesNoInput.NO,
      changeHandler: (newValue: YesNoInput) =>
        handleSensitivePersonalInformationDisclosedOutsideCanadaChange(
          newValue,
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
      changeHandler: (newValue: YesNoInput) =>
        handleDisclosuresOutsideCanadaContractRelyOnExistingChange(newValue),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'relying-on-existing-contract',
      isDefault:
        storingPersonalInformationForm.disclosuresOutsideCanada.contract
          .relyOnExistingContract === YesNoInput.NO,
      changeHandler: (newValue: YesNoInput) =>
        handleDisclosuresOutsideCanadaContractRelyOnExistingChange(newValue),
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
      changeHandler: (newValue: YesNoInput) =>
        handleDisclosuresOutsideCanadaStorageSensitiveInfoStoredByServiceProviderChange(
          newValue,
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-stored-by-service-provider',
      isDefault:
        storingPersonalInformationForm.disclosuresOutsideCanada.storage
          .sensitiveInfoStoredByServiceProvider === YesNoInput.NO,
      changeHandler: (newValue: YesNoInput) =>
        handleDisclosuresOutsideCanadaStorageSensitiveInfoStoredByServiceProviderChange(
          newValue,
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
          {personalInformation?.storedOutsideCanada === YesNoInput.YES && (
            <div className="pt-5">
              <p>{Messages.PersonalInformation.StoredWhere.en}</p>
              <MDEditor
                preview={isMPORole() ? 'edit' : 'preview'}
                value={personalInformation.whereDetails}
                defaultTabEnable={true}
                onChange={(value) => handlePiWhereDetailsChange(value || '')}
              />
            </div>
          )}
        </div>
      </section>
      {personalInformation?.storedOutsideCanada === YesNoInput.YES && (
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
            {sensitivePersonalInformation?.doesInvolve === YesNoInput.YES && (
              <div className="pt-5">
                <MDEditor.Markdown
                  source={
                    Messages.SensitivePersonalInformation
                      .SensitivePersonalInformationDislosedUnderFOIPPA.en
                  }
                />
                {sensitivePiDisclosedOutsideCanada.map((radio, index) => (
                  <Radio key={index} {...radio} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {sensitivePersonalInformation.disclosedOutsideCanada ===
        YesNoInput.NO && (
        <>
          <section className="form__section">
            <div className="py-3 form__section-header">
              <h3>{Messages.AssessmentOfDisclosures.H3Text.en}</h3>
              <MDEditor.Markdown
                source={Messages.AssessmentOfDisclosures.PText.en}
              />
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
              {disclosuresOutsideCanada?.storage
                .sensitiveInfoStoredByServiceProvider === YesNoInput.YES && (
                <div className="pt-5">
                  <List
                    data={listServiceProvidersRows}
                    columns={listServiceProvidersHeaders}
                    handleOnChange={
                      handleDisclosuresOutsideCanadaStorageServiceProviderListChange
                    }
                    addRow={addServiceProvidersRow}
                    removeRow={removeServiceProvidersRow}
                  />
                </div>
              )}
              <div className="pt-5">
                <p>{Messages.AssessmentOfDisclosures.DisclosureDetails.en}</p>
                <MDEditor
                  preview={isMPORole() ? 'edit' : 'preview'}
                  value={disclosuresOutsideCanada.storage.disclosureDetails}
                  defaultTabEnable={true}
                  onChange={(value) =>
                    handleDisclosuresOutsideCanadaStorageDisclosureDetailsChange(
                      value || '',
                    )
                  }
                />
              </div>
              <div className="pt-5">
                <div>
                  <p>{Messages.AssessmentOfDisclosures.ContractualTerms.en}</p>
                  <MDEditor.Markdown
                    source={
                      Messages.AssessmentOfDisclosures.ContractualTerms
                        .HelperText.en
                    }
                  />
                </div>
                <MDEditor
                  preview={isMPORole() ? 'edit' : 'preview'}
                  value={disclosuresOutsideCanada.storage.contractualTerms}
                  defaultTabEnable={true}
                  onChange={(value) =>
                    handleDisclosuresOutsideCanadaStorageContractualTermsChange(
                      value || '',
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
              {disclosuresOutsideCanada.contract.relyOnExistingContract ===
                YesNoInput.YES && (
                <div>
                  <MDEditor
                    preview={isMPORole() ? 'edit' : 'preview'}
                    value={
                      disclosuresOutsideCanada?.contract
                        .enterpriseServiceAccessDetails
                    }
                    defaultTabEnable={true}
                    onChange={(value) =>
                      handleDisclosuresOutsideCanadaContractEnterpriseServiceAccessDetailsChange(
                        value || '',
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
                  disclosuresOutsideCanada.controls.unauthorizedAccessMeasures
                }
                defaultTabEnable={true}
                onChange={(value) =>
                  handleDisclosuresOutsideCanadaControlsChange(value || '')
                }
              />
            </div>
          </section>
          <section className="form__section my-4">
            <div className="card-wrapper py-5 px-5">
              <p>{Messages.TrackAccess.TrackAccessDetails.en}</p>
              <MDEditor
                preview={isMPORole() ? 'edit' : 'preview'}
                value={disclosuresOutsideCanada.trackAccess.trackAccessDetails}
                defaultTabEnable={true}
                onChange={(value) =>
                  handleDisclosuresOutsideCanadaTrackAccessChange(value || '')
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
                <List
                  data={listRisksRows}
                  columns={listRisksHeaders}
                  handleOnChange={handleDisclosuresOutsideCanadaRisksChange}
                  addRow={addRisksRow}
                  removeRow={removeRisksRow}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </form>
  );
};

export default StoredPersonalInformation;
