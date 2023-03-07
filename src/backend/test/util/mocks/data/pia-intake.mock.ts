import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import { GetPiaIntakeRO } from 'src/modules/pia-intake/ro/get-pia-intake.ro';
import { baseEntityMock } from 'test/util/mocks/data/base.mock';

const piaIntakeDataMock = {
  title: 'Test PIA for screening King Richard',
  ministry: GovMinistriesEnum.TOURISM_ARTS_CULTURE_AND_SPORT,
  branch: 'Entertainment',
  drafterName: 'Will Smith',
  drafterTitle: 'Actor',
  drafterEmail: 'will@test.bc.gov.in',
  leadName: 'King Richard',
  leadTitle: 'Chief Guiding Officer',
  leadEmail: 'king@test.bc.gov.in',
  mpoName: 'Reinaldo Marcus Green',
  mpoEmail: 'reinaldo@test.bc.gov.in',
  initiativeDescription: `*King Richard* is a 2021 American biographical sports drama film directed by [Reinaldo Marcus Green](https://en.wikipedia.org/wiki/Reinaldo_Marcus_Green) and written by [Zach Baylin](https://en.wikipedia.org/wiki/Zach_Baylin). The film stars [Will Smith](https://en.wikipedia.org/wiki/Will_Smith) as Richard Williams, the father and coach of famed tennis players [Venus](https://en.wikipedia.org/wiki/Venus_Williams) and [Serena Williams](https://en.wikipedia.org/wiki/Serena_Williams) (both of whom served as executive producers on the film), with [Aunjanue Ellis](https://en.wikipedia.org/wiki/Aunjanue_Ellis), [Saniyya Sidney](https://en.wikipedia.org/wiki/Saniyya_Sidney), [Demi Singleton](https://en.wikipedia.org/wiki/Demi_Singleton), [Tony Goldwyn](https://en.wikipedia.org/wiki/Tony_Goldwyn), and [Jon Bernthal](https://en.wikipedia.org/wiki/Jon_Bernthal) in supporting roles.`,
  initiativeScope: `Richard Williams lives in [Compton, California](https://en.wikipedia.org/wiki/Compton,_California), with his wife Brandy, his three step-daughters, and his two daughters, Venus and Serena. Richard aspires to turn Venus and Serena into professional tennis players; he has prepared a plan for success since before they were born. Richard and Brandy coach Venus and Serena on a daily basis, while also working as a security guard and a nurse, respectively. Richard works tirelessly to find a professional coach for the girls, creating brochures and videotapes to advertise their skills, but has not had success.`,
  dataElementsInvolved: `Cast Involved:
    
  1. Will Smith as Richard Williams
  2. Aunjanue Ellis as Oracene "Brandy" Price
  3. Saniyya Sidney as Venus Williams
  4. Demi Singleton as Serena Williams
  5. Jon Bernthal as Rick Macci
  6. Tony Goldwyn as Paul Cohen
  7. Mikayla LaShae Bartholomew as Tunde Price
  `,
  hasAddedPiToDataElements: false,
  riskMitigation: `The film was released on [Blu-ray](https://en.wikipedia.org/wiki/Blu-ray) and [DVD](https://en.wikipedia.org/wiki/DVD) February 8, 2022 by [Warner Bros. Home Entertainment](https://en.wikipedia.org/wiki/Warner_Bros._Home_Entertainment), with the 4K Ultra HD release through [Warner Archive Collection](https://en.wikipedia.org/wiki/Warner_Archive_Collection) on the same date.`,
  status: PiaIntakeStatusEnum.MPO_REVIEW,
  saveId: 1,
  submittedAt: new Date(),
  isNextStepsSeenForDelegatedFlow: false,
  isNextStepsSeenForNonDelegatedFlow: false,
  collectionUseAndDisclosure: {
    steps: [
      {
        drafterInput: 'Make a Checklist.',
        mpoInput: 'Agreed',
        foippaInput: 'Agreed',
        OtherInput: 'Agreed',
      },
      {
        drafterInput: 'Set Your Budget.',
        mpoInput: 'Set precise budget',
        foippaInput: 'Agreed',
        OtherInput: 'Agreed',
      },
    ],
    collectionNotice: {
      drafterInput: 'Test Input',
      mpoInput: 'Updated Input',
    },
  },
  storingPersonalInformation: {
    personalInformation: {
      storedOutsideCanada: YesNoInput.YES,
      whereDetails: 'USA',
    },
    sensitivePersonalInformation: {
      doesInvolve: YesNoInput.YES,
      disclosedOutsideCanada: YesNoInput.NO,
    },
    disclosuresOutsideCanada: {
      storage: {
        sensitiveInfoStoredByServiceProvider: YesNoInput.YES,
        serviceProviderList: [
          {
            name: 'Amazon',
            cloudInfraName: 'AWS',
            details: 'Stored in cloud',
          },
        ],
        disclosureDetails: 'S3 storage in us-east-1: US East (N. Virginia)',
        contractualTerms: 'None',
      },
      contract: {
        relyOnExistingContract: YesNoInput.YES,
        enterpriseServiceAccessDetails: 'S3',
      },
      controls: {
        unauthorizedAccessMeasures: 'IAM rules are in effect',
      },
      trackAccess: {
        trackAccessDetails: 'IAM',
      },
      risks: {
        privacyRisks: [
          {
            risk: 'Leak of Creds',
            impact: 'Access of instance',
            likelihoodOfUnauthorizedAccess: 'Medium',
            levelOfPrivacyRisk: 'Medium',
            riskResponse: 'immediately revoke',
            outstandingRisk: 'None',
          },
        ],
      },
    },
  },
  securityPersonalInformation: {
    digitalToolsAndSystems: {
      toolsAndAssessment: {
        involveDigitalToolsAndSystems: YesNoInput.NO,
        haveSecurityAssessment: YesNoInput.NO,
      },
      storage: {
        onGovServers: YesNoInput.NO,
        whereDetails: 'on AWS Cloud',
      },
    },
    accessToPersonalInformation: {
      onlyCertainRolesAccessInformation: YesNoInput.YES,
      accessApproved: YesNoInput.YES,
      useAuditLogs: YesNoInput.NO,
      additionalStrategies: 'PEM file access',
    },
  },
  accuracyCorrectionAndRetention: {
    accuracy: {
      description: 'Integrate with 3rd party validators',
    },
    correction: {
      haveProcessInPlace: YesNoInput.YES,
      willDocument: YesNoInput.YES,
      willConductNotifications: YesNoInput.YES,
    },
    retention: {
      usePIForDecision: YesNoInput.YES,
      haveApprovedInfoSchedule: YesNoInput.NO,
      describeRetention: 'will store in S3 Glacier Deep Archive',
    },
  },
  agreementsAndInformationBanks: {
    informationSharingAgreement: {
      doesInvolveISA: YesNoInput.YES,
      description: 'Some cloud agreement',
      mainMinistryOrAgencyInvolved: 'Citizen Services',
      otherGroupsInvolved: 'Forests, Alpha',
      contactTitle: 'John Doe',
      contactPhone: '(587-555-555)',
      startDate: '2023/06/20',
      endDate: '2023/12/20',
    },
    personalInformationBanks: {
      willResultInPIB: YesNoInput.YES,
      description: 'Name and address of the user',
      mainMinistryOrAgencyInvolved: 'Citizen Services',
      otherGroupsInvolved: 'Forests, Alpha',
      contactTitle: 'John Doe',
      contactPhone: '(587-555-555)',
    },
  },
  additionalRisks: {
    risks: [
      {
        risk: 'Leak 1',
        response: 'Response 1',
      },
    ],
  },
};

