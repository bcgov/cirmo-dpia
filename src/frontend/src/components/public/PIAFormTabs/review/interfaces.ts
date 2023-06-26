export interface IReview {
  programArea: {
    selectedRoles: string[];
  };
  mpo: {
    isAcknowledged: boolean;
    reviewNote: string;
<<<<<<< HEAD
    reviewedByDisplayName?: string;
    reviewedByGuid?: string;
    reviewedAt?: string;
=======
    reviewedByDisplayName: string;
    reviewedByGUID: string;
    reviewedAt: string;
>>>>>>> bed54871 ([UTOPIA-1152] update mpo review section ui)
  };
}
