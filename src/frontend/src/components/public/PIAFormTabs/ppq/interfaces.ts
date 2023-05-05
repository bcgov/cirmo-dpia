export interface IPPQ {
  hasCommonProgram: boolean;
  hasDataLinking: boolean;
  hasCloudTechnology: boolean;
  hasPotentialPublicInterest: boolean;
  hasContactOrLicenseReview: boolean;
  hasBcServicesCardOnboarding: boolean;
  hasAiOrMl: boolean;
  hasInitiativeOther: boolean;
  initiativeOtherDetails?: string;
  proposedDeadlineAvailable?: string;
  proposedDeadline?: string | null;
  proposedDeadlineReason?: string;
  otherCpoConsideration?: string;
}
export interface IPPQProps {
  printPreview?: boolean;
}
export const OtherFactor = [
  {
    label: 'Common or integrated program agreement',
    value: 'hasCommonProgram',
    tooltip: false,
    tooltipText: `A CIPA is an agreement that allows two or more public bodies to share personal information 
    for the purpose of providing a service.`,
  },
  {
    label:
      'Cloud technology (if no corporate PIA has been completed by the CPO)',
    value: 'hasCloudTechnology',
    tooltip: false,
    tooltipText: `Cloud technology means a service provided on-demand over the internet. If you access a 
    service through a web browser, that’s a good indication that you’re using a cloud service. If you’re 
    working on a contract that includes software-, infrastructure- or platform-as-a-service, you’re using 
    cloud.`,
  },
  {
    label: 'Potential public interest in the initiative',
    value: 'hasPotentialPublicInterest',
  },
  {
    label: 'Data-linking',
    value: 'hasDataLinking',
    tooltip: false,
    tooltipText:
      'While we wait for more information about data-linking, check the box if you think this would be considered a data-linking initiative or program.',
  },
  {
    label:
      'BC Services Card and/or other digital identity credential onboarding',
    value: 'hasBcServicesCardOnboarding',
    tooltip: false,
    tooltipText: `The BC Services Card is a government-issued ID. Program areas use the card to authenticate 
    a user’s identity when the user accesses a service.`,
  },
  {
    label: 'Artificial intelligence (AI) or machine learning',
    value: 'hasAiOrMl',
  },
  {
    label: 'Associated contract or license agreement review',
    value: 'hasContactOrLicenseReview',
  },
  {
    label: 'Other (Please provide additional details below)',
    value: 'hasInitiativeOther',
  },
];
