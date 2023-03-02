export interface IPersonalInformationBanks {
  resultingPIB?: {
    willResultInPIB?: string;
    descriptionInformationType?: string;
    mainMinistryInvolved?: string;
    otherMinistryInvolved?: string;
    managingPersonName?: string;
    managingPersonPhone?: string;
  };
  involveISA?: {
    willInvolveISA?: string;
    descriptionISA?: string;
    mainMinistryInvolved?: string;
    otherMinistryInvolved?: string;
    businessContactPersonName?: string;
    businessContactPersonPhone?: string;
    ISAStartDate?: string;
    ISAEndDate?: string | null;
  };
}
