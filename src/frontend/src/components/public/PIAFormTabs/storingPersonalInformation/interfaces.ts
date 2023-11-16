import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { RichTextContent } from '../types';

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

export interface IStoringPersonalInformation {
  personalInformation: {
    storedOutsideCanada: YesNoInput;
    whereDetails: RichTextContent;
  };
  sensitivePersonalInformation: {
    doesInvolve: YesNoInput;
    disclosedOutsideCanada: YesNoInput;
  };
  disclosuresOutsideCanada: {
    storage: {
      sensitiveInfoStoredByServiceProvider: YesNoInput;
      serviceProviderList: Array<ServiceProviderDetails>;
      disclosureDetails: RichTextContent;
      contractualTerms: RichTextContent;
    };
    contract: {
      relyOnExistingContract: YesNoInput;
      enterpriseServiceAccessDetails: RichTextContent;
    };
    controls: {
      unauthorizedAccessMeasures: RichTextContent;
    };
    trackAccess: {
      trackAccessDetails: RichTextContent;
    };
    risks: {
      privacyRisks: Array<PrivacyRisk>;
    };
  };
}

export interface StoringPersonalInformationProps {
  showComments?: boolean;
}
