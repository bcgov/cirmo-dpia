export const emptyJsonbValues = {
  collectionUseAndDisclosure: {
    steps: [],
    collectionNotice: {
      drafterInput: { content: null },
      mpoInput: { content: null },
    },
  },
  storingPersonalInformation: {
    personalInformation: {
      storedOutsideCanada: null,
      whereDetails: null,
    },
    sensitivePersonalInformation: {
      doesInvolve: null,
      disclosedOutsideCanada: null,
    },
    disclosuresOutsideCanada: {
      storage: {
        sensitiveInfoStoredByServiceProvider: null,
        serviceProviderList: [],
        disclosureDetails: null,
        contractualTerms: null,
      },
      contract: {
        relyOnExistingContract: null,
        enterpriseServiceAccessDetails: null,
      },
      controls: {
        unauthorizedAccessMeasures: null,
      },
      trackAccess: {
        trackAccessDetails: null,
      },
      risks: {
        privacyRisks: [],
      },
    },
  },
  securityPersonalInformation: {
    digitalToolsAndSystems: {
      toolsAndAssessment: {
        involveDigitalToolsAndSystems: null,
        haveSecurityAssessment: null,
      },
      storage: {
        onGovServers: null,
        whereDetails: { content: null },
      },
    },
    accessToPersonalInformation: {
      onlyCertainRolesAccessInformation: null,
      accessApproved: null,
      useAuditLogs: null,
      additionalStrategies: { content: null },
    },
  },
  accuracyCorrectionAndRetention: {
    accuracy: {
      description: null,
    },
    correction: {
      haveProcessInPlace: null,
      willDocument: null,
      willConductNotifications: null,
    },
    retention: {
      usePIForDecision: null,
      haveApprovedInfoSchedule: null,
      describeRetention: null,
    },
  },
  agreementsAndInformationBanks: {
    informationSharingAgreement: {
      doesInvolveISA: null,
      description: null,
      mainMinistryOrAgencyInvolved: null,
      otherGroupsInvolved: null,
      contactTitle: null,
      contactPhone: null,
      startDate: null,
      endDate: null,
    },
    personalInformationBanks: {
      willResultInPIB: null,
      description: null,
      mainMinistryOrAgencyInvolved: 'Citizen Services',
      otherGroupsInvolved: null,
      contactTitle: null,
      contactPhone: null,
    },
  },
  additionalRisks: {
    risks: [],
  },
};
