export enum PiaSections {
  // Intake
  INTAKE_GENERAL_INFORMATION = 'intake.generalInformation',
  INTAKE_INITIATIVE_DETAILS_DESCRIPTIONS = 'intake.initiativeDetails.description',
  INTAKE_INITIATIVE_DETAILS_SCOPE = 'intake.initiativeDetails.scope',
  INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED = 'intake.initiativeDetails.dataElementsInvolved',
  INTAKE_PERSONAL_INFORMATION = 'intake.personalInformation',

  // Collection use and disclosure
  COLLECTION_USE_AND_DISCLOSURE_STEPS = 'collectionUseAndDisclosure.steps',
  COLLECTION_USE_AND_DISCLOSURE_COLLECTION_NOTICE = 'collectionUseAndDisclosure.collectionNotice',

  // Storing personal information
  STORING_PERSONAL_INFORMATION_PERSONAL_INFORMATION = 'storingPersonalInformation.personalInformation',
  STORING_PERSONAL_INFORMATION_SENSITIVE_PERSONAL_INFORMATION = 'storingPersonalInformation.sensitivePersonalInformation',
  STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_STORAGE = 'storingPersonalInformation.disclosuresOutsideCanada.storage',
  STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTRACT = 'storingPersonalInformation.disclosuresOutsideCanada.contract',
  STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_CONTROLS = 'storingPersonalInformation.disclosuresOutsideCanada.controls',
  STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_TRACK_ACCESS = 'storingPersonalInformation.disclosuresOutsideCanada.trackAccess',
  STORING_PERSONAL_INFORMATION_DISCLOSURES_OUTSIDE_CANADA_RISKS = 'storingPersonalInformation.disclosuresOutsideCanada.risks',

  // Security of personal information
  SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_TOOLS_AND_ASSESSMENT = 'securityPersonalInformation.digitalToolsAndSystems.toolsAndAssessment',
  SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_STORAGE = 'securityPersonalInformation.digitalToolsAndSystems.storage',
  SECURITY_OF_PERSONAL_INFORMATION_ACCESS_TO_PERSONAL_INFORMATION = 'securityPersonalInformation.digitalToolsAndSystems',

  // Accuracy, correction, and retention
  ACCURACY_CORRECTION_AND_RETENTION_ACCURACY = 'accuracyCorrectionAndRetention.accuracy',
  ACCURACY_CORRECTION_AND_RETENTION_CORRECTION = 'accuracyCorrectionAndRetention.correction',
  ACCURACY_CORRECTION_AND_RETENTION_RETENTION = 'accuracyCorrectionAndRetention.retention',

  // Agreements and information banks
  AGREEMENTS_AND_INFORMATION_BANKS_INFORMATION_SHARING_AGREEMENT = 'agreementsAndInformationBanks.informationSharingAgreement',
  AGREEMENTS_AND_INFORMATION_BANKS_PERSONAL_INFORMATION_BANKS = 'agreementsAndInformationBanks.personalInformationBanks',

  // Additional risks
  ADDITIONAL_RISKS_RISKS = 'additionalRisks.risks',
}
