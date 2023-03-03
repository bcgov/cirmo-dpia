import MDEditor from '@uiw/react-md-editor';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { isMPORole } from '../../../../utils/helper.util';
import { deepEqual } from '../../../../utils/object-comparison.util';
import List, { InputTextProps } from '../../../common/List';
import Radio from '../../../common/Radio';
import {
  IStoringPersonalInformation,
  PrivacyRisk,
  ServiceProviderDetails,
} from './interfaces';
import Messages from './messages';

const StoringPersonalInformation = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

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

  const stateChangeHandler = (
    value: any,
    key: keyof IStoringPersonalInformation,
  ) => {
    setStoringPersonalInformationForm((state) => ({
      ...state,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log(
      storingPersonalInformationForm.disclosuresOutsideCanada.storage
        .sensitiveInfoStoredByServiceProvider,
    );
    if (!deepEqual(initialFormState, storingPersonalInformationForm)) {
      console.log(storingPersonalInformationForm.sensitivePersonalInformation);
      piaStateChangeHandler(
        storingPersonalInformationForm,
        'storingPersonalInformation',
      );
    }
  }, [
    pia.storingPersonalInformation,
    piaStateChangeHandler,
    storingPersonalInformationForm,
    initialFormState,
  ]);

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
        { value: '', id: 'five' },
        { value: '', id: 'six' },
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
    const newData = [...listRisksRows];
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
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      personalInformation: {
        ...prevState.personalInformation,
        storedOutsideCanada: e.target.value,
      },
    }));
  };

  const handlePiWhereDetailsChange = (value: string) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      personalInformation: {
        ...prevState.personalInformation,
        whereDetails: value,
      },
    }));
  };

  const handleSensitivePersonalInformationDoesInvolveChange = (e: any) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      sensitivePersonalInformation: {
        ...prevState.sensitivePersonalInformation,
        doesInvolve: e.target.value,
      },
    }));
  };

  const handleDisclosuresOutsideCanadaStorageSensitiveInfoStoredByServiceProviderChange =
    (e: any) => {
      setStoringPersonalInformationForm((prevState) => ({
        ...prevState,
        disclosuresOutsideCanada: {
          ...prevState.disclosuresOutsideCanada,
          storage: {
            ...prevState.disclosuresOutsideCanada.storage,
            sensitiveInfoStoredByServiceProvider: e.target.value,
          },
        },
      }));
    };

  const handleDisclosuresOutsideCanadaStorageServiceProviderListChange = (
    e: any,
    row: number,
    col: number,
  ) => {
    const newData = listServiceProvidersRows.map((d, i) => {
      if (i === row) {
        d[col].value = e.target.value;
      }

      return d;
    });
    setListServiceProvidersRows(newData);
    const newServiceProviders = newData.map((item, index) => {
      serviceProviders[index].name = item[0].value;
      serviceProviders[index].cloudInfraName = item[1].value;
      serviceProviders[index].details = item[2].value;
      return serviceProviders;
    });
    setServiceProviders(newServiceProviders[0]);
  };

  const handleDisclosuresOutsideCanadaStorageDisclosureDetailsChange = (
    value: string,
  ) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      disclosuresOutsideCanada: {
        ...prevState.disclosuresOutsideCanada,
        storage: {
          ...prevState.disclosuresOutsideCanada.storage,
          disclosureDetails: value,
        },
      },
    }));
  };

  const handleDisclosuresOutsideCanadaStorageContractualTermsChange = (
    value: string,
  ) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      disclosuresOutsideCanada: {
        ...prevState.disclosuresOutsideCanada,
        storage: {
          ...prevState.disclosuresOutsideCanada.storage,
          contractualTerms: value,
        },
      },
    }));
  };

  const handleDisclosuresOutsideCanadaContractRelyOnExistingChange = (
    e: any,
  ) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      disclosuresOutsideCanada: {
        ...prevState.disclosuresOutsideCanada,
        contract: {
          ...prevState.disclosuresOutsideCanada.contract,
          relyOnExisitingContract: e.target.value,
        },
      },
    }));
  };

  const handleDisclosuresOutsideCanadaContractEnterpriseServiceAccessDetailsChange =
    (e: any) => {
      setStoringPersonalInformationForm((prevState) => ({
        ...prevState,
        disclosuresOutsideCanada: {
          ...prevState.disclosuresOutsideCanada,
          contract: {
            ...prevState.disclosuresOutsideCanada.contract,
            relyOnExistingContract: e.target.value,
          },
        },
      }));
    };

  const handleDisclosuresOutsideCanadaControlsUnauthorizedAccessChange = (
    e: any,
  ) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      disclosuresOutsideCanada: {
        ...prevState.disclosuresOutsideCanada,
        controls: {
          ...prevState.disclosuresOutsideCanada.controls,
          unauthorizedAccessMeasures: e.target.value,
        },
      },
    }));
  };

  const handleDisclosuresOutsideCanadaTrackAccessChange = (value: string) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      disclosuresOutsideCanada: {
        ...prevState.disclosuresOutsideCanada,
        trackAccess: {
          ...prevState.disclosuresOutsideCanada.trackAccess,
          trackAccessDetails: value,
        },
      },
    }));
  };

  const handleDisclosuresOutsideCanadaRisksChange = (
    e: any,
    row: number,
    col: number,
  ) => {
    const newData = listRisksRows.map((d, i) => {
      if (i === row) {
        d[col].value = e.target.value;
      }

      return d;
    });
    setListRisksRows(newData);
    const newRisks = newData.map((item, index) => {
      risks[index].risk = item[0].value;
      risks[index].impact = item[1].value;
      risks[index].likelihoodOfUnauthorizedAccess = item[2].value;
      risks[index].levelOfPrivacyRisk = item[3].value;
      risks[index].riskResponse = item[4].value;
      risks[index].outstandingRisk = item[5].value;
      return risks;
    });
    setRisks(newRisks[0]);
  };

  const handleSensitivePersonalInformationDisclosedOutsideCanadaChange = (
    e: any,
  ) => {
    setStoringPersonalInformationForm((prevState) => ({
      ...prevState,
      sensitivePersonalInformation: {
        ...prevState.sensitivePersonalInformation,
        disclosedOutsideCanada: e.target.value,
      },
    }));
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
      changeHandler: (e: any) =>
        handleSensitivePersonalInformationDisclosedOutsideCanadaChange(e),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-disclosed-outside-canada',
      isDefault:
        storingPersonalInformationForm.sensitivePersonalInformation
          .disclosedOutsideCanada === YesNoInput.NO,
      changeHandler: (e: any) =>
        handleSensitivePersonalInformationDisclosedOutsideCanadaChange(e),
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
      changeHandler: (e: any) =>
        handleDisclosuresOutsideCanadaStorageSensitiveInfoStoredByServiceProviderChange(
          e,
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
        handleDisclosuresOutsideCanadaStorageSensitiveInfoStoredByServiceProviderChange(
          e,
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
                onChange={(value) => handlePiWhereDetailsChange(value || '')}
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
      {storingPersonalInformationForm.sensitivePersonalInformation
        .disclosedOutsideCanada === YesNoInput.NO && (
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
              {storingPersonalInformationForm.disclosuresOutsideCanada.storage
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
                  value={
                    storingPersonalInformationForm.disclosuresOutsideCanada
                      .storage.disclosureDetails
                  }
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
                  value={
                    storingPersonalInformationForm.disclosuresOutsideCanada
                      .storage.contractualTerms
                  }
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
              {storingPersonalInformationForm.disclosuresOutsideCanada.contract
                .relyOnExistingContract === YesNoInput.YES && (
                <div>
                  <MDEditor
                    preview={isMPORole() ? 'edit' : 'preview'}
                    value={
                      storingPersonalInformationForm.disclosuresOutsideCanada
                        .contract.enterpriseServiceAccessDetails
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
                  storingPersonalInformationForm.disclosuresOutsideCanada
                    .controls.unauthorizedAccessMeasures
                }
                defaultTabEnable={true}
                onChange={(e) =>
                  handleDisclosuresOutsideCanadaControlsUnauthorizedAccessChange(
                    e,
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

export default StoringPersonalInformation;
