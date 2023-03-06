export interface IAgreementsAndInformationBanks {
  personalInformationBanks?: {
    willResultInPIB?: string;
    description?: string;
    mainMinistryOrAgencyInvolved?: string;
    otherGroupsInvolved?: string;
    contactTitle?: string;
    contactPhone?: string;
  };
  informationSharingAgreement?: {
    doesInvolveISA?: string;
    description?: string;
    mainMinistryOrAgencyInvolved?: string;
    otherGroupsInvolved?: string;
    contactTitle?: string;
    contactPhone?: string;
    startDate?: string | null;
    endDate?: string | null;
  };
}
