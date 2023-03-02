export interface ISecurityPersonalInformation {
  digitalToolsAndSystems: {
    toolsAndAssessment: {
      involveDigitalToolsAndSystems: string;
      haveSecurityAssessment: string;
    };
    storage: {
      onGovServers: string;
      whereDetails: string;
    };
  };
  accessToPersonalInformation: {
    onlyCertainRolesAccessInformation: string;
    accessApproved: string;
    useAuditLogs: string;
    additionalStrategies: string;
  };
}
