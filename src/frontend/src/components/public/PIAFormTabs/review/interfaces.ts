export interface IReview {
  programArea: {
    selectedRoles: string[];
  };
  mpo: {
    isAcknowledged: boolean;
    reviewNote: string;
    reviewedBy?: string;
    reviewedByGUID?: string;
    dateReviewed?: string;
  };
}
