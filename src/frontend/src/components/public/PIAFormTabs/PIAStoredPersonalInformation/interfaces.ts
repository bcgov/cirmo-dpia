import { YesNoInput } from '../../../../types/enums/yes-no.enum';

export type PrivacyRisk = {
  risk: string;
  impact: string;
  likelihoodOfUnauthorizedAccess: string;
  levelOfPrivacyRisk: string;
  riskResponse: string;
  outstandingRisk: string;
};

export type ServiceProviderDetails = {
  name: string;
  cloudInfraName: string;
  details: string;
};

export interface IStoredPersonalInformation {
  personalInformation: {
    storedOutsideCanada: YesNoInput;
    whereDetails: string;
  };
  sensitivePersonalInformation: {
    doesInvolve: YesNoInput;
    disclosedOutsideCanada: YesNoInput;
  };
  disclosuresOutsideCanada: {
    storage: {
      sensitiveInfoStoredByServiceProvider: YesNoInput;
      serviceProviderList: Array<ServiceProviderDetails>;
      disclosureDetails: string;
      contractualTerms: string;
    };
    contract: {
      relyOnExistingContract: YesNoInput;
      enterpriseServiceAccessDetails: string;
    };
    controls: {
      unauthorizedAccessMeasures: string;
    };
    trackAccess: {
      trackAccessDetails: string;
    };
    risks: {
      privacyRisks: Array<PrivacyRisk>;
    };
  };
}
