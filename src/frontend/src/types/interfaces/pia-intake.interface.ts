import { GovMinistriesEnum } from '../enums/gov-ministries.enum';

export interface IPIAIntake {
      title: string,
      ministry: GovMinistriesEnum | string,
      branch: string,
      drafterName: string,
      drafterTitle: string,
      drafterEmail: string,
      leadName: string,
      leadTitle: string,
      leadEmail: string,
      mpoName: string,
      mpoEmail: string,
      initiativeDescription: string,
      dataElementsInvolved: string,
      hasAddedPiDataElements: boolean | null,
      riskMitigation: string | null,
}
