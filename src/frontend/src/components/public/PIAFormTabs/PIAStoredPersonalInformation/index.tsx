import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, MouseEvent, useState } from 'react';
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
  // TODO: Add prop for making everything in readonly for the view version of the tab

  const navigate = useNavigate();

  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [storedPersonalInformationForm, setStoredPersonalInformationForm] =
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
    setStoredPersonalInformationForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(
      storedPersonalInformationForm,
      'storedPersonalInformation',
    );
  };

  const [personalInformation, setPersonalInformation] = useState({
    storedOutsideCanada: YesNoInput.YES,
    whereDetails: ' ',
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
    storedPersonalInformationForm?.disclosuresOutsideCanada.storage
      .serviceProviderList.length > 0
      ? storedPersonalInformationForm?.disclosuresOutsideCanada.storage
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

  const listServiceProvidersHeaders = [
    Messages.SectionThree.TableColumnHeaders.ColumnOne.en,
    Messages.SectionThree.TableColumnHeaders.ColumnTwo.en,
    Messages.SectionThree.TableColumnHeaders.ColumnThree.en,
  ];

  const [risks, setRisks] = useState<Array<PrivacyRisk>>(
    storedPersonalInformationForm?.disclosuresOutsideCanada.risks.privacyRisks
      .length > 0
      ? storedPersonalInformationForm?.disclosuresOutsideCanada.risks
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

  const listRisksHeaders = [
    Messages.SectionSeven.TableColumnHeaders.ColumnOne.en,
    Messages.SectionSeven.TableColumnHeaders.ColumnTwo.en,
    Messages.SectionSeven.TableColumnHeaders.ColumnThree.en,
    Messages.SectionSeven.TableColumnHeaders.ColumnFour.en,
    Messages.SectionSeven.TableColumnHeaders.ColumnFive.en,
    Messages.SectionSeven.TableColumnHeaders.ColumnSix.en,
  ];

  const handlePiOutsideCanadaChange = (e: any) => {
    setPersonalInformation({
      ...personalInformation,
      storedOutsideCanada: e.target.value,
    });
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
      personalInformation,
    });
    stateChangeHandler(personalInformation, 'personalInformation');
  };

  const handlePiWhereDetailsChange = (e: any) => {
    setPersonalInformation({
      ...personalInformation,
      whereDetails: e.target.value,
    });
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
      personalInformation,
    });
    stateChangeHandler(personalInformation, 'personalInformation');
  };

  const handleSensitivePersonalInformationDoesInvolveChange = (e: any) => {
    setSensitivePersonalInformation({
      ...sensitivePersonalInformation,
      doesInvolve: e.target.value,
    });
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
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
      setStoredPersonalInformationForm({
        ...storedPersonalInformationForm,
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
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaStorageDisclosureDetailsChange = (
    e: any,
  ) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      storage: {
        ...disclosuresOutsideCanada.storage,
        disclosureDetails: e.target.value,
      },
    });
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaStorageContractualTermsChange = (
    e: any,
  ) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      storage: {
        ...disclosuresOutsideCanada.storage,
        contractualTerms: e.target.value,
      },
    });
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
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
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaContractEnterpriseServiceAccessDetailsChange =
    (e: any) => {
      setDisclosuresOutsideCanada({
        ...disclosuresOutsideCanada,
        contract: {
          ...disclosuresOutsideCanada.contract,
          enterpriseServiceAccessDetails: e.target.value,
        },
      });
      setStoredPersonalInformationForm({
        ...storedPersonalInformationForm,
        disclosuresOutsideCanada,
      });
      stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
    };

  const handleDisclosuresOutsideCanadaControlsChange = (e: any) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      controls: {
        ...disclosuresOutsideCanada.controls,
        unauthorizedAccessMeasures: e.target.value,
      },
    });
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
      disclosuresOutsideCanada,
    });
    stateChangeHandler(disclosuresOutsideCanada, 'disclosuresOutsideCanada');
  };

  const handleDisclosuresOutsideCanadaTrackAccessChange = (e: any) => {
    setDisclosuresOutsideCanada({
      ...disclosuresOutsideCanada,
      trackAccess: {
        ...disclosuresOutsideCanada.trackAccess,
        trackAccessDetails: e.target.value,
      },
    });
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
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
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
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
    setStoredPersonalInformationForm({
      ...storedPersonalInformationForm,
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
      isDefault: true,
      changeHandler: (newValue: YesNoInput) =>
        handlePiOutsideCanadaChange(newValue),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'pi-outside-canada',
      isDefault: false,
      changeHandler: (newValue: YesNoInput) =>
        handlePiOutsideCanadaChange(newValue),
    },
  ];

  const sensitivePiInvolved = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'sensitive-pi-involved',
      isDefault: true,
      changeHandler: (newValue: YesNoInput) =>
        handleSensitivePersonalInformationDoesInvolveChange(newValue),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-involved',
      isDefault: false,
      changeHandler: (newValue: YesNoInput) =>
        handleSensitivePersonalInformationDoesInvolveChange(newValue),
    },
  ];

  const sensitivePiDisclosedOutsideCanada = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'sensitive-pi-disclosed-outside-canada',
      isDefault: true,
      changeHandler: (newValue: YesNoInput) =>
        handleSensitivePersonalInformationDisclosedOutsideCanadaChange(
          newValue,
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-disclosed-outside-canada',
      isDefault: false,
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
      isDefault: true,
      changeHandler: (newValue: YesNoInput) =>
        handleDisclosuresOutsideCanadaContractRelyOnExistingChange(newValue),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'relying-on-existing-contract',
      isDefault: false,
      changeHandler: (newValue: YesNoInput) =>
        handleDisclosuresOutsideCanadaContractRelyOnExistingChange(newValue),
    },
  ];

  const sensitivePiStoredByServiceProvider = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'sensitive-pi-stored-by-service-provider',
      isDefault: true,
      changeHandler: (newValue: YesNoInput) =>
        handleDisclosuresOutsideCanadaStorageSensitiveInfoStoredByServiceProviderChange(
          newValue,
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'sensitive-pi-stored-by-service-provider',
      isDefault: false,
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
        <h3 className="py-3">{Messages.SectionOne.H3Text.en}</h3>
        <div className="card-wrapper py-5 px-5">
          <div>
            <p>{Messages.SectionOne.QuestionOne.en}</p>
            {piOutsideOfCanadaRadios.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))}
          </div>
          <div className="pt-5">
            <p>{Messages.SectionOne.QuestionTwo.en}</p>
            <MDEditor
              preview={isMPORole() ? 'edit' : 'preview'}
              value={personalInformation.whereDetails}
              defaultTabEnable={true}
              onChange={handlePiWhereDetailsChange}
            />
          </div>
        </div>
      </section>
      <section className="form__section">
        <h3 className="py-3">{Messages.SectionTwo.H3Text.en}</h3>
        <div className="card-wrapper py-5 px-5">
          <div>
            <p>{Messages.SectionTwo.QuestionOne.en}</p>
            {sensitivePiInvolved.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))}
          </div>
          <div className="pt-5">
            <MDEditor.Markdown source={Messages.SectionTwo.QuestionTwo.en} />
            {sensitivePiDisclosedOutsideCanada.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))}
          </div>
        </div>
      </section>
      {sensitivePersonalInformation.disclosedOutsideCanada ===
        YesNoInput.NO && (
        <>
          <section className="form__section">
            <div className="py-3 form__section-header">
              <h3>{Messages.SectionThree.H3Text.en}</h3>
              <MDEditor.Markdown source={Messages.SectionThree.PText.en} />
            </div>
            <div className="card-wrapper py-5 px-5">
              <div>
                <p>{Messages.SectionThree.QuestionOne.en}</p>
                {sensitivePiStoredByServiceProvider.map((radio, index) => (
                  <Radio key={index} {...radio} />
                ))}
              </div>
              {disclosuresOutsideCanada.storage
                .sensitiveInfoStoredByServiceProvider === YesNoInput.YES && (
                <div className="pt-5">
                  <List
                    data={listServiceProvidersRows}
                    columnsName={listServiceProvidersHeaders}
                    handleOnChange={
                      handleDisclosuresOutsideCanadaStorageServiceProviderListChange
                    }
                    addRow={() => {}}
                    removeRow={() => {}}
                  />
                </div>
              )}
              <div className="pt-5">
                <p>{Messages?.SectionThree.QuestionTwo.en}</p>
                <MDEditor
                  preview={isMPORole() ? 'edit' : 'preview'}
                  value={disclosuresOutsideCanada.storage.disclosureDetails}
                  defaultTabEnable={true}
                  onChange={
                    handleDisclosuresOutsideCanadaStorageDisclosureDetailsChange
                  }
                />
              </div>
              <div className="pt-5">
                <div>
                  <p>{Messages?.SectionThree.QuestionThree.en}</p>
                  <MDEditor.Markdown
                    source={Messages.SectionThree.QuestionThree.HelperText.en}
                  />
                </div>
                <MDEditor
                  preview={isMPORole() ? 'edit' : 'preview'}
                  value={disclosuresOutsideCanada.storage.contractualTerms}
                  defaultTabEnable={true}
                  onChange={
                    handleDisclosuresOutsideCanadaStorageContractualTermsChange
                  }
                />
              </div>
            </div>
          </section>
          <section className="form__section my-4">
            <div className="card-wrapper py-5 px-5">
              <div>
                <p>{Messages.SectionFour.QuestionOne.en}</p>
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
                      disclosuresOutsideCanada.contract
                        .enterpriseServiceAccessDetails
                    }
                    defaultTabEnable={true}
                    onChange={
                      handleDisclosuresOutsideCanadaContractEnterpriseServiceAccessDetailsChange
                    }
                  />
                </div>
              )}
            </div>
          </section>
          <section className="form__section my-4">
            <div className="card-wrapper py-5 px-5">
              <p>{Messages.SectionFive.QuestionOne.en}</p>
              <MDEditor
                preview={isMPORole() ? 'edit' : 'preview'}
                value={
                  disclosuresOutsideCanada.controls.unauthorizedAccessMeasures
                }
                defaultTabEnable={true}
                onChange={handleDisclosuresOutsideCanadaControlsChange}
              />
            </div>
          </section>
          <section className="form__section my-4">
            <div className="card-wrapper py-5 px-5">
              <p>{Messages.SectionSix.QuestionOne.en}</p>
              <MDEditor
                preview={isMPORole() ? 'edit' : 'preview'}
                value={disclosuresOutsideCanada.trackAccess.trackAccessDetails}
                defaultTabEnable={true}
                onChange={handleDisclosuresOutsideCanadaTrackAccessChange}
              />
            </div>
          </section>
          <section className="form__section my-4">
            <div className="card-wrapper py-5 px-5">
              <div>
                <p>{Messages.SectionSeven.QuestionOne.en}</p>
                <MDEditor.Markdown
                  source={Messages.SectionSeven.QuestionOne.HelperText.en}
                />
              </div>
              <div>
                <List
                  data={listRisksRows}
                  columnsName={listRisksHeaders}
                  handleOnChange={handleDisclosuresOutsideCanadaRisksChange}
                  addRow={() => {}}
                  removeRow={() => {}}
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
