export const emptyJsonbValues = {
  collectionUseAndDisclosure: {
    steps: [],
    collectionNotice: {
      drafterInput: null,
      mpoInput: null,
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
      section1: {
        sensitiveInfoStoredByServiceProvider: null,
        serviceProviderList: [],
        disclosureDetails: null,
        contractualTerms: null,
      },
      section2: {
        relyOnExistingContract: null,
        enterpriseServiceAccessDetails: null,
      },
      section3: {
        unauthorizedAccessMeasures: null,
      },
      section4: {
        trackAccessDetails: null,
      },
      section5: {
        privacyRisks: [],
      },
    },
  },
  securityPersonalInformation: {
    digitalToolsAndSystems: {
      section1: {
        involveDigitalToolsAndSystems: null,
        haveSecurityAssessment: null,
      },
      section2: {
        onGovServers: null,
        whereDetails: null,
      },
    },
    accessToPersonalInformation: {
      onlyCertainRolesAccessInformation: null,
      accessApproved: null,
      useAuditLogs: null,
      additionalStrategies: null,
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
  personalInformationBanks: {
    resultingPIB: {
      willResultInPIB: null,
      descriptionInformationType: null,
      mainMinistryInvolved: null,
      managingPersonName: null,
      managingPersonPhone: null,
    },
  },
  additionalRisks: {
    risks: [],
  },
};
