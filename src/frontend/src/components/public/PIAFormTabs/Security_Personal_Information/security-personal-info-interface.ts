export interface ISecurityPersonalInformation {
  digitalToolsAndSystems: {
    toolsAndAssessment: {
      involveDigitalToolsAndSystems: string | null;
      haveSecurityAssessment: string | null;
    };
    storage: {
      onGovServers: string | null;
      whereDetails: string | null;
    };
  };
  accessToPersonalInformation: {
    onlyCertainRolesAccessInformation: string | null;
    accessApproved: string | null;
    useAuditLogs: string | null;
    additionalStrategies: string | null;
  };
}
