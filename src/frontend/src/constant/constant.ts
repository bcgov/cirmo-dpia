import { DelegatedReviewTypesEnum } from '../types/enums/delegated-review-types.enum';
import { PiaFilterDrafterByCurrentUserEnum } from '../types/enums/pia-filter-drafter-by-current-user.enum';
import { PiaTypesEnum } from '../types/enums/pia-types.enum';

export const OtherFactor = [
  {
    label: 'Sensitive personal information',
    value: 'hasSensitivePersonalInformation',
    tooltip: false,
    tooltipText: `There is no complete definition for sensitive personal information. That’s because
    sensitivity depends on context and the type of personal information involved. Any type of personal
    information can be sensitive in one context, and not sensitive in others. Ask your MPO for help,
    and learn more about sensitive personal information. Ask your MPO for help to identify whether
    personal information in your initiative is sensitive.`,
    isLink: true,
    linkURL: `https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/privacy-impact-assessments/guidance-on-disclosures-outside-of-canada#sensitive`,
  },
  {
    label: 'Common or integrated program agreement',
    value: 'hasProgramAgreement',
    tooltip: false,
    tooltipText: `A CIPA is an agreement that allows two or more public bodies to share personal information
    for the purpose of providing a service.`,
  },
  {
    label: 'Vendor or third-party access to personal information',
    value: 'hasOthersAccessToPersonalInformation',
  },
  {
    label: 'Cloud technology',
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
    label: 'Other (Please provide additional details below)',
    value: '',
  },
  {
    label: 'Disclosure of personal information outside of Canada',
    value: 'hasDisclosureOutsideOfCanada',
  },
  {
    label: 'Data-linking',
    value: 'hasDataLinking',
    tooltip: true,
    tooltipText:
      'While we wait for more information about data-linking, check the box if you think this would be considered a data-linking initiative or program.',
  },
  {
    label: 'BC Services Card Onboarding',
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
    label: 'Partnership with non-ministry public bodies or other organizations',
    value: 'hasPartnershipNonMinistry',
  },
];

export const MinistryList = [
  {
    label: 'Post-Secondary Education and Future Skills',
    value: 'POST_SECONDARY_EDUCATION_AND_FUTURE_SKILLS',
  },
  {
    label: 'Agriculture and Food',
    value: 'AGRICULTURE_AND_FOOD',
  },
  {
    label: 'Attorney General',
    value: 'ATTORNEY_GENERAL',
  },
  {
    label: 'BC Public Service Agency',
    value: 'BC_PUBLIC_SERVICE_AGENCY',
  },
  {
    label: 'Children and Family Development',
    value: 'CHILDREN_AND_FAMILY_DEVELOPMENT',
  },
  {
    label: "Citizens' Services",
    value: 'CITIZENS_SERVICES',
  },
  {
    label: 'Education and Child Care',
    value: 'EDUCATION_AND_CHILD_CARE',
  },
  {
    label: 'Energy, Mines and Low Carbon Innovation',
    value: 'ENERGY_MINES_AND_LOW_CARBON_INNOVATION',
  },
  {
    label: 'Environment and Climate Change Strategy',
    value: 'ENVIRONMENT_AND_CLIMATE_CHANGE_STRATEGY',
  },
  {
    label: 'Finance',
    value: 'FINANCE',
  },
  {
    label: 'Forests',
    value: 'FORESTS',
  },
  {
    label: 'Government Communications and Public Engagement',
    value: 'GOVERNMENT_COMMUNICATIONS_AND_PUBLIC_ENGAGEMENT',
  },
  {
    label: 'Health',
    value: 'HEALTH',
  },
  {
    label: 'Indigenous Relations and Reconciliation',
    value: 'INDIGENOUS_RELATIONS_AND_RECONCILIATION',
  },
  {
    label: 'Jobs, Economic Development and Innovation',
    value: 'JOBS_ECONOMIC_DEVELOPMENT_AND_INNOVATION',
  },
  {
    label: 'Labour',
    value: 'LABOUR',
  },
  {
    label: 'Water, Land and Resource Stewardship',
    value: 'WATER_LAND_AND_RESOURCE_STEWARDSHIP',
  },
  {
    label: 'Liquor Distribution Branch',
    value: 'LIQUOR_DISTRIBUTION_BRANCH',
  },
  {
    label: 'Mental Health and Addictions',
    value: 'MENTAL_HEALTH_AND_ADDICTIONS',
  },
  {
    label: 'Municipal Affairs',
    value: 'MUNICIPAL_AFFAIRS',
  },
  {
    label: 'Office of the Premier',
    value: 'OFFICE_OF_THE_PREMIER',
  },
  {
    label: 'Public Safety and Solicitor General',
    value: 'PUBLIC_SAFETY_AND_SOLICITOR_GENERAL',
  },
  {
    label: 'Social Development and Poverty Reduction',
    value: 'SOCIAL_DEVELOPMENT_AND_POVERTY_REDUCTION',
  },
  {
    label: 'Tourism, Arts, Culture and Sport',
    value: 'TOURISM_ARTS_CULTURE_AND_SPORT',
  },
  {
    label: 'Transportation and Infrastructure',
    value: 'TRANSPORTATION_AND_INFRASTRUCTURE',
  },
  {
    label: 'Housing',
    value: 'HOUSING',
  },
  {
    label: 'Emergency Management and Climate Readiness',
    value: 'EMERGENCY_MANAGEMENT_AND_CLIMATE_READINESS',
  },
].sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0));

