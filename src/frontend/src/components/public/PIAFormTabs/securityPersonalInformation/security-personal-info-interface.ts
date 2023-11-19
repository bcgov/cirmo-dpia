import { RichTextContent } from '../types';

export interface ISecurityPersonalInformation {
  digitalToolsAndSystems: {
    toolsAndAssessment: {
      involveDigitalToolsAndSystems: string;
      haveSecurityAssessment: string;
    };
    storage: {
      onGovServers: string;
      whereDetails: RichTextContent;
    };
  };
  accessToPersonalInformation: {
    onlyCertainRolesAccessInformation: string;
    accessApproved: string;
    useAuditLogs: string;
    additionalStrategies: RichTextContent;
  };
}

export interface SecurityPersonalInformationProps {
  showComments?: boolean;
}