const collectionUseAndDisclosureWithDrafterPermissions = {
  collectionUseAndDisclosure: {
    steps: [
      {
        drafterInput: 'Make a Checklist.',
        mpoInput: null,
        foippaInput: null,
        OtherInput: null,
      },
      {
        drafterInput: 'Set Your Budget.',
        mpoInput: null,
        foippaInput: null,
        OtherInput: null,
      },
    ],
    collectionNotice: {
      drafterInput: 'Test Input',
      mpoInput: null,
    },
  },
};

export const piaIntakeEntityMock: PiaIntakeEntity = {
  ...baseEntityMock,
  ...piaIntakeDataMock,
  ...{ updatedByDisplayName: 'Richard, King CITZ:EX' },
  ...collectionUseAndDisclosureWithDrafterPermissions,
};

export const createPiaIntakeMock: CreatePiaIntakeDto = {
  ...piaIntakeDataMock,
  ...collectionUseAndDisclosureWithDrafterPermissions,
};

export const getPiaIntakeROMock: GetPiaIntakeRO = {
  ...piaIntakeDataMock,
  ...{
    id: baseEntityMock.id,
    createdAt: baseEntityMock.createdAt,
    updatedAt: baseEntityMock.updatedAt,
  },
  ...collectionUseAndDisclosureWithDrafterPermissions,
};