export const PiaStatusList = [
  { label: 'Drafting In Progress', value: 'DRAFTING_IN_PROGRESS' },
  { label: 'Edit In Progress', value: 'EDIT_IN_PROGRESS' },
  { label: 'MPO Review', value: 'MPO_REVIEW' },
  { label: 'CPO Review', value: 'CPO_REVIEW' },
  { label: 'Pending Completion', value: 'PENDING_COMPLETION' },
  { label: 'Final Review', value: 'FINAL_REVIEW' },
];
export const PiaDrafterFilterList = [
  {
    label: 'Exclude my PIAs',
    value: PiaFilterDrafterByCurrentUserEnum.EXCLUDEMYPIAS,
  },
  {
    label: 'Only my PIAs',
    value: PiaFilterDrafterByCurrentUserEnum.ONLYMYPIAS,
  },
];

export const PIATypes = [
  {
    label: 'Standard PIA',
    value: PiaTypesEnum.STANDARD,
    name: 'pia-types',
  },
  {
    label: 'Initiative Update',
    value: PiaTypesEnum.INITIATIVE_UPDATE,
    name: 'pia-types',
  },
  {
    label: 'Delegated Review',
    value: PiaTypesEnum.DELEGATE_REVIEW,
    name: 'pia-types',
  },
];

export const ReviewTypes = [
  {
    label: 'Non-PI',
    value: DelegatedReviewTypesEnum.NON_PI,
    name: 'review-types',
  },
  {
    label: 'Checklist',
    value: DelegatedReviewTypesEnum.CHECKLIST,
    name: 'review-types',
  },
];

export const PIOptions = [
  {
    key: 'Yes',
    value: true,
  },
  {
    key: 'No',
    value: false,
  },
  {
    key: "I'm not sure",
    value: null,
  },
];

export const YesNoInputOptions = ['Yes', 'No'];

export enum PiaStatuses {
  DRAFTING_IN_PROGRESS = 'DRAFTING_IN_PROGRESS',
  EDIT_IN_PROGRESS = 'EDIT_IN_PROGRESS',
  MPO_REVIEW = 'MPO_REVIEW',
  CPO_REVIEW = 'CPO_REVIEW',
  FINAL_REVIEW = 'FINAL_REVIEW',
  PENDING_COMPLETION = 'PENDING_COMPLETION',
  COMPLETE = 'COMPLETE',
}

export enum PiaSorting {
  INACTIVE = 0, // default state 0
  ASCENDING = 1,
  DESCENDING = -1,
}

interface IapprovalRoles {
  [key: string]: string;
}

export const ApprovalRoles: IapprovalRoles = {
  PROGRAM_MANAGER: 'Program Manager / Product Owner',
  DIRECTOR: 'Director',
  EX_DIRECTOR: 'Executive Director',
  MCIO: 'Ministry Chief Information Officer',
  ADM: 'Assistant Deputy Minister',
};

export enum TextInputEnum {
  INPUT_TEXT = 'text',
  INPUT_TEXT_AREA = 'textarea',
  INPUT_EMAIL = 'email',
}

export enum SubmitButtonTextEnum {
  INTAKE = 'Submit',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  FORM = 'Submit',
  FINISH_REVIEW = 'Finish review',
  COMPLETE_PIA = 'Complete PIA',
}
